// src/components/ui/EffectsPanel.jsx
// Transparent effect attribution panel showing which probes affect which domains

import React, { useState } from 'react';
import { 
  Eye, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import { WELLBEING_DOMAINS } from '../../data/constants';

const EffectsPanel = ({ 
  effectAttribution, 
  probeEffects, 
  activeRisks,
  wellbeingChanges 
}) => {
  const [expandedDomain, setExpandedDomain] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const getDomainIcon = (domainKey) => {
    const domain = WELLBEING_DOMAINS.find(d => d.key === domainKey);
    if (!domain) return null;
    const Icon = domain.icon;
    return <Icon size={12} style={{ color: domain.color }} />;
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-blue-500/20 text-blue-400',
      amplified: 'bg-green-500/20 text-green-400',
      pending: 'bg-amber-500/20 text-amber-400',
      risk: 'bg-red-500/20 text-red-400'
    };
    return styles[status] || styles.active;
  };

  // Calculate total change per domain
  const domainTotals = {};
  WELLBEING_DOMAINS.forEach(domain => {
    const effects = effectAttribution[domain.key] || [];
    domainTotals[domain.key] = effects.reduce((sum, e) => sum + e.value, 0);
  });

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
          <Eye size={12} className="text-indigo-400" />
          Effect Attribution
        </h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs text-slate-500 hover:text-slate-300 flex items-center gap-1"
        >
          {showDetails ? 'Hide' : 'Show'} Details
          {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        </button>
      </div>

      {/* Quick Summary */}
      <div className="p-3 grid grid-cols-6 gap-2">
        {WELLBEING_DOMAINS.map(domain => {
          const total = domainTotals[domain.key] || 0;
          const change = wellbeingChanges?.[domain.key] || 0;
          const effects = effectAttribution[domain.key] || [];
          const hasEffects = effects.length > 0;
          
          return (
            <button
              key={domain.key}
              onClick={() => setExpandedDomain(expandedDomain === domain.key ? null : domain.key)}
              className={`p-2 rounded-lg text-center transition-all ${
                expandedDomain === domain.key 
                  ? 'bg-slate-700 ring-1 ring-slate-600' 
                  : 'bg-slate-800/50 hover:bg-slate-800'
              }`}
            >
              <div className="flex justify-center mb-1">
                {getDomainIcon(domain.key)}
              </div>
              <div className="text-[10px] text-slate-500 mb-0.5">{domain.name}</div>
              <div className={`text-sm font-bold flex items-center justify-center gap-0.5 ${
                change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-slate-400'
              }`}>
                {change > 0 ? <TrendingUp size={10} /> : change < 0 ? <TrendingDown size={10} /> : null}
                {change > 0 ? '+' : ''}{Math.round(change * 10) / 10}
              </div>
              {hasEffects && (
                <div className="text-[8px] text-slate-600 mt-0.5">
                  {effects.length} source{effects.length !== 1 ? 's' : ''}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Expanded Domain Details */}
      {expandedDomain && (
        <div className="px-3 pb-3">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              {getDomainIcon(expandedDomain)}
              <span className="text-xs font-bold text-white capitalize">
                {expandedDomain} Breakdown
              </span>
            </div>
            <div className="space-y-1.5">
              {(effectAttribution[expandedDomain] || []).length === 0 ? (
                <div className="text-[10px] text-slate-500 italic">No active effects on this domain</div>
              ) : (
                effectAttribution[expandedDomain].map((effect, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between bg-slate-900/50 rounded px-2 py-1.5"
                  >
                    <div className="flex items-center gap-2">
                      {effect.type === 'risk' ? (
                        <AlertTriangle size={10} className="text-red-400" />
                      ) : effect.status === 'amplified' ? (
                        <Zap size={10} className="text-green-400" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      )}
                      <span className="text-[10px] text-slate-300">{effect.source}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded ${getStatusBadge(effect.status || effect.type)}`}>
                        {effect.status || effect.type}
                      </span>
                    </div>
                    <span className={`text-xs font-bold ${
                      effect.value > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {effect.value > 0 ? '+' : ''}{Math.round(effect.value * 100) / 100}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Probe Effects */}
      {showDetails && probeEffects && probeEffects.length > 0 && (
        <div className="px-3 pb-3 border-t border-slate-800 pt-3">
          <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">
            Probe Status Details
          </div>
          <div className="space-y-2">
            {probeEffects.map((effect, idx) => (
              <div key={idx} className="bg-slate-800/30 rounded-lg p-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-white">{effect.probeName}</span>
                  <span className={`text-[8px] px-1.5 py-0.5 rounded ${
                    effect.isPending ? 'bg-amber-500/20 text-amber-400' :
                    effect.status === 'amplified' ? 'bg-green-500/20 text-green-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {effect.isPending ? (
                      <span className="flex items-center gap-1">
                        <Clock size={8} /> {effect.monthsRemaining}mo to activation
                      </span>
                    ) : effect.status === 'amplified' ? (
                      <span className="flex items-center gap-1">
                        <Zap size={8} /> AMPLIFIED
                      </span>
                    ) : 'ACTIVE'}
                  </span>
                </div>
                
                {/* Cultural Fit & Progress */}
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="flex-1">
                    <div className="flex justify-between text-[8px] mb-0.5">
                      <span className="text-slate-500">Cultural Fit</span>
                      <span className={effect.culturalFit > 0.7 ? 'text-green-400' : 'text-amber-400'}>
                        {Math.round(effect.culturalFit * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          effect.culturalFit > 0.7 ? 'bg-green-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${effect.culturalFit * 100}%` }}
                      />
                    </div>
                  </div>
                  {effect.isPending && (
                    <div className="flex-1">
                      <div className="flex justify-between text-[8px] mb-0.5">
                        <span className="text-slate-500">Lag Progress</span>
                        <span className="text-amber-400">{effect.lagProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${effect.lagProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Domain Effects */}
                {effect.isActive && Object.keys(effect.domainEffects).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {Object.entries(effect.domainEffects).map(([domain, details]) => (
                      <div 
                        key={domain}
                        className={`text-[8px] px-1.5 py-0.5 rounded flex items-center gap-1 ${
                          details.value > 0 
                            ? 'bg-green-500/10 text-green-400' 
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {getDomainIcon(domain)}
                        {details.value > 0 ? '+' : ''}{Math.round(details.value * 100) / 100}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Risks Summary */}
      {activeRisks && activeRisks.length > 0 && (
        <div className="px-3 pb-3 border-t border-slate-800 pt-3">
          <div className="text-[10px] font-bold text-red-400 uppercase mb-2 flex items-center gap-1">
            <AlertTriangle size={10} /> Active Risk Events ({activeRisks.length})
          </div>
          <div className="space-y-1">
            {activeRisks.map((risk, idx) => (
              <div 
                key={idx}
                className="bg-red-500/10 border border-red-500/20 rounded px-2 py-1.5 flex items-center justify-between"
              >
                <span className="text-[10px] text-red-300">{risk.name}</span>
                <span className="text-[8px] text-red-400">
                  {risk.modifier > 0 ? '+' : ''}{risk.modifier}/mo
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EffectsPanel;
