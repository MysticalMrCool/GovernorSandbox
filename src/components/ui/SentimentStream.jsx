// src/components/ui/SentimentStream.jsx

import React from 'react';

const SentimentStream = ({ messages }) => (
  <div className="font-mono text-[10px] h-32 overflow-y-auto space-y-0.5">
    {messages.slice(0, 15).map((msg, idx) => (
      <div 
        key={idx} 
        className={`border-l-2 pl-2 py-0.5 
          ${msg.sentiment > 0 
            ? 'border-green-500 text-green-400' 
            : msg.sentiment < 0 
              ? 'border-red-500 text-red-400' 
              : 'border-slate-600 text-slate-500'
          }`}
      >
        <span className="text-slate-600">[{msg.timestamp}]</span>{' '}
        <span className="font-bold">{msg.topic}:</span>{' '}
        {msg.text}
      </div>
    ))}
    {messages.length === 0 && (
      <span className="text-slate-600 italic">Awaiting deployment...</span>
    )}
  </div>
);

export default SentimentStream;
