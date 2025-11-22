import React, { useState } from 'react';
import { Shield, AlertTriangle, TrendingUp, Users, Activity, XCircle, CheckCircle, Play, BarChart3, Globe } from 'lucide-react';
import { COUNTRIES } from '../data/countries';
import DimensionBar from './ui/DimensionBar';
import SentimentStream from './ui/SentimentStream';
import { useSimulation } from '../hooks/useSimulation';

export default function GovernorSandbox() {
  const [activeCountry, setActiveCountry] = useState(COUNTRIES.Japan);
  
  const {
    phase,
    strategy,
    wellbeingScore,
    publicTrust,
    vllMessages,
    probes,
    launchFragile,
    launchAntiFragile,
    manageProbe
  } = useSimulation(activeCountry);

  const selectCountry = (c) => {
    setActiveCountry(c);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER */}
      <header className="bg-indigo-900 text-white p-4 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="text-teal-400" />
          <div>
            <h1 className="text-xl font-bold tracking-wider">GOVERNOR'S SANDBOX</h1>
            <p className="text-xs text-indigo-200">Anti-Fragile Policy Simulator // V 1.0</p>
          </div>
        </div>
        <div className="flex gap-6 text-sm">
          <div className="flex flex-col items-end">
            <span className="text-indigo-300 uppercase text-xs">Well-Being Index</span>
            <span className={`font-bold text-xl ${wellbeingScore < 40 ? 'text-red-400' : 'text-teal-400'}`}>{Math.round(wellbeingScore)}</span>
          </div>
           <div className="flex flex-col items-end">
            <span className="text-indigo-300 uppercase text-xs">Public Trust</span>
            <span className={`font-bold text-xl ${publicTrust < 40 ? 'text-red-400' : 'text-teal-400'}`}>{Math.round(publicTrust)}%</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        
        {/* COUNTRY SELECTOR */}
        {phase === 'briefing' && (
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Globe size={18}/> SELECT JURISDICTION</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.values(COUNTRIES).map(country => (
                <button 
                  key={country.id}
                  onClick={() => selectCountry(country)}
                  className={`p-4 rounded-lg border-2 transition-all text-left relative overflow-hidden
                    ${activeCountry.id === country.id ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-indigo-300 bg-white'}
                  `}
                >
                  <div className="text-4xl mb-2">{country.flag}</div>
                  <div className="font-bold text-lg">{country.name}</div>
                  <div className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Case Study</div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT PANEL: CONTEXT */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* HOFSTEDE CARD */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="text-sm font-bold text-slate-400 uppercase mb-4 flex items-center gap-2">
                <BarChart3 size={16}/> Cultural Levers ({activeCountry.id})
              </h3>
              <div className="space-y-3">
                <DimensionBar label="Power Distance (PDI)" value={activeCountry.dimensions.PDI} color="bg-blue-500" />
                <DimensionBar label="Individualism (IDV)" value={activeCountry.dimensions.IDV} color="bg-purple-500" />
                <DimensionBar label="Uncertainty Avoidance (UAI)" value={activeCountry.dimensions.UAI} color="bg-red-500" />
                <DimensionBar label="Long Term Orient. (LTO)" value={activeCountry.dimensions.LTO} color="bg-teal-500" />
              </div>
              <div className="mt-4 p-3 bg-slate-100 rounded text-xs text-slate-600 italic leading-relaxed">
                "{activeCountry.context}"
              </div>
            </div>

            {/* STRESSOR CARD */}
            <div className="bg-orange-50 p-6 rounded-xl shadow-sm border border-orange-100">
               <h3 className="text-sm font-bold text-orange-800 uppercase mb-2 flex items-center gap-2">
                <AlertTriangle size={16}/> Active Crisis
              </h3>
              <p className="text-lg font-bold text-slate-800 mb-2">{activeCountry.stressor}</p>
              <p className="text-sm text-slate-600">Public sentiment is deteriorating. Immediate intervention required to stabilize well-being metrics.</p>
            </div>

          </div>

          {/* CENTER/RIGHT PANEL: ACTION & SIMULATION */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PHASE 1: INTERVENTION SELECTION */}
            {phase === 'briefing' && (
              <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 text-center">
                <h2 className="text-2xl font-bold mb-6 text-slate-800">Choose Policy Approach</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* OPTION A: FRAGILE */}
                  <button onClick={launchFragile} className="group relative overflow-hidden rounded-xl border-2 border-slate-200 p-6 hover:border-red-400 hover:bg-red-50 transition-all text-left">
                    <div className="absolute top-0 right-0 bg-slate-200 text-slate-600 text-xs px-2 py-1 rounded-bl font-bold">TRADITIONAL</div>
                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0">🏗️</div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-red-700">The Blueprint</h3>
                    <p className="text-sm text-slate-500 mt-2 mb-4">Launch a massive, definitive solution. High cost, locked-in scope.</p>
                    <div className="bg-white p-3 rounded border border-slate-200 text-xs font-mono text-slate-600">
                      <span className="font-bold block mb-1">PROPOSAL:</span>
                      {activeCountry.blueprint.name}
                    </div>
                    <div className="mt-4 text-xs font-bold text-red-500 flex items-center gap-1">
                      <AlertTriangle size={12}/> RISK: HIGH
                    </div>
                  </button>

                  {/* OPTION B: ANTI-FRAGILE */}
                  <button onClick={launchAntiFragile} className="group relative overflow-hidden rounded-xl border-2 border-indigo-100 p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all text-left ring-1 ring-indigo-50">
                     <div className="absolute top-0 right-0 bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-bl font-bold">ADAPTIVE</div>
                     <div className="text-4xl mb-4 grayscale group-hover:grayscale-0">🌱</div>
                    <h3 className="text-xl font-bold text-slate-800 group-hover:text-indigo-700">Anti-Fragile Probes</h3>
                    <p className="text-sm text-slate-500 mt-2 mb-4">Launch small, parallel experiments. Learn from failure, amplify success.</p>
                     <div className="bg-white p-3 rounded border border-slate-200 text-xs font-mono text-slate-600">
                      <span className="font-bold block mb-1">PROPOSALS:</span>
                      <ul className="list-disc pl-4">
                        {activeCountry.probes.map(p => <li key={p.id}>{p.name}</li>)}
                      </ul>
                    </div>
                    <div className="mt-4 text-xs font-bold text-indigo-500 flex items-center gap-1">
                      <TrendingUp size={12}/> UPSIDE: UNLIMITED
                    </div>
                  </button>

                </div>
              </div>
            )}

            {/* PHASE 2: MONITORING DASHBOARD */}
            {phase === 'monitoring' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                
                {/* HEADER FOR DASHBOARD */}
                <div className="flex justify-between items-end">
                   <div>
                     <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                       {strategy === 'fragile' ? <span className="text-red-600">⚠️ BLUEPRINT DEPLOYED</span> : <span className="text-indigo-600">⚡ ACTIVE PROBES</span>}
                     </h2>
                     <p className="text-sm text-slate-500">Monitoring VLL Narrative Feedback...</p>
                   </div>
                   <button onClick={() => selectCountry(activeCountry)} className="text-sm text-slate-400 hover:text-slate-700 underline">Reset Simulation</button>
                </div>

                {/* PROBE CONTROLS (ONLY FOR ANTI-FRAGILE) */}
                {strategy === 'antifragile' && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {probes.map(probe => (
                      <div key={probe.id} className={`
                        p-4 rounded-lg border-2 relative transition-all duration-500
                        ${probe.status === 'retired' ? 'border-slate-100 bg-slate-50 opacity-50 scale-95' : ''}
                        ${probe.status === 'amplified' ? 'border-green-500 bg-green-50 ring-2 ring-green-200 scale-105' : ''}
                        ${probe.status === 'active' ? 'border-indigo-200 bg-white' : ''}
                      `}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm">{probe.name}</h4>
                          {probe.status === 'active' && <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full">TESTING</span>}
                          {probe.status === 'retired' && <span className="bg-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-full">RETIRED</span>}
                          {probe.status === 'amplified' && <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full">SCALING</span>}
                        </div>
                        <p className="text-xs text-slate-500 mb-4 h-8 leading-tight">{probe.desc}</p>
                        
                        {/* CULTURAL FIT INDICATOR (HIDDEN INITIALLY, REVEALED BY NARRATIVE) */}
                        <div className="mb-4">
                          <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Projected Fit</div>
                          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                             <div className={`h-full ${probe.fit > 0.7 ? 'bg-green-400' : 'bg-red-400'}`} style={{width: `${probe.fit * 100}%`}}></div>
                          </div>
                        </div>

                        {probe.status === 'active' && (
                          <div className="flex gap-2">
                             <button onClick={() => manageProbe(probe.id, 'retire')} className="flex-1 bg-white border border-red-200 text-red-600 hover:bg-red-50 text-xs py-2 rounded font-bold flex justify-center items-center gap-1">
                               <XCircle size={12}/> CUT
                             </button>
                             <button onClick={() => manageProbe(probe.id, 'amplify')} className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs py-2 rounded font-bold flex justify-center items-center gap-1 shadow-md hover:shadow-lg transition-all">
                               <CheckCircle size={12}/> AMPLIFY
                             </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* BLUEPRINT STATUS (ONLY FOR FRAGILE) */}
                {strategy === 'fragile' && (
                   <div className={`p-6 rounded-xl border-2 ${wellbeingScore < 40 ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-white'}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-3xl">🏗️</div>
                        <div>
                          <h3 className="font-bold text-lg">{activeCountry.blueprint.name}</h3>
                          <p className="text-sm text-slate-600">Status: {wellbeingScore < 40 ? "CRITICAL FAILURE" : "OPERATIONAL"}</p>
                        </div>
                      </div>
                      <div className="bg-white/50 p-4 rounded text-sm font-mono">
                        <span className="font-bold">SYSTEM ALERT:</span> {wellbeingScore < 40 ? "Policy rejected by cultural immune system. Resistance widespread." : "Policy accepted, but cost of failure remains high."}
                      </div>
                   </div>
                )}

                {/* VLL FEED */}
                <SentimentStream messages={vllMessages} />

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
