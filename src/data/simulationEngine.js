// src/data/simulationEngine.js
// Core simulation logic with evidence-based calculations

/**
 * Calculate cultural fit for a probe in a given country context
 * @param {Object} probe - The policy probe
 * @param {Object} contextFactors - Country's context factors
 * @returns {number} Effective cultural fit (0-1)
 */
export const calculateCulturalFit = (probe, contextFactors) => {
  const {
    institutionalTrust,
    culturalOpenness,
    implementationCapacity,
    conflictLevel
  } = contextFactors;
  
  // Base fit from research
  const baseFit = probe.baseFit || probe.fit || 0.5;
  
  // Apply context modifiers
  // Cultural fit = base_fit × trust × openness × capacity × (1 - conflict)
  const conflictPenalty = 1 - (conflictLevel * 0.8); // Conflict reduces effectiveness up to 80%
  
  const effectiveFit = baseFit * 
    Math.pow(institutionalTrust, 0.3) *  // Trust has moderate influence
    Math.pow(culturalOpenness, 0.2) *     // Openness has smaller influence
    Math.pow(implementationCapacity, 0.4) * // Implementation capacity is important
    conflictPenalty;
  
  return Math.min(1, Math.max(0, effectiveFit));
};

/**
 * Calculate effect of a probe on wellbeing domains
 * @param {Object} probe - The policy probe
 * @param {Object} contextFactors - Country's context factors
 * @param {number} currentMonth - Current simulation month
 * @param {number} probeStartMonth - When probe was activated
 * @param {boolean} isAmplified - Whether probe has been amplified
 * @returns {Object} Effect details including per-domain impacts
 */
export const calculateProbeEffect = (probe, contextFactors, currentMonth, probeStartMonth, isAmplified = false) => {
  const culturalFit = calculateCulturalFit(probe, contextFactors);
  const lagMonths = probe.lagMonths || { min: 3, max: 6 };
  const avgLag = (lagMonths.min + lagMonths.max) / 2;
  
  // Check if lag period has passed
  const monthsSinceStart = currentMonth - probeStartMonth;
  const lagProgress = Math.min(1, monthsSinceStart / avgLag);
  const isActive = monthsSinceStart >= lagMonths.min;
  const isFullyActive = monthsSinceStart >= lagMonths.max;
  
  // Calculate base effect multiplier
  // Effect ramps up during lag period
  let effectMultiplier = 0;
  if (isActive) {
    effectMultiplier = isFullyActive ? 1 : lagProgress;
  }
  
  // Apply amplification bonus (25%)
  const amplificationBonus = isAmplified ? 1.25 : 1.0;
  
  // Apply variance (±20%)
  const variance = 0.8 + (Math.random() * 0.4);
  
  // Calculate per-domain effects
  const domainEffects = {};
  const effectWeights = probe.effectWeights || {};
  
  Object.keys(effectWeights).forEach(domain => {
    const baseWeight = effectWeights[domain];
    if (baseWeight !== 0) {
      const effect = baseWeight * culturalFit * effectMultiplier * amplificationBonus * variance;
      domainEffects[domain] = {
        value: Math.round(effect * 100) / 100,
        baseWeight,
        culturalFit: Math.round(culturalFit * 100) / 100,
        effectMultiplier: Math.round(effectMultiplier * 100) / 100,
        amplificationBonus,
        variance: Math.round(variance * 100) / 100
      };
    }
  });
  
  return {
    probeId: probe.id,
    probeName: probe.name,
    isActive,
    isFullyActive,
    isPending: !isActive,
    lagProgress: Math.round(lagProgress * 100),
    culturalFit: Math.round(culturalFit * 100) / 100,
    monthsRemaining: isActive ? 0 : Math.ceil(lagMonths.min - monthsSinceStart),
    domainEffects,
    status: !isActive ? 'pending' : (isAmplified ? 'amplified' : 'active')
  };
};

