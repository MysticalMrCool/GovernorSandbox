// src/hooks/useSimulation.js

import { useState, useEffect, useCallback } from 'react';
import { EMOTIONS } from '../data/constants';

export const useSimulation = (activeCountry) => {
  const [cycleStage, setCycleStage] = useState('diagnose');
  const [completedStages, setCompletedStages] = useState([]);
  const [strategy, setStrategy] = useState(null);
  const [wellbeing, setWellbeing] = useState({ ...activeCountry.wellbeing });
  const [wellbeingChanges, setWellbeingChanges] = useState({});
  const [probes, setProbes] = useState([]);
  const [vllMessages, setVllMessages] = useState([]);
  const [emotionHistory, setEmotionHistory] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [cycleCount, setCycleCount] = useState(1);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Calculate aggregate scores
  const wellbeingScore = Math.round(
    Object.values(wellbeing).reduce((a, b) => a + b, 0) / 6
  );
  
  const publicTrust = Math.round(
    (wellbeing.civic * 0.3 + 
     wellbeing.psychological * 0.2 + 
     wellbeing.social * 0.3 + 
     wellbeingScore * 0.2)
  );

  // Reset when country changes
  useEffect(() => {
    setCycleStage('diagnose');
    setCompletedStages([]);
    setStrategy(null);
    setWellbeing({ ...activeCountry.wellbeing });
    setWellbeingChanges({});
    setProbes([]);
    setVllMessages([]);
    setEmotionHistory([]);
    setLessons([]);
    setCycleCount(1);
    setSimulationRunning(false);
  }, [activeCountry]);

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
    
    const point = { time: emotionHistory.length };
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
  }, [wellbeingScore, publicTrust, wellbeing.social, wellbeing.psychological, emotionHistory.length]);

  // Main simulation loop
  useEffect(() => {
    if (!simulationRunning) return;

    const interval = setInterval(() => {
      const time = new Date().toLocaleTimeString();
      let newMessage = {};
      const changes = {};

      if (strategy === 'fragile') {
        // FRAGILE LOGIC: High risk, mostly negative unless lucky
        const isSuccess = Math.random() < activeCountry.blueprint.fitScore;

        if (isSuccess) {
          newMessage = { 
            timestamp: time, 
            topic: "Media", 
            text: "Policy showing early signs of stability.", 
            sentiment: 1 
          };
          Object.keys(wellbeing).forEach(key => {
            changes[key] = Math.random() < 0.3 ? 1 : 0;
          });
        } else {
          const negatives = [
            "Mass protests erupting against new mandates.",
            "Local leaders publicly denouncing central policy.",
            "#NotMyPolicy trending nationwide.",
            "Cultural experts warn of 'tone-deaf' approach.",
            "Opposition calling for immediate policy reversal."
          ];
          newMessage = { 
            timestamp: time, 
            topic: "Crisis", 
            text: negatives[Math.floor(Math.random() * negatives.length)], 
            sentiment: -1 
          };
          Object.keys(wellbeing).forEach(key => {
            changes[key] = Math.random() < 0.5 ? -2 : -1;
          });
        }
      } else if (strategy === 'antifragile') {
        // ANTI-FRAGILE LOGIC: Mixed results based on probe fit
        const activeProbes = probes.filter(p => p.status === 'active' || p.status === 'amplified');
        if (activeProbes.length === 0) return;

        const probe = activeProbes[Math.floor(Math.random() * activeProbes.length)];
        
        // Calculate success based on probe fit + bonus if amplified
        let chance = probe.fit;
        if (probe.status === 'amplified') chance = Math.min(0.95, chance + 0.15);

        const isGood = Math.random() < chance;

        if (isGood) {
          const positives = [
            `Community leaders endorsing ${probe.name}.`,
            `"This actually works for us" - Local feedback on ${probe.name}.`,
            `${probe.name} exceeding initial adoption targets.`,
            `Neighboring districts requesting ${probe.name} expansion.`
          ];
          newMessage = { 
            timestamp: time, 
            topic: probe.name, 
            text: positives[Math.floor(Math.random() * positives.length)], 
            sentiment: 1 
          };
          probe.affectedDomains?.forEach(domain => {
            const gain = probe.status === 'amplified' ? 2 : 1;
            changes[domain] = gain;
          });
        } else {
          const negatives = [
            `Minor resistance to ${probe.name} in some areas.`,
            `${probe.name} facing logistical challenges.`,
            `Adoption slower than expected for ${probe.name}.`
          ];
          newMessage = { 
            timestamp: time, 
            topic: probe.name, 
            text: negatives[Math.floor(Math.random() * negatives.length)], 
            sentiment: -1 
          };
          probe.affectedDomains?.forEach(domain => {
            changes[domain] = -0.5;
          });
        }
      }

      // Apply changes to wellbeing
      setWellbeing(prev => {
        const next = { ...prev };
        Object.keys(changes).forEach(key => {
          next[key] = Math.max(0, Math.min(100, prev[key] + changes[key]));
        });
        return next;
      });
      
      setWellbeingChanges(changes);
      setVllMessages(prev => [newMessage, ...prev].slice(0, 50));
      setEmotionHistory(prev => [...prev, generateEmotionPoint()].slice(-30));
    }, 2000);

    return () => clearInterval(interval);
  }, [simulationRunning, strategy, probes, activeCountry, wellbeing, generateEmotionPoint]);

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
    advanceStage('monitor');
    setSimulationRunning(true);
    setVllMessages([{
      timestamp: "SYSTEM",
      topic: "ALERT",
      text: `DEPLOYING BLUEPRINT: ${activeCountry.blueprint.name}`,
      sentiment: 0
    }]);
  }, [activeCountry.blueprint.name, advanceStage]);

  // Launch anti-fragile (probes) strategy
  const launchAntiFragile = useCallback(() => {
    setStrategy('antifragile');
    setProbes(activeCountry.probes.map(p => ({ ...p, status: 'active' })));
    advanceStage('monitor');
    setSimulationRunning(true);
    setVllMessages([{
      timestamp: "SYSTEM",
      topic: "DEPLOY",
      text: `Launching ${activeCountry.probes.length} safe-to-fail probes...`,
      sentiment: 0
    }]);
  }, [activeCountry.probes, advanceStage]);

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
        text: probe.lesson 
      }]);
      setVllMessages(prev => [{
        timestamp: "SYSTEM",
        topic: "LEARNING",
        text: `Probe retired. Lesson captured: "${probe.lesson.substring(0, 50)}..."`,
        sentiment: 0
      }, ...prev]);
    } else if (action === 'amplify') {
      setVllMessages(prev => [{
        timestamp: "SYSTEM",
        topic: "SCALING",
        text: `Resources reallocated to amplify ${probe?.name}. Monitoring intensified.`,
        sentiment: 1
      }, ...prev]);
    }
  }, [probes]);

  // Start new cycle
  const startNewCycle = useCallback(() => {
    setCycleCount(prev => prev + 1);
    setCycleStage('diagnose');
    setCompletedStages([]);
    setStrategy(null);
    setSimulationRunning(false);
    // Keep wellbeing, lessons, and some history
    setVllMessages(prev => [{
      timestamp: "SYSTEM",
      topic: "CYCLE",
      text: `Starting Cycle ${cycleCount + 1}. Previous lessons retained.`,
      sentiment: 0
    }, ...prev.slice(0, 10)]);
  }, [cycleCount]);

  // Reset simulation (for country change)
  const resetSimulation = useCallback(() => {
    setCycleStage('diagnose');
    setCompletedStages([]);
    setStrategy(null);
    setWellbeing({ ...activeCountry.wellbeing });
    setWellbeingChanges({});
    setProbes([]);
    setVllMessages([]);
    setEmotionHistory([]);
    setLessons([]);
    setCycleCount(1);
    setSimulationRunning(false);
  }, [activeCountry.wellbeing]);

  return {
    // State
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
    
    // Actions
    advanceStage,
    launchFragile,
    launchAntiFragile,
    manageProbe,
    startNewCycle,
    resetSimulation
  };
};

export default useSimulation;
