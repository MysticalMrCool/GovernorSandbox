// src/components/ui/RiskEventLog.jsx
// Component showing active risks and risk event history

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Shield,
  Clock,
  Zap,
  ChevronDown,
  ChevronUp,
  Activity
} from 'lucide-react';
import { WELLBEING_DOMAINS } from '../../data/constants';

const RiskEventLog = ({ 
  activeRisks,
  riskEventLog,
  currentCountry
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedLog = showAll ? riskEventLog : riskEventLog.slice(0, 5);

  // Get severity badge
  const getSeverityBadge = (modifier) => {
    const absModifier = Math.abs(modifier);
    if (absModifier >= 3) {
      return <span className="text-[8px] px-1 py-0.5 rounded bg-red-500/30 text-red-300">SEVERE</span>;
    }
    if (absModifier >= 2) {
      return <span className="text-[8px] px-1 py-0.5 rounded bg-amber-500/30 text-amber-300">MODERATE</span>;
    }
    return <span className="text-[8px] px-1 py-0.5 rounded bg-yellow-500/30 text-yellow-300">MINOR</span>;
  };

  // Get status badge
  const getStatusBadge = (risk) => {
    if (risk.status === 'resolved') {
      return (
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 flex items-center gap-0.5">
          <Shield size={8} /> RESOLVED
        </span>
      );
    }
    if (risk.status === 'mitigated') {
      return (
        <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 flex items-center gap-0.5">
          <Shield size={8} /> MITIGATED
        </span>
      );
    }
    return (
      <span className="text-[8px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 flex items-center gap-0.5">
          <Activity size={8} /> ACTIVE
        </span>
    );
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
          <AlertTriangle size={12} className="text-red-400" />
          Risk Events
        </h3>
      </div>

      {/* Active Risks */}
      <div className="p-4">
        {activeRisks.length === 0 ? (
          <div className="text-center py-4">
            <Shield size={24} className="mx-auto text-green-500/50 mb-2" />
            <p className="text-xs text-slate-500">No active risk events</p>
            <p className="text-[10px] text-slate-600">Your policies are operating under normal conditions</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-red-400 uppercase flex items-center gap-1">
              <Activity size={10} className="animate-pulse" />
              Active Risks ({activeRisks.length})
            </div>
            {activeRisks.map((risk, idx) => (
              <div 
                key={idx}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-xs font-bold text-red-300 flex items-center gap-2">
                      <Zap size={12} className="text-red-400" />
                      {risk.name}
                      {getSeverityBadge(risk.modifier)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-red-400">
                      {risk.modifier > 0 ? '+' : ''}{risk.modifier}
                    </div>
                    <div className="text-[8px] text-red-400/70">per month</div>
                  </div>
                </div>
                
                <p className="text-[10px] text-slate-400 mb-2">{risk.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock size={10} />
                    Started: Month {risk.startMonth}
                    {risk.remainingMonths && (
                      <span className="ml-2">• {risk.remainingMonths} months remaining</span>
                    )}
                  </div>
                </div>

                {/* Affected Domains */}
                {risk.affectedDomains && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {risk.affectedDomains.map(domain => {
                      const domainInfo = WELLBEING_DOMAINS.find(d => d.key === domain);
                      if (!domainInfo) return null;
                      const Icon = domainInfo.icon;
                      return (
                        <span 
                          key={domain}
                          className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1"
                        >
                          <Icon size={8} style={{ color: domainInfo.color }} />
                          {domainInfo.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Risk Event Log */}
      {riskEventLog.length > 0 && (
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase">
              Event History ({riskEventLog.length})
            </div>
            {riskEventLog.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
              >
                {showAll ? 'Show Less' : 'Show All'}
                {showAll ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {displayedLog.map((event, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/50 rounded px-3 py-2 flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle 
                    size={10} 
                    className={event.status === 'resolved' ? 'text-green-400' : 
                               event.status === 'mitigated' ? 'text-blue-400' : 'text-red-400'} 
                  />
                  <div>
                    <span className="text-xs text-white">{event.name}</span>
                    <div className="text-[8px] text-slate-500">
                      Month {event.startMonth}
                      {event.endMonth && ` - ${event.endMonth}`}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(event)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Country Risk Context */}
      {currentCountry?.riskEvents && currentCountry.riskEvents.length > 0 && (
        <div className="border-t border-slate-800 p-4">
          <div className="text-[10px] font-bold text-amber-400 uppercase mb-2 flex items-center gap-1">
            <AlertTriangle size={10} />
            Potential Risks for {currentCountry.name}
          </div>
          <div className="space-y-2">
            {currentCountry.riskEvents.map((risk, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/30 rounded px-3 py-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-slate-300">{risk.name}</span>
                  <span className="text-[8px] text-amber-400">{Math.round(risk.probability * 100)}% chance</span>
                </div>
                <p className="text-[9px] text-slate-500">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskEventLog;
