// src/components/ui/ProbeCard.jsx

import React from 'react';
import { XCircle, Zap } from 'lucide-react';

const ProbeCard = ({ probe, onManage, showActions }) => (
  <div 
    className={`p-3 rounded-lg border transition-all duration-300 relative
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
      }`}
  >
    <div className="flex items-start justify-between mb-1">
      <h4 className="font-bold text-xs text-white">{probe.name}</h4>
      <span 
        className={`text-[8px] font-bold px-1.5 py-0.5 rounded
          ${probe.status === 'active' ? 'bg-blue-500/20 text-blue-400' : ''}
          ${probe.status === 'retired' ? 'bg-slate-700 text-slate-500' : ''}
          ${probe.status === 'amplified' ? 'bg-green-500/20 text-green-400' : ''}`}
      >
        {probe.status === 'active' && 'TESTING'}
        {probe.status === 'retired' && 'RETIRED'}
        {probe.status === 'amplified' && '⚡ SCALING'}
      </span>
    </div>
    
    <p className="text-[9px] text-slate-400 mb-2">{probe.culturalFit}</p>
    
    {/* Cultural Fit Bar */}
    <div className="mb-2">
      <div className="flex justify-between text-[8px] mb-0.5">
        <span className="text-slate-500 uppercase">Cultural Fit</span>
        <span className={probe.fit > 0.7 ? 'text-green-400' : 'text-red-400'}>
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
    
    {/* Actions */}
    {showActions && probe.status === 'active' && (
      <div className="flex gap-1">
        <button 
          onClick={() => onManage(probe.id, 'retire')} 
          className="flex-1 bg-slate-700 hover:bg-red-500/20 text-red-400 text-[9px] py-1.5 rounded font-bold flex justify-center items-center gap-1 transition-colors"
        >
          <XCircle size={10} /> Retire
        </button>
        <button 
          onClick={() => onManage(probe.id, 'amplify')} 
          className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-[9px] py-1.5 rounded font-bold flex justify-center items-center gap-1 transition-colors"
        >
          <Zap size={10} /> Amplify
        </button>
      </div>
    )}
  </div>
);

export default ProbeCard;