/**
 * Roll for risk events based on country probabilities
 * @param {Array} riskEvents - Country's risk events
 * @param {number} currentMonth - Current simulation month  
 * @param {Array} activeRisks - Currently active persistent risks
 * @returns {Object} Triggered events and updated active risks
 */
export const rollRiskEvents = (riskEvents, currentMonth, activeRisks = []) => {
  const triggeredEvents = [];
  const newActiveRisks = [...activeRisks];
  
  riskEvents.forEach(risk => {
    // Convert annual probability to monthly (approximate)
    const monthlyProb = 1 - Math.pow(1 - risk.probability, 1/12);
    
    // Check if already active (for persistent risks)
    const isAlreadyActive = activeRisks.some(r => r.id === risk.id);
    
    if (isAlreadyActive) {
      // Check if non-persistent risk should end
      const activeRisk = activeRisks.find(r => r.id === risk.id);
      if (!risk.isPersistent && activeRisk) {
        const monthsActive = currentMonth - activeRisk.startMonth;
        if (monthsActive >= risk.duration) {
          // Remove from active risks
          const idx = newActiveRisks.findIndex(r => r.id === risk.id);
          if (idx > -1) newActiveRisks.splice(idx, 1);
        }
      }
      return;
    }
    
    // Roll for new event
    if (Math.random() < monthlyProb) {
      const triggeredRisk = {
        ...risk,
        startMonth: currentMonth,
        endMonth: risk.isPersistent ? null : currentMonth + risk.duration
      };
      
      triggeredEvents.push(triggeredRisk);
      newActiveRisks.push(triggeredRisk);
    }
  });
  
  return {
    triggeredEvents,
    activeRisks: newActiveRisks
  };
};

/**
 * Calculate risk event impacts on wellbeing
 * @param {Array} activeRisks - Currently active risks
 * @returns {Object} Per-domain risk impacts
 */
export const calculateRiskImpacts = (activeRisks) => {
  const impacts = {
    health: 0,
    psychological: 0,
    social: 0,
    civic: 0,
    economic: 0,
    environmental: 0
  };
  
  activeRisks.forEach(risk => {
    risk.affectedDomains.forEach(domain => {
      // Handle variance risks (like India's state implementation)
      if (risk.note?.includes('±') || risk.id === 'state_implementation_variance') {
        impacts[domain] += (Math.random() - 0.5) * 2 * Math.abs(risk.modifier);
      } else {
        impacts[domain] += risk.modifier;
      }
    });
  });
  
  return impacts;
};

/**
 * Apply all effects to wellbeing scores
 * @param {Object} currentWellbeing - Current wellbeing scores
 * @param {Array} probeEffects - Calculated probe effects
 * @param {Object} riskImpacts - Calculated risk impacts
 * @returns {Object} New wellbeing scores and change attribution
 */
export const applyEffects = (currentWellbeing, probeEffects, riskImpacts) => {
  const newWellbeing = { ...currentWellbeing };
  const attribution = {
    health: [],
    psychological: [],
    social: [],
    civic: [],
    economic: [],
    environmental: []
  };
  
  // Apply probe effects
  probeEffects.forEach(effect => {
    if (effect.isActive) {
      Object.entries(effect.domainEffects).forEach(([domain, details]) => {
        if (details.value !== 0) {
          newWellbeing[domain] = Math.max(0, Math.min(100, newWellbeing[domain] + details.value));
          attribution[domain].push({
            source: effect.probeName,
            type: 'probe',
            value: details.value,
            status: effect.status
          });
        }
      });
    }
  });
  
  // Apply risk impacts
  Object.entries(riskImpacts).forEach(([domain, impact]) => {
    if (impact !== 0) {
      newWellbeing[domain] = Math.max(0, Math.min(100, newWellbeing[domain] + impact));
      attribution[domain].push({
        source: 'Risk Events',
        type: 'risk',
        value: impact,
        status: 'active'
      });
    }
  });
  
  // Round all values
  Object.keys(newWellbeing).forEach(key => {
    newWellbeing[key] = Math.round(newWellbeing[key] * 10) / 10;
  });
  
  return { newWellbeing, attribution };
};

