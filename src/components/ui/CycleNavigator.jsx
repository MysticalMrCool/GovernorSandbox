// src/components/ui/CycleNavigator.jsx

import React from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { CYCLE_STAGES } from '../../data/constants';

const CycleNavigator = ({ currentStage, completedStages }) => (
  <div className="flex gap-1">
    {CYCLE_STAGES.map((stage, idx) => {
      const Icon = stage.icon;
      const isCurrent = currentStage === stage.id;
      const isCompleted = completedStages.includes(stage.id);
      
      return (
        <div key={stage.id} className="flex items-center">
          <div 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all
              ${isCurrent 
                ? 'bg-indigo-500 text-white' 
                : isCompleted 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-slate-800 text-slate-500'
              }`}
          >
            <div 
              className={`w-5 h-5 rounded-full flex items-center justify-center
                ${isCurrent 
                  ? 'bg-white/20' 
                  : isCompleted 
                    ? 'bg-green-500/30' 
                    : 'bg-slate-700'
                }`}
            >
              {isCompleted && !isCurrent ? <CheckCircle size={12} /> : <Icon size={12} />}
            </div>
            <span className="text-xs font-medium">{stage.name}</span>
          </div>
          {idx < CYCLE_STAGES.length - 1 && (
            <ChevronRight 
              size={14} 
              className={`mx-1 ${isCompleted ? 'text-green-500' : 'text-slate-600'}`} 
            />
          )}
        </div>
      );
    })}
  </div>
);

export default CycleNavigator;
