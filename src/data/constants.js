// src/data/constants.js

import { Search, Settings, Target, Activity, RefreshCw } from 'lucide-react';
import { Heart, Brain, Users, Landmark, Wallet, Leaf } from 'lucide-react';

export const CYCLE_STAGES = [
  { id: 'diagnose', name: 'Diagnose', icon: Search, desc: 'Map fragilities using well-being indicators and narrative signals' },
  { id: 'analyze', name: 'Analyze', icon: Settings, desc: 'Understand cultural levers that shape policy reception' },
  { id: 'design', name: 'Design', icon: Target, desc: 'Choose intervention strategy: Blueprint or Anti-Fragile Probes' },
  { id: 'monitor', name: 'Monitor', icon: Activity, desc: 'Track real-time feedback from VLL and well-being metrics' },
  { id: 'refine', name: 'Refine', icon: RefreshCw, desc: 'Retire failures, amplify successes, capture lessons' }
];

export const WELLBEING_DOMAINS = [
  { key: 'health', name: 'Health', icon: Heart, color: '#ef4444' },
  { key: 'psychological', name: 'Psychological', icon: Brain, color: '#8b5cf6' },
  { key: 'social', name: 'Social', icon: Users, color: '#3b82f6' },
  { key: 'civic', name: 'Civic', icon: Landmark, color: '#f59e0b' },
  { key: 'economic', name: 'Economic', icon: Wallet, color: '#10b981' },
  { key: 'environmental', name: 'Environmental', icon: Leaf, color: '#06b6d4' }
];

export const EMOTIONS = [
  { key: 'hope', color: '#22c55e' },
  { key: 'fear', color: '#ef4444' },
  { key: 'anger', color: '#f97316' },
  { key: 'belonging', color: '#3b82f6' },
  { key: 'optimism', color: '#a855f7' },
  { key: 'anxiety', color: '#eab308' }
];

// Evidence confidence levels for probes
export const CONFIDENCE_LEVELS = {
  high: {
    label: 'High Confidence',
    description: 'Based on RCTs, meta-analyses, or well-established WHO/government statistics',
    color: '#22c55e',
    multiplier: 1.0
  },
  medium: {
    label: 'Medium Confidence', 
    description: 'Based on observational studies, expert reports, or regional data',
    color: '#f59e0b',
    multiplier: 0.85
  },
  low: {
    label: 'Low Confidence',
    description: 'Based on estimates, limited studies, or extrapolated data',
    color: '#ef4444',
    multiplier: 0.7
  }
};

// Timeline simulation settings
export const SIMULATION_SETTINGS = {
  monthsPerQuarter: 3,
  quartersPerYear: 4,
  defaultLagMonths: 6,
  riskCheckInterval: 3, // Check for risk events every 3 months
  maxActiveRisks: 3,
  riskDurationMonths: { min: 6, max: 18 },
  effectDecayRate: 0.02, // Effects slightly decay over time without reinforcement
  amplificationMultiplier: 1.5,
  culturalFitThreshold: 0.4, // Below this, effects are significantly reduced
  snaphotInterval: 3 // Take wellbeing snapshot every quarter
};

// Strategy comparison settings
export const STRATEGY_SETTINGS = {
  antifragile: {
    name: 'Anti-Fragile Probes',
    description: 'Small, iterative experiments that adapt based on feedback',
    effectMultiplier: 0.7, // Start smaller
    growthPotential: 1.5, // But can grow larger with amplification
    failureCost: 0.3, // Failures have smaller impact
    adaptability: 'high'
  },
  fragile: {
    name: 'Blueprint Policy',
    description: 'Traditional top-down policy implementation',
    effectMultiplier: 1.0, // Full effect immediately
    growthPotential: 1.0, // Fixed effect
    failureCost: 1.0, // Full cost on failure
    adaptability: 'low'
  }
};

// Educational disclaimer
export const DISCLAIMER = {
  title: 'Educational Simulation Tool',
  text: `This sandbox is designed for educational purposes to illustrate policy concepts. 
While it uses real research data as a foundation, the outcomes are simplified simulations 
and should not be used for actual policy decisions. Real-world policy impact depends on 
countless factors not captured in any model.`,
  sources: [
    'World Health Organization (WHO) Reports',
    'World Bank Data & Policy Research',
    'UNICEF Country Statistics',
    'Academic Research & Meta-analyses',
    'Government Statistical Offices'
  ]
};

// TopoJSON URL for world map
export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// For higher detail, use:
// export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

