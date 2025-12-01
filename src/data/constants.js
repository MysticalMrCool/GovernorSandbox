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

// TopoJSON URL for world map
export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// For higher detail, use:
// export const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";
