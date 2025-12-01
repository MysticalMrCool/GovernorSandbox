// src/components/GovernorSandbox.jsx

import React, { useState, useCallback } from 'react';
import { 
  Shield, AlertTriangle, TrendingUp, Activity, Heart,
  ChevronRight, RotateCcw, Lightbulb, Target, Settings, RefreshCw
} from 'lucide-react';

import { 
  WorldMap, 
  CycleNavigator, 
  WellbeingRadar, 
  EmotionTrendChart,
  EmotionLegend,
  SentimentStream, 
  ProbeCard, 
  LessonsPanel 
} from './ui';

import COUNTRIES from '../data/countries';
import { useSimulation } from '../hooks/useSimulation';

const GovernorSandbox = () => {
  const [activeCountry, setActiveCountry] = useState(COUNTRIES.Japan);
  
  const {
    cycleStage,
    completedStages,
    strategy,
    wellbeing,
    wellbeingScore,
    publicTrust,
    probes,
    vllMessages,
    emotionHistory,
    lessons,
    cycleCount,
    simulationRunning,
    advanceStage,
    launchFragile,
    launchAntiFragile,
    manageProbe,
    startNewCycle,
    resetSimulation
  } = useSimulation(activeCountry);

  const selectCountry = useCallback((country) => {
    setActiveCountry(country);
    resetSimulation();
  }, [resetSimulation]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* HEADER */}
      <header className="bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-[1800px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <Shield className="text-indigo-400" size={26} />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">Anti-Fragile Well-Being</h1>
                <p className="text-slate-500 text-xs">Cultural Systems Framework for Adaptive Policy</p>
              </div>
            </div>
            
            <CycleNavigator currentStage={cycleStage} completedStages={completedStages} />
            
            <div className="flex items-center gap-4">
              <div className="text-center px-4 py-2 bg-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase">Cycle</div>
                <div className="text-xl font-bold text-indigo-400">{cycleCount}</div>
              </div>
              <div className="text-center px-4 py-2 bg-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase">Well-Being</div>
                <div className={`text-xl font-bold ${wellbeingScore < 40 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {wellbeingScore}
                </div>
              </div>
              <div className="text-center px-4 py-2 bg-slate-800 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase">Trust</div>
                <div className={`text-xl font-bold ${publicTrust < 40 ? 'text-red-400' : 'text-emerald-400'}`}>
                  {publicTrust}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WORLD MAP */}
      <div className="relative">
        <WorldMap
          activeCountry={activeCountry}
          onSelectCountry={selectCountry}
          disabled={simulationRunning}
        />
        
        {/* Floating Country Panel */}
        <div className="absolute top-4 left-4 w-80 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-4 py-3 flex items-center gap-3">
            <span className="text-3xl">{activeCountry.flag}</span>
            <div>
              <h2 className="font-bold text-lg">{activeCountry.name}</h2>
              <p className="text-indigo-200 text-xs">{activeCountry.stressor}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-400 italic mb-3">"{activeCountry.context}"</p>
            
            <div className="grid grid-cols-6 gap-2 mb-4">
              {Object.entries(activeCountry.dimensions).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-[10px] text-slate-500">{key}</div>
                  <div className="text-sm font-bold text-white">{value}</div>
                </div>
              ))}
            </div>
            
            {cycleStage === 'diagnose' && (
              <button 
                onClick={() => advanceStage('analyze')} 
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all"
              >
                Begin Analysis <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Floating Well-being Panel */}
        <div className="absolute top-4 right-4 w-72 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl">
          <div className="px-4 py-2 border-b border-slate-700 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
              <Heart size={12} className="text-red-400" /> Well-Being Domains
            </h3>
            <span className={`text-lg font-bold ${wellbeingScore < 40 ? 'text-red-400' : 'text-emerald-400'}`}>
              {wellbeingScore}
            </span>
          </div>
          <WellbeingRadar data={wellbeing} />
        </div>

        {/* Crisis Alert */}
        {(cycleStage === 'diagnose' || cycleStage === 'analyze') && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-lg px-6 py-2 flex items-center gap-3">
            <AlertTriangle className="text-red-400" size={18} />
            <span className="text-red-300 text-sm font-medium">{activeCountry.stressorDetail}</span>
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      <main className="max-w-[1800px] mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* LEFT - Context */}
          <div className="col-span-3 space-y-4">
            {(cycleStage === 'analyze' || cycleStage === 'design') && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                  <Settings size={12} /> Cultural Insights
                </h3>
                <div className="space-y-2">
                  {activeCountry.culturalInsights.map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-800/50 rounded p-2">
                      <Lightbulb size={12} className="text-amber-400 flex-shrink-0 mt-0.5" />
                      {insight}
                    </div>
                  ))}
                </div>
                {cycleStage === 'analyze' && (
                  <button 
                    onClick={() => advanceStage('design')} 
                    className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2"
                  >
                    Design Intervention <ChevronRight size={14} />
                  </button>
                )}
              </div>
            )}
            
            {lessons.length > 0 && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                <h3 className="text-xs font-bold text-amber-400 uppercase mb-3 flex items-center gap-2">
                  <Lightbulb size={12} /> Lessons Learned ({lessons.length})
                </h3>
                <LessonsPanel lessons={lessons} />
              </div>
            )}
          </div>

          {/* CENTER - Main */}
          <div className="col-span-6 space-y-4">
            {/* DESIGN STAGE */}
            {cycleStage === 'design' && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Target className="text-amber-400" size={20} />
                  Choose Policy Approach
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Fragile Option */}
                  <button 
                    onClick={launchFragile} 
                    className="group rounded-xl border-2 border-slate-700 p-5 hover:border-red-500 hover:bg-red-500/5 text-left transition-all relative"
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded font-bold">
                      FRAGILE
                    </div>
                    <div className="text-4xl mb-3">🏗️</div>
                    <h3 className="text-lg font-bold group-hover:text-red-400">The Blueprint</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-3">Massive top-down solution</p>
                    <div className="bg-slate-800 rounded-lg p-3 mb-3">
                      <div className="text-[10px] text-slate-500">PROPOSAL</div>
                      <div className="text-sm font-medium">{activeCountry.blueprint.name}</div>
                    </div>
                    <div className="text-[10px] text-red-400">{activeCountry.blueprint.whyBad}</div>
                    <div className="mt-3 text-xs text-red-400 font-bold flex items-center gap-1">
                      <AlertTriangle size={12} /> Cultural Fit: {Math.round(activeCountry.blueprint.fitScore * 100)}%
                    </div>
                  </button>
                  
                  {/* Anti-Fragile Option */}
                  <button 
                    onClick={launchAntiFragile} 
                    className="group rounded-xl border-2 border-indigo-500/50 p-5 hover:border-indigo-500 hover:bg-indigo-500/5 text-left transition-all ring-1 ring-indigo-500/20 relative"
                  >
                    <div className="absolute top-2 right-2 text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded font-bold">
                      ADAPTIVE
                    </div>
                    <div className="text-4xl mb-3">🌱</div>
                    <h3 className="text-lg font-bold group-hover:text-indigo-400">Anti-Fragile Probes</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-3">Safe to fail, fast to learn</p>
                    <div className="bg-slate-800 rounded-lg p-3 mb-3">
                      <div className="text-[10px] text-slate-500">PROBES</div>
                      {activeCountry.probes.map(p => (
                        <div key={p.id} className="flex items-center gap-2 text-sm">
                          <span className={`w-2 h-2 rounded-full ${p.fit > 0.7 ? 'bg-green-500' : 'bg-amber-500'}`} />
                          {p.name}
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-green-400">Failures contained, successes scale</div>
                    <div className="mt-3 text-xs text-indigo-400 font-bold flex items-center gap-1">
                      <TrendingUp size={12} /> Avg Fit: {Math.round(activeCountry.probes.reduce((a, p) => a + p.fit, 0) / activeCountry.probes.length * 100)}%
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* MONITOR STAGE */}
            {cycleStage === 'monitor' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Activity className={strategy === 'fragile' ? 'text-red-400' : 'text-green-400'} size={20} />
                    {strategy === 'fragile' ? 'Blueprint Deployed' : 'Probes Active'}
                  </h2>
                  <button 
                    onClick={() => advanceStage('refine')} 
                    className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
                  >
                    Proceed to Refine <ChevronRight size={14} />
                  </button>
                </div>
                
                {strategy === 'antifragile' && (
                  <div className="grid grid-cols-3 gap-3">
                    {probes.map(probe => (
                      <ProbeCard 
                        key={probe.id} 
                        probe={probe} 
                        onManage={manageProbe} 
                        showActions={false} 
                      />
                    ))}
                  </div>
                )}
                
                {strategy === 'fragile' && (
                  <div className={`rounded-xl p-4 border-2 ${wellbeingScore < 40 ? 'border-red-500 bg-red-500/10' : 'border-slate-700 bg-slate-800'}`}>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">🏗️</span>
                      <div>
                        <div className="font-bold">{activeCountry.blueprint.name}</div>
                        <div className={`text-sm ${wellbeingScore < 40 ? 'text-red-400' : 'text-slate-400'}`}>
                          {wellbeingScore < 40 ? '⚠️ CRITICAL FAILURE' : 'Under stress'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* REFINE STAGE */}
            {cycleStage === 'refine' && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <RefreshCw className="text-teal-400" size={20} />
                  Refine, Replicate, or Retire
                </h2>
                
                {strategy === 'antifragile' && (
                  <div className="grid grid-cols-3 gap-3">
                    {probes.map(probe => (
                      <ProbeCard 
                        key={probe.id} 
                        probe={probe} 
                        onManage={manageProbe} 
                        showActions={true} 
                      />
                    ))}
                  </div>
                )}
                
                {strategy === 'fragile' && (
                  <div className={`rounded-xl p-6 text-center ${wellbeingScore < 40 ? 'bg-red-500/10 border border-red-500/30' : 'bg-amber-500/10 border border-amber-500/30'}`}>
                    <div className="text-5xl mb-3">{wellbeingScore < 40 ? '💥' : '⚠️'}</div>
                    <h3 className={`text-xl font-bold ${wellbeingScore < 40 ? 'text-red-400' : 'text-amber-400'}`}>
                      {wellbeingScore < 40 ? 'Blueprint Failed' : 'Blueprint Struggling'}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2">
                      {wellbeingScore < 40 ? 'Consider adaptive probes next cycle.' : 'Policy holding with friction.'}
                    </p>
                  </div>
                )}
                
                <button 
                  onClick={startNewCycle} 
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
                >
                  <RotateCcw size={16} /> Start Cycle {cycleCount + 1}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT - VLL */}
          <div className="col-span-3 space-y-4">
            {simulationRunning && (
              <>
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Activity size={12} className="text-green-400" /> VLL Emotions
                    </span>
                    <span className="animate-pulse text-red-500 text-[10px]">● LIVE</span>
                  </h3>
                  <EmotionTrendChart data={emotionHistory} />
                  <EmotionLegend />
                </div>
                
                <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center justify-between">
                    Narrative Feed
                    <span className="animate-pulse text-green-500 text-[10px]">● STREAMING</span>
                  </h3>
                  <SentimentStream messages={vllMessages} />
                </div>
              </>
            )}
            
            {!simulationRunning && cycleStage !== 'design' && (
              <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
                <Activity className="mx-auto text-slate-700 mb-3" size={36} />
                <p className="text-slate-600 text-sm">VLL feed activates on deployment</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GovernorSandbox;
