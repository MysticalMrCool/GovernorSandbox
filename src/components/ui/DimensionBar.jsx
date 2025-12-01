// src/components/ui/DimensionBar.jsx

import React from 'react';

const DimensionBar = ({ label, value, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    amber: 'bg-amber-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-slate-400 uppercase tracking-wide">{label}</span>
        <span className="text-white font-bold">{value}</span>
      </div>
      <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${colorClasses[color] || colorClasses.indigo}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export const DimensionGrid = ({ dimensions }) => {
  const labels = {
    PDI: 'Power Distance',
    IDV: 'Individualism',
    MAS: 'Masculinity',
    UAI: 'Uncertainty Avoid.',
    LTO: 'Long-Term Orient.',
    IVR: 'Indulgence'
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      {Object.entries(dimensions).map(([key, value]) => (
        <DimensionBar 
          key={key} 
          label={labels[key] || key} 
          value={value} 
        />
      ))}
    </div>
  );
};

export default DimensionBar;
