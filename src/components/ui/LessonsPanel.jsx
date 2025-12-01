// src/components/ui/LessonsPanel.jsx

import React from 'react';
import { Lightbulb } from 'lucide-react';

const LessonsPanel = ({ lessons }) => {
  if (lessons.length === 0) return null;
  
  return (
    <div className="space-y-1">
      {lessons.slice(0, 3).map((lesson, idx) => (
        <div 
          key={idx} 
          className="bg-amber-500/10 border border-amber-500/30 rounded p-2"
        >
          <div className="text-[9px] font-bold text-amber-400 flex items-center gap-1">
            <Lightbulb size={10} />
            {lesson.source}
          </div>
          <div className="text-[9px] text-amber-200/80 mt-0.5">
            {lesson.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonsPanel;
