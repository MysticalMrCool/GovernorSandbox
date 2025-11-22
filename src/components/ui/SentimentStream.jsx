import React from 'react';
import { Activity } from 'lucide-react';

const SentimentStream = ({ messages }) => (
  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto shadow-inner border border-slate-700">
    <div className="sticky top-0 bg-slate-900 border-b border-slate-700 pb-2 mb-2 flex justify-between items-center">
      <span className="flex items-center gap-2"><Activity size={14}/> VLL // EARTH.AI // LIVE STREAM</span>
      <span className="animate-pulse text-red-500">● LIVE</span>
    </div>
    <div className="flex flex-col-reverse"> 
       {/* Flex reverse to show newest at bottom naturally or handle scroll, here we just map */}
       {messages.map((msg, idx) => (
         <div key={idx} className={`mb-2 border-l-2 pl-2 ${msg.sentiment > 0 ? 'border-green-500 text-green-300' : 'border-red-500 text-red-300'} opacity-90`}>
           <span className="text-xs text-slate-500">[{msg.timestamp}]</span> <span className="font-bold">{msg.topic}:</span> {msg.text}
         </div>
       ))}
       {messages.length === 0 && <span className="text-slate-600 italic">Waiting for policy input...</span>}
    </div>
  </div>
);

export default SentimentStream;
