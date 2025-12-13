// src/components/ui/TimelineDisplay.jsx
// Timeline component showing simulation progress and wellbeing trends

import React from 'react';
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  BarChart3
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { WELLBEING_DOMAINS } from '../../data/constants';

const TimelineDisplay = ({ 
  currentMonth,
  currentQuarter,
  currentYear,
  wellbeingHistory,
  snapshots,
  initialWellbeing,
  wellbeing,
  wellbeingScore
}) => {
  // Format month for display
  const formatMonth = (month) => {
    if (month === 0) return 'Start';
    const years = Math.floor(month / 12);
    const months = month % 12;
    if (years === 0) return `M${month}`;
    if (months === 0) return `Y${years}`;
    return `Y${years}M${months}`;
  };

  // Calculate change from initial
  const calculateChange = (domain) => {
    const initial = initialWellbeing?.[domain] || 50;
    const current = wellbeing?.[domain] || 50;
    return Math.round((current - initial) * 10) / 10;
  };

  // Get overall trend
  const getOverallTrend = () => {
    if (wellbeingHistory.length < 2) return 'stable';
    const recent = wellbeingHistory.slice(-5);
    const avgRecent = recent.reduce((sum, h) => sum + h.score, 0) / recent.length;
    const older = wellbeingHistory.slice(-10, -5);
    if (older.length === 0) return 'stable';
    const avgOlder = older.reduce((sum, h) => sum + h.score, 0) / older.length;
    
    if (avgRecent > avgOlder + 1) return 'improving';
    if (avgRecent < avgOlder - 1) return 'declining';
    return 'stable';
  };

  const trend = getOverallTrend();

  // Custom tooltip for chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs">
        <div className="text-slate-400 mb-1">{formatMonth(label)}</div>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-300">{entry.name}:</span>
            <span className="font-bold text-white">{Math.round(entry.value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Timeline Header */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
            <Calendar size={12} className="text-indigo-400" />
            Simulation Timeline
          </h3>
          <div className={`text-[10px] px-2 py-1 rounded flex items-center gap-1 ${
            trend === 'improving' ? 'bg-green-500/20 text-green-400' :
            trend === 'declining' ? 'bg-red-500/20 text-red-400' :
            'bg-slate-700 text-slate-400'
          }`}>
            {trend === 'improving' ? <TrendingUp size={10} /> :
             trend === 'declining' ? <TrendingDown size={10} /> :
             <BarChart3 size={10} />}
            {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </div>
        </div>

        {/* Time Display */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <Clock size={14} className="mx-auto text-slate-500 mb-1" />
            <div className="text-2xl font-bold text-white">{currentMonth}</div>
            <div className="text-[10px] text-slate-500 uppercase">Months</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <Calendar size={14} className="mx-auto text-slate-500 mb-1" />
            <div className="text-2xl font-bold text-indigo-400">Q{currentQuarter}</div>
            <div className="text-[10px] text-slate-500 uppercase">Quarter</div>
          </div>
          <div className="bg-slate-800 rounded-lg p-3 text-center">
            <BarChart3 size={14} className="mx-auto text-slate-500 mb-1" />
            <div className="text-2xl font-bold text-amber-400">Y{currentYear}</div>
            <div className="text-[10px] text-slate-500 uppercase">Year</div>
          </div>
        </div>

        {/* Wellbeing Trend Chart */}
        {wellbeingHistory.length > 1 && (
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={wellbeingHistory} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 8, fill: '#64748b' }}
                  tickFormatter={formatMonth}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[0, 100]} 
                  tick={{ fontSize: 8, fill: '#64748b' }}
                  width={25}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={50} stroke="#475569" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  name="Overall"
                  stroke="#6366f1" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Domain Changes */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">
          Change from Baseline
        </h3>
        <div className="space-y-2">
          {WELLBEING_DOMAINS.map(domain => {
            const change = calculateChange(domain.key);
            const Icon = domain.icon;
            
            return (
              <div key={domain.key} className="flex items-center gap-2">
                <Icon size={12} style={{ color: domain.color }} />
                <span className="text-[10px] text-slate-400 w-20">{domain.name}</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-0.5 h-full bg-slate-600" />
                  </div>
                  {change !== 0 && (
                    <div 
                      className={`absolute top-0 h-full rounded-full ${
                        change > 0 ? 'bg-green-500' : 'bg-red-500'
                      }`}
                      style={{
                        left: change > 0 ? '50%' : `${50 + change}%`,
                        width: `${Math.min(Math.abs(change), 50)}%`
                      }}
                    />
                  )}
                </div>
                <span className={`text-xs font-bold w-12 text-right ${
                  change > 0 ? 'text-green-400' : change < 0 ? 'text-red-400' : 'text-slate-400'
                }`}>
                  {change > 0 ? '+' : ''}{change}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quarterly Snapshots */}
      {snapshots.length > 0 && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
            <Calendar size={12} />
            Quarterly Snapshots ({snapshots.length})
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {[...snapshots].reverse().map((snapshot, idx) => (
              <div 
                key={idx}
                className="bg-slate-800/50 rounded-lg p-2 flex items-center justify-between"
              >
                <div>
                  <div className="text-xs font-medium text-white">Q{snapshot.quarter}</div>
                  <div className="text-[10px] text-slate-500">Month {snapshot.month}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className={`text-sm font-bold ${
                      snapshot.wellbeingScore >= 60 ? 'text-green-400' :
                      snapshot.wellbeingScore >= 40 ? 'text-amber-400' :
                      'text-red-400'
                    }`}>
                      {snapshot.wellbeingScore}
                    </div>
                    <div className="text-[8px] text-slate-500">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-blue-400">{snapshot.activeProbes}</div>
                    <div className="text-[8px] text-slate-500">Active</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-red-400">{snapshot.activeRisks}</div>
                    <div className="text-[8px] text-slate-500">Risks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineDisplay;
