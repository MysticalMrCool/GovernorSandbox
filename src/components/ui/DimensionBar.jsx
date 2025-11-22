import React from 'react';

const DimensionBar = ({ label, value, color }) => (
  <div className="mb-2">
    <div className="flex justify-between text-xs mb-1">
      <span className="font-bold text-slate-700">{label}</span>
      <span className="text-slate-500">{value}/100</span>
    </div>
    <div className="w-full bg-slate-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full transition-all duration-1000 ${color}`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  </div>
);

export default DimensionBar;
