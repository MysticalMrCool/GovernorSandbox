// src/components/ui/ProbeCard.jsx
// Enhanced ProbeCard with evidence display, effect weights, and lag indicators

import React, { useState } from 'react';
import { 
  XCircle, 
  Zap, 
  Clock, 
  BookOpen, 
  ChevronDown, 
  ChevronUp,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { WELLBEING_DOMAINS, CONFIDENCE_LEVELS } from '../../data/constants';

const ProbeCard = ({ 
  probe, 
  onManage, 
  showActions,
  probeEffectData,
  currentMonth = 0
}) => {
  const [showDetails, setShowDetails] = useState(false);

  // Get confidence badge styling
  const getConfidenceBadge = (level) => {
    const styles = {
      high: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      low: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return styles[level] || styles.medium;
  };

  // Calculate lag progress
  const getLagProgress = () => {
    if (!probe.lagMonths || !probe.startMonth) return null;
    const elapsed = currentMonth - probe.startMonth;
    const progress = Math.min(100, Math.round((elapsed / probe.lagMonths) * 100));
    const isPending = elapsed < probe.lagMonths;
    return { progress, isPending, monthsRemaining: Math.max(0, probe.lagMonths - elapsed) };
  };

  const lagInfo = getLagProgress();

  // Get effect weights display
  const effectWeights = probe.effectWeights || {};
  const hasEffects = Object.keys(effectWeights).length > 0;

  return (
    <div 
      className={`rounded-lg border transition-all duration-300 relative overflow-hidden
        ${probe.status === 'retired' 
          ? 'border-slate-700 bg-slate-800/50 opacity-60' 
          : ''
        }
        ${probe.status === 'amplified' 
          ? 'border-green-500 bg-green-500/10 ring-1 ring-green-500/30' 
          : ''
        }
        ${probe.status === 'active' 
          ? 'border-slate-600 bg-slate-800/80' 
          : ''
        }
        ${lagInfo?.isPending && probe.status === 'active'
          ? 'border-amber-500/50'
          : ''
        }`}
    >
      {/* Main Content */}
      <div className="p-3">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-bold text-xs text-white flex-1 pr-2">{probe.name}</h4>
          <div className="flex items-center gap-1">
            {/* Confidence Badge */}
            {probe.confidence && (
              <span 
                className={`text-[7px] font-bold px-1 py-0.5 rounded border ${getConfidenceBadge(probe.confidence)}`}
                title={CONFIDENCE_LEVELS?.[probe.confidence]?.label || probe.confidence}
              >
                {probe.confidence.toUpperCase()}
              </span>
            )}
            {/* Status Badge */}
            <span 
              className={`text-[8px] font-bold px-1.5 py-0.5 rounded
                ${probe.status === 'active' && !lagInfo?.isPending ? 'bg-blue-500/20 text-blue-400' : ''}
                ${probe.status === 'active' && lagInfo?.isPending ? 'bg-amber-500/20 text-amber-400' : ''}
                ${probe.status === 'retired' ? 'bg-slate-700 text-slate-500' : ''}
                ${probe.status === 'amplified' ? 'bg-green-500/20 text-green-400' : ''}`}
            >
              {probe.status === 'active' && lagInfo?.isPending && (
                <span className="flex items-center gap-0.5">
                  <Clock size={8} /> PENDING
                </span>
              )}
              {probe.status === 'active' && !lagInfo?.isPending && 'ACTIVE'}
              {probe.status === 'retired' && 'RETIRED'}
              {probe.status === 'amplified' && '⚡ SCALING'}
            </span>
          </div>
        </div>
        
        <p className="text-[9px] text-slate-400 mb-2">{probe.description || probe.culturalFit}</p>
        
        {/* Lag Time Indicator */}
        {lagInfo && probe.status === 'active' && (
          <div className="mb-2">
            <div className="flex justify-between text-[8px] mb-0.5">
              <span className="text-slate-500 uppercase flex items-center gap-1">
                <Clock size={8} />
                Implementation Progress
              </span>
              <span className={lagInfo.isPending ? 'text-amber-400' : 'text-green-400'}>
                {lagInfo.isPending 
                  ? `${lagInfo.monthsRemaining}mo to activation`
                  : 'Fully Active'
                }
              </span>
            </div>
            <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  lagInfo.isPending ? 'bg-amber-500' : 'bg-green-500'
                }`}
                style={{ width: `${lagInfo.progress}%` }} 
              />
            </div>
          </div>
        )}

        {/* Cultural Fit Bar */}
        <div className="mb-2">
          <div className="flex justify-between text-[8px] mb-0.5">
            <span className="text-slate-500 uppercase">Cultural Fit</span>
            <span className={probe.fit > 0.7 ? 'text-green-400' : probe.fit > 0.4 ? 'text-amber-400' : 'text-red-400'}>
              {Math.round(probe.fit * 100)}%
            </span>
          </div>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500
                ${probe.fit > 0.7 
                  ? 'bg-green-500' 
                  : probe.fit > 0.4 
                    ? 'bg-amber-500' 
                    : 'bg-red-500'
                }`} 
              style={{ width: `${probe.fit * 100}%` }} 
            />
          </div>
        </div>

        {/* Effect Weights Preview */}
        {hasEffects && !showDetails && (
          <div className="flex flex-wrap gap-1 mb-2">
            {Object.entries(effectWeights).slice(0, 4).map(([domain, weight]) => {
              const domainInfo = WELLBEING_DOMAINS.find(d => d.key === domain);
              if (!domainInfo) return null;
              return (
                <span 
                  key={domain}
                  className={`text-[8px] px-1.5 py-0.5 rounded flex items-center gap-0.5 ${
                    weight > 0 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {weight > 0 ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                  {domainInfo.name}: {weight > 0 ? '+' : ''}{weight}
                </span>
              );
            })}
            {Object.keys(effectWeights).length > 4 && (
              <span className="text-[8px] text-slate-500">
                +{Object.keys(effectWeights).length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Toggle Details Button */}
        {(probe.evidenceSource || hasEffects) && (
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full text-[9px] text-slate-500 hover:text-slate-300 flex items-center justify-center gap-1 py-1"
          >
            {showDetails ? (
              <>Hide Details <ChevronUp size={10} /></>
            ) : (
              <>Show Evidence & Effects <ChevronDown size={10} /></>
            )}
          </button>
        )}
        
        {/* Actions */}
        {showActions && probe.status === 'active' && (
          <div className="flex gap-1 mt-2">
            <button 
              onClick={() => onManage(probe.id, 'retire')} 
              className="flex-1 bg-slate-700 hover:bg-red-500/20 text-red-400 text-[9px] py-1.5 rounded font-bold flex justify-center items-center gap-1 transition-colors"
            >
              <XCircle size={10} /> Retire
            </button>
            <button 
              onClick={() => onManage(probe.id, 'amplify')} 
              disabled={lagInfo?.isPending}
              className={`flex-1 text-[9px] py-1.5 rounded font-bold flex justify-center items-center gap-1 transition-colors
                ${lagInfo?.isPending 
                  ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
                  : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                }`}
              title={lagInfo?.isPending ? 'Cannot amplify until implementation lag period completes' : 'Scale up this probe'}
            >
              <Zap size={10} /> Amplify
            </button>
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="border-t border-slate-700 bg-slate-900/50 p-3 space-y-3">
          {/* Evidence Source */}
          {probe.evidenceSource && (
            <div>
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                <BookOpen size={10} />
                Evidence Source
              </div>
              <p className="text-[9px] text-slate-400 bg-slate-800 rounded p-2">
                {probe.evidenceSource}
              </p>
              {probe.confidence && (
                <div className="mt-1 text-[8px] text-slate-500 flex items-center gap-1">
                  {probe.confidence === 'high' && <CheckCircle size={8} className="text-green-400" />}
                  {probe.confidence === 'medium' && <AlertCircle size={8} className="text-amber-400" />}
                  {probe.confidence === 'low' && <AlertCircle size={8} className="text-red-400" />}
                  {CONFIDENCE_LEVELS?.[probe.confidence]?.description || `${probe.confidence} confidence evidence`}
                </div>
              )}
            </div>
          )}

          {/* Full Effect Weights */}
          {hasEffects && (
            <div>
              <div className="text-[9px] font-bold text-slate-500 uppercase mb-1 flex items-center gap-1">
                <TrendingUp size={10} />
                Effect Weights (per quarter)
              </div>
              <div className="grid grid-cols-2 gap-1">
                {Object.entries(effectWeights).map(([domain, weight]) => {
                  const domainInfo = WELLBEING_DOMAINS.find(d => d.key === domain);
                  if (!domainInfo) return null;
                  const Icon = domainInfo.icon;
                  const actualWeight = probe.status === 'amplified' ? weight * 1.5 : weight;
                  
                  return (
                    <div 
                      key={domain}
                      className={`text-[9px] px-2 py-1 rounded flex items-center justify-between ${
                        weight > 0 
                          ? 'bg-green-500/10' 
                          : weight < 0 
                            ? 'bg-red-500/10' 
                            : 'bg-slate-800'
                      }`}
                    >
                      <span className="flex items-center gap-1 text-slate-300">
                        <Icon size={10} style={{ color: domainInfo.color }} />
                        {domainInfo.name}
                      </span>
                      <span className={`font-bold ${
                        weight > 0 ? 'text-green-400' : weight < 0 ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {actualWeight > 0 ? '+' : ''}{actualWeight}
                        {probe.status === 'amplified' && weight !== 0 && (
                          <span className="text-green-300 text-[7px] ml-0.5">×1.5</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Lag Time Info */}
          {probe.lagMonths && (
            <div className="text-[9px] text-slate-500 flex items-center gap-1">
              <Clock size={10} />
              Implementation lag: {probe.lagMonths} months
              <span className="text-slate-600">
                (effects begin after this period)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProbeCard;
