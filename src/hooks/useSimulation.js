// src/hooks/useSimulation.js
// Enhanced simulation hook with timeline, effects tracking, risk events, and cycle memory

import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import { EMOTIONS } from '../data/constants';
import {
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
  formatExportData
} from '../data/simulationEngine';

// LocalStorage keys - only used for explicit exports, not auto-persistence
const STORAGE_KEYS = {
  CYCLE_HISTORY: 'governor_sandbox_cycle_history'
};

export const useSimulation = (activeCountry) => {
  // In-session country state memory (not persisted to localStorage)
  // This remembers country states during the session but resets on page refresh
  const countryStatesRef = useRef({});
  const previousCountryRef = useRef(null); // Start as null so first render doesn't save empty state
  const isFirstRender = useRef(true);

  // Core state
  const [cycleStage, setCycleStage] = useState('diagnose');
  const [completedStages, setCompletedStages] = useState([]);
  const [strategy, setStrategy] = useState(null);
  const [wellbeing, setWellbeing] = useState({ ...activeCountry.wellbeing });
  const [initialWellbeing, setInitialWellbeing] = useState({ ...activeCountry.wellbeing });
  const [wellbeingChanges, setWellbeingChanges] = useState({});
  const [probes, setProbes] = useState([]);
  const [vllMessages, setVllMessages] = useState([]);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [cycleCount, setCycleCount] = useState(1);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // New timeline state
  const [currentMonth, setCurrentMonth] = useState(0);
  const [probeStartMonths, setProbeStartMonths] = useState({});
  
  // Effects transparency state
  const [effectAttribution, setEffectAttribution] = useState({});
  const [probeEffects, setProbeEffects] = useState([]);
  
  // Risk events state
  const [activeRisks, setActiveRisks] = useState([]);
  const [riskEventLog, setRiskEventLog] = useState([]);
  
  // Timeline snapshots
  const [snapshots, setSnapshots] = useState([]);
  const [wellbeingHistory, setWellbeingHistory] = useState([]);
  
  // Cycle memory (in-session only, not persisted)
  const [cycleHistory, setCycleHistory] = useState([]);
  
  // Simulation speed control (ms per month)
  const simulationSpeed = useRef(2000);

  // Calculate aggregate scores
  const wellbeingScore = calculateWellbeingScore(wellbeing);
  const publicTrust = calculatePublicTrust(wellbeing);

  // Keep a ref to current state for saving on country switch - use useLayoutEffect for synchronous update
  const currentStateRef = useRef({});
  useLayoutEffect(() => {
    currentStateRef.current = {
      cycleStage,
      completedStages,
      strategy,
      wellbeing,
      initialWellbeing,
      wellbeingChanges,
      probes,
      vllMessages,
      emotionHistory,
      lessons,
      cycleCount,
      currentMonth,
      probeStartMonths,
      effectAttribution,
      probeEffects,
      activeRisks,
      riskEventLog,
      snapshots,
      wellbeingHistory,
      cycleHistory
    };
  }, [cycleStage, completedStages, strategy, wellbeing, initialWellbeing, wellbeingChanges, 
      probes, vllMessages, emotionHistory, lessons, cycleCount, currentMonth, probeStartMonths,
      effectAttribution, probeEffects, activeRisks, riskEventLog, snapshots, wellbeingHistory, cycleHistory]);

  // Handle country changes - save previous, restore or reset new
  useEffect(() => {
    const prevCountryId = previousCountryRef.current;
    const newCountryId = activeCountry.id;
    
    // On first render, just set the previous country ref
    if (isFirstRender.current) {
      isFirstRender.current = false;
      previousCountryRef.current = newCountryId;
      return;
    }
    
    // If same country, do nothing
    if (prevCountryId === newCountryId) return;
    
    // Save current state for previous country before switching
    if (prevCountryId && currentStateRef.current) {
      // Deep copy to avoid reference issues
      countryStatesRef.current[prevCountryId] = JSON.parse(JSON.stringify(currentStateRef.current));
    }
    
    // Always stop simulation when switching countries
    setSimulationRunning(false);
    
    // Check if we have saved state for new country
    const savedState = countryStatesRef.current[newCountryId];
    
    if (savedState) {
      // Restore saved state - use setTimeout to ensure state updates don't conflict
      setCycleStage(savedState.cycleStage);
      setCompletedStages(savedState.completedStages);
      setStrategy(savedState.strategy);
      setWellbeing(savedState.wellbeing);
      setInitialWellbeing(savedState.initialWellbeing);
      setWellbeingChanges(savedState.wellbeingChanges);
      setProbes(savedState.probes);
      setVllMessages(savedState.vllMessages);
      setEmotionHistory(savedState.emotionHistory);
      setLessons(savedState.lessons);
      setCycleCount(savedState.cycleCount);
      setCurrentMonth(savedState.currentMonth);
      setProbeStartMonths(savedState.probeStartMonths);
      setEffectAttribution(savedState.effectAttribution);
      setProbeEffects(savedState.probeEffects);
      setActiveRisks(savedState.activeRisks);
      setRiskEventLog(savedState.riskEventLog);
      setSnapshots(savedState.snapshots);
      setWellbeingHistory(savedState.wellbeingHistory);
      setCycleHistory(savedState.cycleHistory);
    } else {
      // Fresh start for new country
      setCycleStage('diagnose');
      setCompletedStages([]);
      setStrategy(null);
      setWellbeing({ ...activeCountry.wellbeing });
      setInitialWellbeing({ ...activeCountry.wellbeing });
      setWellbeingChanges({});
      setProbes([]);
      setVllMessages([]);
      setEmotionHistory([]);
      setLessons([]);
      setCycleCount(1);
      setCurrentMonth(0);
      setProbeStartMonths({});
      setEffectAttribution({});
      setProbeEffects([]);
      setActiveRisks([]);
      setRiskEventLog([]);
      setSnapshots([]);
      setWellbeingHistory([]);
      setCycleHistory([]);
    }
    
    // Update previous country ref
    previousCountryRef.current = newCountryId;
  }, [activeCountry.id, activeCountry.wellbeing]); // Depend on country ID and wellbeing for fresh starts

  // Save cycle history (only when explicitly exported)
  const saveCycleHistory = useCallback((history) => {
    try {
      localStorage.setItem(STORAGE_KEYS.CYCLE_HISTORY, JSON.stringify(history));
    } catch (e) {
      console.warn('Failed to save cycle history:', e);
    }
  }, []);

  // Generate emotion data point based on current state
  const generateEmotionPoint = useCallback(() => {
    const baseEmotions = {
      hope: 30 + (wellbeingScore - 50) * 0.4,
      fear: 20 - (wellbeingScore - 50) * 0.3,
      anger: 15 - (publicTrust - 50) * 0.2,
      belonging: 25 + (wellbeing.social - 50) * 0.3,
      optimism: 20 + (wellbeingScore - 50) * 0.3,
      anxiety: 15 - (wellbeing.psychological - 50) * 0.2
    };
    
    const point = { time: emotionHistory.length, month: currentMonth };
    let total = 0;
    
    EMOTIONS.forEach(e => {
      const val = Math.max(5, Math.min(30, baseEmotions[e.key] + (Math.random() - 0.5) * 10));
      point[e.key] = Math.round(val);
      total += point[e.key];
    });
    
    // Normalize to 100
    EMOTIONS.forEach(e => {
      point[e.key] = Math.round((point[e.key] / total) * 100);
    });
    
    return point;
  }, [wellbeingScore, publicTrust, wellbeing.social, wellbeing.psychological, emotionHistory.length, currentMonth]);

  // Main simulation loop - Anti-Fragile strategy
  const runAntiFragileStep = useCallback(() => {
    const newMonth = currentMonth + 1;
    setCurrentMonth(newMonth);
    
    const activeProbes = probes.filter(p => p.status === 'active' || p.status === 'amplified');
    if (activeProbes.length === 0) return;
    
    // Calculate effects for all probes
    const newProbeEffects = activeProbes.map(probe => {
      const startMonth = probeStartMonths[probe.id] || 0;
      return calculateProbeEffect(
        probe,
        activeCountry.contextFactors,
        newMonth,
        startMonth,
        probe.status === 'amplified'
      );
    });
    setProbeEffects(newProbeEffects);
    
    // Roll for risk events
    const { triggeredEvents, activeRisks: newActiveRisks } = rollRiskEvents(
      activeCountry.riskEvents || [],
      newMonth,
      activeRisks
    );
    
    // Log triggered events
    if (triggeredEvents.length > 0) {
      triggeredEvents.forEach(event => {
        const msg = generateNarrativeMessage('risk_triggered', { riskName: event.name });
        setVllMessages(prev => [msg, ...prev].slice(0, 50));
        setRiskEventLog(prev => [...prev, { ...event, triggeredMonth: newMonth }]);
      });
    }
    
    // Check for ending risks
    const endingRisks = activeRisks.filter(r => 
      !r.isPersistent && r.endMonth && newMonth >= r.endMonth
    );
    endingRisks.forEach(risk => {
      const msg = generateNarrativeMessage('risk_ended', { riskName: risk.name });
      setVllMessages(prev => [msg, ...prev].slice(0, 50));
    });
    
    setActiveRisks(newActiveRisks.filter(r => 
      r.isPersistent || !r.endMonth || newMonth < r.endMonth
    ));
    
    // Calculate risk impacts
    const riskImpacts = calculateRiskImpacts(newActiveRisks);
    
    // Apply all effects
    const { newWellbeing, attribution } = applyEffects(
      wellbeing,
      newProbeEffects,
      riskImpacts
    );
    
    setWellbeing(newWellbeing);
    setEffectAttribution(attribution);
    
    // Calculate changes for display
    const changes = {};
    Object.keys(newWellbeing).forEach(key => {
      changes[key] = Math.round((newWellbeing[key] - wellbeing[key]) * 10) / 10;
    });
    setWellbeingChanges(changes);
    
    // Generate narrative messages for probes
    newProbeEffects.forEach(effect => {
      if (effect.isActive) {
        const totalEffect = Object.values(effect.domainEffects)
          .reduce((sum, d) => sum + d.value, 0);
        
        if (Math.random() < 0.3) { // Don't spam messages
          const msgType = totalEffect > 0 ? 'probe_success' : 'probe_challenge';
          const msg = generateNarrativeMessage(msgType, { 
            probeName: effect.probeName,
            effect: totalEffect
          });
          setVllMessages(prev => [msg, ...prev].slice(0, 50));
        }
      } else if (effect.isPending && newMonth % 3 === 0) {
        const msg = generateNarrativeMessage('probe_pending', {
          probeName: effect.probeName,
          monthsRemaining: effect.monthsRemaining
        });
        setVllMessages(prev => [msg, ...prev].slice(0, 50));
      }
    });
    
    // Add to wellbeing history
    setWellbeingHistory(prev => [...prev, {
      month: newMonth,
      ...newWellbeing,
      score: calculateWellbeingScore(newWellbeing)
    }].slice(-60));
    
    // Quarterly snapshot
    if (newMonth % 3 === 0) {
      const snapshot = createSnapshot({
        currentMonth: newMonth,
        wellbeing: newWellbeing,
        probes,
        activeRisks: newActiveRisks
      });
      setSnapshots(prev => [...prev, snapshot]);
      
      // Quarterly summary message
      const summaryMsg = generateNarrativeMessage('quarter_summary', {
        quarter: snapshot.quarter,
        wellbeingScore: snapshot.wellbeingScore,
        publicTrust,
        activeProbes: snapshot.activeProbes
      });
      setVllMessages(prev => [summaryMsg, ...prev].slice(0, 50));
    }
    
    // Update emotion history
    setEmotionHistory(prev => [...prev, generateEmotionPoint()].slice(-30));
    
  }, [currentMonth, probes, probeStartMonths, activeCountry, wellbeing, activeRisks, publicTrust, generateEmotionPoint]);

  // Main simulation loop - Fragile strategy
  const runFragileStep = useCallback(() => {
    const newMonth = currentMonth + 1;
    setCurrentMonth(newMonth);
    
    const { effects, isSuccess, message } = calculateFragileEffect(
      activeCountry.blueprint,
      activeCountry.contextFactors
    );
    
    // Roll for risk events (fragile is more vulnerable)
    const { triggeredEvents, activeRisks: newActiveRisks } = rollRiskEvents(
      activeCountry.riskEvents || [],
      newMonth,
      activeRisks
    );
    
    // Log triggered events with extra impact for fragile
    if (triggeredEvents.length > 0) {
      triggeredEvents.forEach(event => {
        const msg = generateNarrativeMessage('risk_triggered', { riskName: event.name });
        setVllMessages(prev => [msg, ...prev].slice(0, 50));
        setRiskEventLog(prev => [...prev, { ...event, triggeredMonth: newMonth }]);
        
        // Extra penalty for fragile strategy during crises
        Object.keys(effects).forEach(domain => {
          if (event.affectedDomains.includes(domain)) {
            effects[domain] += event.modifier * 0.5; // 50% extra impact
          }
        });
      });
    }
    
    setActiveRisks(newActiveRisks.filter(r => 
      r.isPersistent || !r.endMonth || newMonth < r.endMonth
    ));
    
    // Apply effects
    setWellbeing(prev => {
      const next = { ...prev };
      Object.keys(effects).forEach(key => {
        next[key] = Math.max(0, Math.min(100, prev[key] + effects[key]));
      });
      return next;
    });
    
    setWellbeingChanges(effects);
    
    // Add message
    const sentiment = isSuccess ? 1 : -1;
    const topics = isSuccess ? ['Policy', 'Progress'] : ['Crisis', 'Resistance', 'Backlash'];
    const negatives = [
      "Mass protests erupting against new mandates.",
      "Local leaders publicly denouncing central policy.",
      "#NotMyPolicy trending nationwide.",
      "Cultural experts warn of 'tone-deaf' approach.",
      "Opposition calling for immediate policy reversal.",
      "Community elders refusing to participate.",
      "Implementation stalled due to resistance."
    ];
    
    const msgText = isSuccess ? message : negatives[Math.floor(Math.random() * negatives.length)];
    
    setVllMessages(prev => [{
      timestamp: new Date().toLocaleTimeString(),
      topic: topics[Math.floor(Math.random() * topics.length)],
      text: msgText,
      sentiment
    }, ...prev].slice(0, 50));
    
    // Update wellbeing history
    const newWellbeing = { ...wellbeing };
    Object.keys(effects).forEach(key => {
      newWellbeing[key] = Math.max(0, Math.min(100, wellbeing[key] + effects[key]));
    });
    
    setWellbeingHistory(prev => [...prev, {
      month: newMonth,
      ...newWellbeing,
      score: calculateWellbeingScore(newWellbeing)
    }].slice(-60));
    
    // Quarterly snapshot
    if (newMonth % 3 === 0) {
      const snapshot = createSnapshot({
        currentMonth: newMonth,
        wellbeing: newWellbeing,
        probes: [],
        activeRisks: newActiveRisks
      });
      setSnapshots(prev => [...prev, snapshot]);
    }
    
    // Update emotion history
    setEmotionHistory(prev => [...prev, generateEmotionPoint()].slice(-30));
    
  }, [currentMonth, activeCountry, wellbeing, activeRisks, generateEmotionPoint]);

  // Simulation loop effect
  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      if (strategy === 'fragile') {
        runFragileStep();
      } else if (strategy === 'antifragile') {
        runAntiFragileStep();
      }
    }, simulationSpeed.current);

    return () => clearInterval(interval);
  }, [simulationRunning, strategy, runFragileStep, runAntiFragileStep]);

  // Stage management
  const advanceStage = useCallback((nextStage) => {
    setCompletedStages(prev => {
      if (!prev.includes(cycleStage)) {
        return [...prev, cycleStage];
      }
      return prev;
    });
    setCycleStage(nextStage);
  }, [cycleStage]);

  // Launch fragile (blueprint) strategy
  const launchFragile = useCallback(() => {
    setStrategy('fragile');
    setInitialWellbeing({ ...wellbeing });
    advanceStage('monitor');
    setSimulationRunning(true);
    setCurrentMonth(0);
    setWellbeingHistory([{
      month: 0,
      ...wellbeing,
      score: calculateWellbeingScore(wellbeing)
    }]);
    setVllMessages([{
      timestamp: "SYSTEM",
      topic: "ALERT",
      text: `DEPLOYING BLUEPRINT: ${activeCountry.blueprint.name}`,
      sentiment: 0
    }]);
  }, [activeCountry.blueprint.name, advanceStage, wellbeing]);

  // Launch anti-fragile (probes) strategy
  const launchAntiFragile = useCallback(() => {
    setStrategy('antifragile');
    setInitialWellbeing({ ...wellbeing });
    
    // Initialize probes with enhanced data
    const initializedProbes = activeCountry.probes.map(p => ({
      ...p,
      status: 'active',
      fit: calculateCulturalFit(p, activeCountry.contextFactors)
    }));
    setProbes(initializedProbes);
    
    // Set start months for all probes
    const startMonths = {};
    initializedProbes.forEach(p => {
      startMonths[p.id] = 0;
    });
    setProbeStartMonths(startMonths);
    
    advanceStage('monitor');
    setSimulationRunning(true);
    setCurrentMonth(0);
    setWellbeingHistory([{
      month: 0,
      ...wellbeing,
      score: calculateWellbeingScore(wellbeing)
    }]);
    setVllMessages([{
      timestamp: "SYSTEM",
      topic: "DEPLOY",
      text: `Launching ${activeCountry.probes.length} evidence-based probes...`,
      sentiment: 0
    }]);
  }, [activeCountry.probes, activeCountry.contextFactors, advanceStage, wellbeing]);

  // Manage probe (retire or amplify)
  const manageProbe = useCallback((id, action) => {
    const probe = probes.find(p => p.id === id);
    
    setProbes(prev => prev.map(p => {
      if (p.id !== id) return p;
      return { ...p, status: action === 'retire' ? 'retired' : 'amplified' };
    }));

    if (action === 'retire' && probe) {
      // Capture lesson from retired probe
      setLessons(prev => [...prev, { 
        source: probe.name, 
        text: probe.lesson,
        evidenceSource: probe.evidenceSource,
        month: currentMonth
      }]);
      
      const msg = generateNarrativeMessage('probe_retired', { probeName: probe.name });
      setVllMessages(prev => [msg, ...prev].slice(0, 50));
    } else if (action === 'amplify' && probe) {
      const msg = generateNarrativeMessage('probe_amplified', { probeName: probe.name });
      setVllMessages(prev => [msg, ...prev].slice(0, 50));
    }
  }, [probes, currentMonth]);

  // Complete current cycle and save to history
  const completeCycle = useCallback(() => {
    const cycleData = {
      cycleNumber: cycleCount,
      countryName: activeCountry.name,
      countryId: activeCountry.id,
      strategy,
      duration: currentMonth,
      startDate: new Date(Date.now() - currentMonth * 2000).toISOString(),
      endDate: new Date().toISOString(),
      initialWellbeing,
      finalWellbeing: { ...wellbeing },
      wellbeingChange: Object.keys(wellbeing).reduce((acc, key) => {
        acc[key] = Math.round((wellbeing[key] - initialWellbeing[key]) * 10) / 10;
        return acc;
      }, {}),
      probes: probes.map(p => ({
        id: p.id,
        name: p.name,
        finalStatus: p.status,
        evidenceSource: p.evidenceSource,
        lesson: p.lesson
      })),
      lessons,
      riskEventLog,
      snapshots,
      finalScore: wellbeingScore,
      finalTrust: publicTrust
    };
    
    const newHistory = [...cycleHistory, cycleData];
    setCycleHistory(newHistory);
    saveCycleHistory(newHistory);
    
    return cycleData;
  }, [
    cycleCount, activeCountry, strategy, currentMonth, 
    initialWellbeing, wellbeing, probes, lessons, 
    riskEventLog, snapshots, wellbeingScore, publicTrust,
    cycleHistory, saveCycleHistory
  ]);

  // Start new cycle
  const startNewCycle = useCallback(() => {
    // Save current cycle to history first
    if (strategy) {
      completeCycle();
    }
    
    const newCycleCount = cycleCount + 1;
    setCycleCount(newCycleCount);
    setCycleStage('diagnose');
    setCompletedStages([]);
    setStrategy(null);
    setSimulationRunning(false);
    setCurrentMonth(0);
    setProbeStartMonths({});
    setEffectAttribution({});
    setProbeEffects([]);
    setActiveRisks([]);
    setRiskEventLog([]);
    setSnapshots([]);
    
    // IMPORTANT: Carry over wellbeing - set current as new baseline for next cycle
    setInitialWellbeing({ ...wellbeing });
    setWellbeingChanges({});
    
    // Start new wellbeing history from current state
    setWellbeingHistory([{
      month: 0,
      score: Math.round(Object.values(wellbeing).reduce((a, b) => a + b, 0) / 6),
      ...wellbeing
    }]);
    
    // Keep lessons accumulated across cycles
    setVllMessages(prev => [{
      timestamp: "SYSTEM",
      topic: "CYCLE",
      text: `Starting Cycle ${newCycleCount}. Wellbeing carried forward. Previous lessons retained.`,
      sentiment: 0
    }, ...prev.slice(0, 10)]);
  }, [cycleCount, strategy, completeCycle, wellbeing]);

  // Reset simulation (for country change or manual reset)
  const resetSimulation = useCallback(() => {
    setCycleStage('diagnose');
    setCompletedStages([]);
    setStrategy(null);
    setWellbeing({ ...activeCountry.wellbeing });
    setInitialWellbeing({ ...activeCountry.wellbeing });
    setWellbeingChanges({});
    setProbes([]);
    setVllMessages([]);
    setEmotionHistory([]);
    setLessons([]);
    setCycleCount(1);
    setSimulationRunning(false);
    setCurrentMonth(0);
    setProbeStartMonths({});
    setEffectAttribution({});
    setProbeEffects([]);
    setActiveRisks([]);
    setRiskEventLog([]);
    setSnapshots([]);
    setWellbeingHistory([]);
  }, [activeCountry.wellbeing]);

  // Export current cycle data
  const exportCycleData = useCallback(() => {
    const cycleData = {
      cycleNumber: cycleCount,
      countryName: activeCountry.name,
      strategy,
      currentMonth,
      initialWellbeing,
      finalWellbeing: wellbeing,
      probes,
      lessons,
      riskEventLog,
      snapshots
    };
    return formatExportData(cycleData);
  }, [cycleCount, activeCountry, strategy, currentMonth, initialWellbeing, wellbeing, probes, lessons, riskEventLog, snapshots]);

  // Export full history
  const exportFullHistory = useCallback(() => {
    return {
      exportedAt: new Date().toISOString(),
      totalCycles: cycleHistory.length,
      cycles: cycleHistory.map(c => formatExportData(c))
    };
  }, [cycleHistory]);

  // Clear cycle history
  const clearCycleHistory = useCallback(() => {
    setCycleHistory([]);
    localStorage.removeItem(STORAGE_KEYS.CYCLE_HISTORY);
  }, []);

  // Set simulation speed
  const setSpeed = useCallback((speedMs) => {
    simulationSpeed.current = speedMs;
  }, []);

  return {
    // Core State
    cycleStage,
    completedStages,
    strategy,
    wellbeing,
    wellbeingChanges,
    wellbeingScore,
    publicTrust,
    probes,
    vllMessages,
    emotionHistory,
    lessons,
    cycleCount,
    simulationRunning,
    
    // Timeline State
    currentMonth,
    currentQuarter: Math.ceil((currentMonth || 1) / 3),
    currentYear: Math.ceil((currentMonth || 1) / 12),
    wellbeingHistory,
    snapshots,
    
    // Effects Transparency
    effectAttribution,
    probeEffects,
    
    // Risk Events
    activeRisks,
    riskEventLog,
    
    // Cycle History
    cycleHistory,
    initialWellbeing,
    
    // Actions
    advanceStage,
    launchFragile,
    launchAntiFragile,
    manageProbe,
    startNewCycle,
    resetSimulation,
    completeCycle,
    
    // Export
    exportCycleData,
    exportFullHistory,
    clearCycleHistory,
    
    // Settings
    setSpeed
  };
};

export default useSimulation;