/**
 * Create a quarterly snapshot of simulation state
 * @param {Object} state - Current simulation state
 * @returns {Object} Snapshot for history
 */
export const createSnapshot = (state) => {
  return {
    month: state.currentMonth,
    quarter: Math.ceil(state.currentMonth / 3),
    year: Math.ceil(state.currentMonth / 12),
    wellbeing: { ...state.wellbeing },
    wellbeingScore: calculateWellbeingScore(state.wellbeing),
    activeProbes: state.probes.filter(p => p.status === 'active' || p.status === 'amplified').length,
    retiredProbes: state.probes.filter(p => p.status === 'retired').length,
    amplifiedProbes: state.probes.filter(p => p.status === 'amplified').length,
    activeRisks: state.activeRisks?.length || 0,
    timestamp: new Date().toISOString()
  };
};

/**
 * Calculate aggregate wellbeing score
 * @param {Object} wellbeing - Wellbeing domain scores
 * @returns {number} Aggregate score (0-100)
 */
export const calculateWellbeingScore = (wellbeing) => {
  const values = Object.values(wellbeing);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
};

/**
 * Calculate public trust based on wellbeing
 * @param {Object} wellbeing - Wellbeing domain scores
 * @returns {number} Trust score (0-100)
 */
export const calculatePublicTrust = (wellbeing) => {
  const wellbeingScore = calculateWellbeingScore(wellbeing);
  return Math.round(
    wellbeing.civic * 0.3 +
    wellbeing.psychological * 0.2 +
    wellbeing.social * 0.3 +
    wellbeingScore * 0.2
  );
};

/**
 * Generate narrative message based on simulation events
 * @param {string} type - Event type ('probe_success', 'probe_challenge', 'risk_event', etc.)
 * @param {Object} data - Event data
 * @returns {Object} Message object for VLL feed
 */
export const generateNarrativeMessage = (type, data) => {
  const timestamp = new Date().toLocaleTimeString();
  
  const templates = {
    probe_success: [
      `${data.probeName} showing positive early indicators.`,
      `Community feedback on ${data.probeName} exceeds expectations.`,
      `Local leaders endorsing ${data.probeName} approach.`,
      `${data.probeName} adoption rates climbing steadily.`
    ],
    probe_challenge: [
      `${data.probeName} facing implementation hurdles.`,
      `Minor resistance to ${data.probeName} in some regions.`,
      `${data.probeName} progress slower than projected.`,
      `Cultural friction reported with ${data.probeName}.`
    ],
    probe_pending: [
      `${data.probeName} in preparation phase (${data.monthsRemaining} months to activation).`,
      `Building capacity for ${data.probeName} rollout.`,
      `Training underway for ${data.probeName} implementation.`
    ],
    probe_amplified: [
      `Resources redirected to scale ${data.probeName}.`,
      `${data.probeName} expanded to additional regions.`,
      `${data.probeName} receives priority funding allocation.`
    ],
    probe_retired: [
      `${data.probeName} concluded. Lessons captured.`,
      `Graceful exit from ${data.probeName} - redirecting resources.`,
      `${data.probeName} retired after evaluation.`
    ],
    risk_triggered: [
      `⚠️ ALERT: ${data.riskName} event detected.`,
      `🚨 ${data.riskName} impacting operations.`,
      `CRISIS: ${data.riskName} - mitigation protocols activated.`
    ],
    risk_ended: [
      `${data.riskName} crisis subsiding.`,
      `Recovery from ${data.riskName} underway.`,
      `${data.riskName} event concluded.`
    ],
    quarter_summary: [
      `Q${data.quarter} Report: Wellbeing at ${data.wellbeingScore}. ${data.activeProbes} probes active.`,
      `Quarterly review complete. Trust at ${data.publicTrust}%.`
    ]
  };
  
  const messageTemplates = templates[type] || [`System update: ${type}`];
  const text = messageTemplates[Math.floor(Math.random() * messageTemplates.length)];
  
  const sentiment = type.includes('success') || type.includes('amplified') ? 1 :
                    type.includes('challenge') || type.includes('risk') ? -1 : 0;
  
  return {
    timestamp,
    topic: data.probeName || data.riskName || 'SYSTEM',
    text,
    sentiment,
    type
  };
};

