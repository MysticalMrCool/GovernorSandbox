// src/components/ui/EmotionTrendChart.jsx

import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer 
} from 'recharts';
import { EMOTIONS } from '../../data/constants';

const EmotionTrendChart = ({ data }) => (
  <div className="h-28">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <XAxis dataKey="time" hide />
        <YAxis hide domain={[0, 100]} />
        {EMOTIONS.map(emotion => (
          <Area 
            key={emotion.key} 
            type="monotone" 
            dataKey={emotion.key} 
            stackId="1" 
            stroke={emotion.color} 
            fill={emotion.color} 
            fillOpacity={0.8} 
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export const EmotionLegend = () => (
  <div className="flex flex-wrap gap-2 mt-2">
    {EMOTIONS.map(e => (
      <span key={e.key} className="flex items-center gap-1 text-[9px] text-slate-500">
        <span 
          className="w-2 h-2 rounded-full" 
          style={{ backgroundColor: e.color }} 
        />
        {e.key}
      </span>
    ))}
  </div>
);

export default EmotionTrendChart;
