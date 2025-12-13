// src/components/ui/CycleHistory.jsx
// Component for viewing past cycles and comparing strategies

import React, { useState } from 'react';
import { 
  History, 
  ChevronDown, 
  ChevronUp, 
  Trash2,
  TrendingUp,
  TrendingDown,
  Award,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { WELLBEING_DOMAINS } from '../../data/constants';

const CycleHistory = ({ 
  cycleHistory, 
  onClearHistory,
  currentCountry 
}) => {
  const [expandedCycle, setExpandedCycle] = useState(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  // Filter history for current country
  const countryHistory = cycleHistory.filter(c => c.countryId === currentCountry?.id);
  const allHistory = cycleHistory;

  // Calculate best performing cycle
  const getBestCycle = (history) => {
    if (history.length === 0) return null;
    return history.reduce((best, cycle) => {
      const score = cycle.finalScore || 0;
      const bestScore = best?.finalScore || 0;
      return score > bestScore ? cycle : best;
    }, null);
  };

  const bestCycle = getBestCycle(countryHistory);

  // Get strategy badge
  const getStrategyBadge = (strategy) => {
    if (strategy === 'fragile') {
      return (
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
          BLUEPRINT
        </span>
      );
    }
    return (
      <span className="text-[8px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400">
        ANTI-FRAGILE
      </span>
    );
  };

  // Calculate overall change for a cycle
  const getOverallChange = (cycle) => {
    if (!cycle.wellbeingChange) return 0;
    const changes = Object.values(cycle.wellbeingChange);
    return Math.round(changes.reduce((sum, c) => sum + c, 0) * 10) / 10;
  };

  if (allHistory.length === 0) {
    return (
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 text-center">
        <History size={24} className="mx-auto text-slate-700 mb-2" />
        <p className="text-sm text-slate-500">No cycle history yet</p>
        <p className="text-xs text-slate-600 mt-1">Complete a cycle to see it here</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
          <History size={12} className="text-amber-400" />
          Cycle History ({allHistory.length})
        </h3>
        {allHistory.length > 0 && (
          <button
            onClick={() => setShowConfirmClear(true)}
            className="text-[10px] text-slate-600 hover:text-red-400 flex items-center gap-1"
          >
            <Trash2 size={10} />
            Clear
          </button>
        )}
      </div>

      {/* Clear Confirmation */}
      {showConfirmClear && (
        <div className="px-4 py-3 bg-red-500/10 border-b border-red-500/20">
          <p className="text-xs text-red-300 mb-2">Clear all cycle history? This cannot be undone.</p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClearHistory();
                setShowConfirmClear(false);
              }}
              className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
            >
              Yes, Clear All
            </button>
            <button
              onClick={() => setShowConfirmClear(false)}
              className="px-3 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Best Performing Cycle */}
      {bestCycle && countryHistory.length > 1 && (
        <div className="px-4 py-3 bg-green-500/10 border-b border-green-500/20">
          <div className="flex items-center gap-2 text-xs text-green-400">
            <Award size={14} />
            <span className="font-bold">Best Cycle:</span>
            <span>Cycle {bestCycle.cycleNumber}</span>
            {getStrategyBadge(bestCycle.strategy)}
            <span className="ml-auto">Score: {bestCycle.finalScore}</span>
          </div>
        </div>
      )}

      {/* Cycle List */}
      <div className="max-h-80 overflow-y-auto">
        {/* Current Country History */}
        {countryHistory.length > 0 && (
          <div className="p-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1">
              {currentCountry?.flag} {currentCountry?.name}
            </div>
            <div className="space-y-2">
              {[...countryHistory].reverse().map((cycle, idx) => {
                const isExpanded = expandedCycle === `${cycle.countryId}-${cycle.cycleNumber}`;
                const overallChange = getOverallChange(cycle);
                
                return (
                  <div 
                    key={idx}
                    className="bg-slate-800/50 rounded-lg overflow-hidden"
                  >
                    {/* Cycle Header */}
                    <button
                      onClick={() => setExpandedCycle(isExpanded ? null : `${cycle.countryId}-${cycle.cycleNumber}`)}
                      className="w-full px-3 py-2 flex items-center justify-between hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">Cycle {cycle.cycleNumber}</span>
                        {getStrategyBadge(cycle.strategy)}
                        <span className="text-[10px] text-slate-500">
                          {cycle.duration} months
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className={`text-xs font-bold flex items-center gap-1 ${
                          overallChange > 0 ? 'text-green-400' : 
                          overallChange < 0 ? 'text-red-400' : 
                          'text-slate-400'
                        }`}>
                          {overallChange > 0 ? <TrendingUp size={10} /> : 
                           overallChange < 0 ? <TrendingDown size={10} /> : null}
                          {overallChange > 0 ? '+' : ''}{overallChange}
                        </div>
                        <span className={`text-sm font-bold ${
                          cycle.finalScore >= 60 ? 'text-green-400' :
                          cycle.finalScore >= 40 ? 'text-amber-400' :
                          'text-red-400'
                        }`}>
                          {cycle.finalScore}
                        </span>
                        {isExpanded ? <ChevronUp size={14} className="text-slate-500" /> : 
                                     <ChevronDown size={14} className="text-slate-500" />}
                      </div>
                    </button>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="px-3 pb-3 border-t border-slate-700">
                        {/* Domain Changes */}
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {WELLBEING_DOMAINS.map(domain => {
                            const change = cycle.wellbeingChange?.[domain.key] || 0;
                            const Icon = domain.icon;
                            
                            return (
                              <div 
                                key={domain.key}
                                className="bg-slate-900/50 rounded p-2 text-center"
                              >
                                <Icon size={12} className="mx-auto mb-1" style={{ color: domain.color }} />
                                <div className={`text-xs font-bold ${
                                  change > 0 ? 'text-green-400' : 
                                  change < 0 ? 'text-red-400' : 
                                  'text-slate-400'
                                }`}>
                                  {change > 0 ? '+' : ''}{change}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Probes Summary */}
                        {cycle.probes && cycle.probes.length > 0 && (
                          <div className="mt-3">
                            <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                              Probes Used
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {cycle.probes.map((probe, pIdx) => (
                                <span 
                                  key={pIdx}
                                  className={`text-[9px] px-1.5 py-0.5 rounded ${
                                    probe.finalStatus === 'amplified' ? 'bg-green-500/20 text-green-400' :
                                    probe.finalStatus === 'retired' ? 'bg-slate-700 text-slate-400' :
                                    'bg-blue-500/20 text-blue-400'
                                  }`}
                                >
                                  {probe.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Lessons */}
                        {cycle.lessons && cycle.lessons.length > 0 && (
                          <div className="mt-3">
                            <div className="text-[10px] font-bold text-amber-400 uppercase mb-1 flex items-center gap-1">
                              <Lightbulb size={10} />
                              Lessons Learned
                            </div>
                            <div className="space-y-1">
                              {cycle.lessons.slice(0, 3).map((lesson, lIdx) => (
                                <div 
                                  key={lIdx}
                                  className="text-[9px] text-slate-400 bg-slate-900/50 rounded px-2 py-1"
                                >
                                  <span className="text-amber-400 font-medium">{lesson.source}:</span>{' '}
                                  {lesson.text}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Risk Events */}
                        {cycle.riskEventLog && cycle.riskEventLog.length > 0 && (
                          <div className="mt-3">
                            <div className="text-[10px] font-bold text-red-400 uppercase mb-1 flex items-center gap-1">
                              <AlertTriangle size={10} />
                              Risk Events ({cycle.riskEventLog.length})
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {cycle.riskEventLog.map((risk, rIdx) => (
                                <span 
                                  key={rIdx}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400"
                                >
                                  {risk.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Other Countries (collapsed) */}
        {allHistory.filter(c => c.countryId !== currentCountry?.id).length > 0 && (
          <div className="p-3 border-t border-slate-800">
            <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">
              Other Countries ({allHistory.filter(c => c.countryId !== currentCountry?.id).length} cycles)
            </div>
            <div className="space-y-1">
              {allHistory
                .filter(c => c.countryId !== currentCountry?.id)
                .reduce((acc, cycle) => {
                  if (!acc.find(c => c.countryId === cycle.countryId)) {
                    acc.push(cycle);
                  }
                  return acc;
                }, [])
                .map((cycle, idx) => (
                  <div 
                    key={idx}
                    className="text-[10px] text-slate-500 flex items-center gap-2"
                  >
                    <span>{cycle.countryName}</span>
                    <span className="text-slate-600">
                      ({allHistory.filter(c => c.countryId === cycle.countryId).length} cycles)
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CycleHistory;