/**
 * Generate fragile strategy effects (blueprint approach)
 * More volatile, less culturally adapted
 * @param {Object} blueprint - Country's blueprint policy
 * @param {Object} contextFactors - Country's context factors
 * @returns {Object} Effect on wellbeing domains
 */
export const calculateFragileEffect = (blueprint, contextFactors) => {
  const baseFit = blueprint.fitScore;
  const conflictPenalty = 1 - contextFactors.conflictLevel;
  
  // Fragile approach: high variance, often negative
  const isSuccess = Math.random() < (baseFit * conflictPenalty);
  
  const effects = {};
  const domains = ['health', 'psychological', 'social', 'civic', 'economic', 'environmental'];
  
  domains.forEach(domain => {
    if (isSuccess) {
      effects[domain] = Math.random() < 0.3 ? 1 : 0;
    } else {
      effects[domain] = Math.random() < 0.5 ? -2 : -1;
    }
  });
  
  return {
    effects,
    isSuccess,
    message: isSuccess 
      ? 'Blueprint showing early stability signs.'
      : 'Blueprint encountering significant resistance.'
  };
};

/**
 * Export cycle data for external analysis
 * @param {Object} cycleData - Complete cycle data
 * @returns {Object} Formatted export data
 */
export const formatExportData = (cycleData) => {
  return {
    exportedAt: new Date().toISOString(),
    version: '2.0',
    cycle: {
      number: cycleData.cycleNumber,
      country: cycleData.countryName,
      strategy: cycleData.strategy,
      duration: {
        months: cycleData.currentMonth,
        quarters: Math.ceil(cycleData.currentMonth / 3)
      }
    },
    outcomes: {
      initialWellbeing: cycleData.initialWellbeing,
      finalWellbeing: cycleData.finalWellbeing,
      change: Object.keys(cycleData.finalWellbeing).reduce((acc, key) => {
        acc[key] = cycleData.finalWellbeing[key] - cycleData.initialWellbeing[key];
        return acc;
      }, {})
    },
    probes: cycleData.probes.map(p => ({
      name: p.name,
      finalStatus: p.status,
      evidenceSource: p.evidenceSource,
      lesson: p.lesson
    })),
    riskEvents: cycleData.riskEventLog,
    snapshots: cycleData.snapshots,
    lessons: cycleData.lessons
  };
};

/**
 * Get confidence level display info
 * @param {string} confidence - 'high', 'medium', or 'low'
 * @returns {Object} Display properties
 */
export const getConfidenceInfo = (confidence) => {
  const levels = {
    high: {
      label: 'High Confidence',
      description: 'Based on RCT or meta-analysis',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30'
    },
    medium: {
      label: 'Medium Confidence',
      description: 'Based on cohort or case studies',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/30'
    },
    low: {
      label: 'Low Confidence',
      description: 'Based on observational/expert opinion',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30'
    }
  };
  
  return levels[confidence] || levels.medium;
};

export default {
  calculateCulturalFit,
  calculateProbeEffect,
  rollRiskEvents,
  calculateRiskImpacts,
  applyEffects,
  createSnapshot,
  calculateWellbeingScore,
  calculatePublicTrust,
  generateNarrativeMessage,
  calculateFragileEffect,
  formatExportData,
  getConfidenceInfo
};
