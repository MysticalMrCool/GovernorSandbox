import { useState, useEffect } from 'react';

export const useSimulation = (activeCountry) => {
  const [phase, setPhase] = useState('briefing'); // briefing, intervention, monitoring, results
  const [strategy, setStrategy] = useState(null); // 'fragile' or 'antifragile'
  const [wellbeingScore, setWellbeingScore] = useState(50);
  const [publicTrust, setPublicTrust] = useState(50);
  const [vllMessages, setVllMessages] = useState([]);
  const [probes, setProbes] = useState([]);
  const [timer, setTimer] = useState(0);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Reset simulation when country changes
  useEffect(() => {
    setPhase('briefing');
    setStrategy(null);
    setWellbeingScore(50);
    setPublicTrust(50);
    setVllMessages([]);
    setProbes([]);
    setTimer(0);
    setSimulationRunning(false);
  }, [activeCountry]);

  // Simulation Loop
  useEffect(() => {
    let interval;
    if (simulationRunning) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
        generateNarrativeData();
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [simulationRunning, timer, strategy, probes, activeCountry]);

  const generateNarrativeData = () => {
    const time = new Date().toLocaleTimeString();
    let newMessage = {};
    
    if (strategy === 'fragile') {
      // FRAGILE LOGIC: High risk, mostly negative unless lucky
      const successChance = activeCountry.blueprint.fitScore; 
      const isSuccess = Math.random() < successChance;
      
      if (isSuccess) {
        newMessage = { timestamp: time, topic: "Mainstream Media", text: "Policy showing surprising early stability.", sentiment: 1 };
        setWellbeingScore(prev => Math.min(100, prev + 2));
        setPublicTrust(prev => Math.min(100, prev + 1));
      } else {
        const negatives = [
          "Citizens protesting new mandates in the capital.",
          "Local leaders feeling ignored by central decision.",
          "Hashtag #NotMyPolicy trending negatively.",
          "Confusion reported in rural districts.",
          "Cultural disconnect citing 'lack of respect'."
        ];
        newMessage = { timestamp: time, topic: "Social Sentiment", text: negatives[Math.floor(Math.random() * negatives.length)], sentiment: -1 };
        setWellbeingScore(prev => Math.max(0, prev - 3));
        setPublicTrust(prev => Math.max(0, prev - 4));
      }
    } else if (strategy === 'antifragile') {
      // ANTI-FRAGILE LOGIC: Mixed bag, depends on active probes
      // Pick a random active probe
      const activeProbes = probes.filter(p => p.status === 'active' || p.status === 'amplified');
      if (activeProbes.length === 0) return;

      const probe = activeProbes[Math.floor(Math.random() * activeProbes.length)];
      
      // Calculate success based on probe fit + bonus if amplified
      let chance = probe.fit;
      if (probe.status === 'amplified') chance += 0.2;

      const isGood = Math.random() < chance;

      if (isGood) {
         const positives = [
          `Local community praising ${probe.name}.`,
          `"Finally something that works for us" - User review regarding ${probe.name}.`,
          `${probe.name} showing positive ROI in initial data.`,
          `Neighborhood adoption of ${probe.name} growing.`
        ];
        newMessage = { timestamp: time, topic: `Probe: ${probe.name}`, text: positives[Math.floor(Math.random() * positives.length)], sentiment: 1 };
        // Small gains for normal, big for amplified
        const gain = probe.status === 'amplified' ? 4 : 1;
        setWellbeingScore(prev => Math.min(100, prev + gain));
        setPublicTrust(prev => Math.min(100, prev + gain));
      } else {
         const negatives = [
          `Minor friction reported in ${probe.name} pilot.`,
          `${probe.name} struggling with adoption in some sectors.`,
          `Logistical hiccup in ${probe.name}.`
        ];
        newMessage = { timestamp: time, topic: `Probe: ${probe.name}`, text: negatives[Math.floor(Math.random() * negatives.length)], sentiment: -1 };
        // Small losses (safe to fail)
        setWellbeingScore(prev => Math.max(0, prev - 1));
        setPublicTrust(prev => Math.max(0, prev - 0.5));
      }
    }

    setVllMessages(prev => [newMessage, ...prev].slice(0, 50));
  };

  const launchFragile = () => {
    setStrategy('fragile');
    setPhase('monitoring');
    setSimulationRunning(true);
    setVllMessages([{timestamp: "NOW", topic: "System", text: `DEPLOYING BLUEPRINT: ${activeCountry.blueprint.name}`, sentiment: 0}]);
  };

  const launchAntiFragile = () => {
    setStrategy('antifragile');
    setProbes(activeCountry.probes); // Load probes
    setPhase('monitoring');
    setSimulationRunning(true);
    setVllMessages([{timestamp: "NOW", topic: "System", text: `DEPLOYING 3 SAFE-TO-FAIL PROBES...`, sentiment: 0}]);
  };

  const manageProbe = (id, action) => {
    setProbes(prev => prev.map(p => {
      if (p.id !== id) return p;
      if (action === 'retire') return { ...p, status: 'retired' };
      if (action === 'amplify') return { ...p, status: 'amplified' };
      return p;
    }));
    
    if (action === 'retire') {
       setVllMessages(prev => [{timestamp: "SYSTEM", topic: "Controller", text: `Retiring probe. Learning captured. Failure contained.`, sentiment: 1}, ...prev]);
    }
    if (action === 'amplify') {
       setVllMessages(prev => [{timestamp: "SYSTEM", topic: "Controller", text: `Amplifying successful probe. Resources reallocated.`, sentiment: 1}, ...prev]);
    }
  };

  return {
    phase,
    strategy,
    wellbeingScore,
    publicTrust,
    vllMessages,
    probes,
    simulationRunning,
    launchFragile,
    launchAntiFragile,
    manageProbe
  };
};
