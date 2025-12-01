// src/components/ui/WellbeingRadar.jsx

import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer 
} from 'recharts';
import { WELLBEING_DOMAINS } from '../../data/constants';

const WellbeingRadar = ({ data }) => {
  const chartData = WELLBEING_DOMAINS.map(domain => ({
    domain: domain.name,
    value: data[domain.key],
    fullMark: 100
  }));

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis 
            dataKey="domain" 
            tick={{ fontSize: 9, fill: '#94a3b8' }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fontSize: 7, fill: '#64748b' }} 
            axisLine={false} 
          />
          <Radar 
            dataKey="value" 
            stroke="#6366f1" 
            fill="#6366f1" 
            fillOpacity={0.3} 
            strokeWidth={2} 
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WellbeingRadar;
