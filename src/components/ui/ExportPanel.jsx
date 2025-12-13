// src/components/ui/ExportPanel.jsx
// Export functionality for simulation data

import React, { useState } from 'react';
import { 
  Download, 
  FileJson, 
  Copy, 
  Check,
  History,
  FileSpreadsheet
} from 'lucide-react';

const ExportPanel = ({ 
  exportCycleData,
  exportFullHistory,
  currentCountry,
  cycleHistory
}) => {
  const [copied, setCopied] = useState(null);
  const [exported, setExported] = useState(null);

  const handleCopyToClipboard = async (data, type) => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = (data, filename, type) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExported(type);
    setTimeout(() => setExported(null), 2000);
  };

  const cycleData = exportCycleData?.();
  const fullHistory = exportFullHistory?.();

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase flex items-center gap-2">
          <Download size={12} className="text-green-400" />
          Export Data
        </h3>
      </div>

      <div className="p-4 space-y-4">
        {/* Export Current Cycle */}
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <FileJson size={14} className="text-blue-400" />
            <span className="text-xs font-bold text-white">Current Cycle</span>
          </div>
          <p className="text-[10px] text-slate-500 mb-3">
            Export the current simulation state including all probes, effects, and wellbeing data.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => cycleData && handleDownload(
                cycleData, 
                `cycle-${currentCountry?.id || 'unknown'}-${Date.now()}.json`,
                'cycle-download'
              )}
              disabled={!cycleData}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-xs rounded flex items-center justify-center gap-1"
            >
              {exported === 'cycle-download' ? (
                <>
                  <Check size={12} />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download size={12} />
                  Download JSON
                </>
              )}
            </button>
            <button
              onClick={() => cycleData && handleCopyToClipboard(cycleData, 'cycle-copy')}
              disabled={!cycleData}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs rounded flex items-center gap-1"
            >
              {copied === 'cycle-copy' ? (
                <>
                  <Check size={12} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Export Full History */}
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <History size={14} className="text-amber-400" />
            <span className="text-xs font-bold text-white">Full History</span>
            <span className="text-[10px] px-1.5 py-0.5 bg-slate-700 rounded text-slate-400">
              {cycleHistory?.length || 0} cycles
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mb-3">
            Export complete simulation history across all countries and cycles.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => fullHistory && handleDownload(
                fullHistory, 
                `governor-sandbox-history-${Date.now()}.json`,
                'history-download'
              )}
              disabled={!fullHistory || !cycleHistory?.length}
              className="flex-1 px-3 py-2 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white text-xs rounded flex items-center justify-center gap-1"
            >
              {exported === 'history-download' ? (
                <>
                  <Check size={12} />
                  Downloaded!
                </>
              ) : (
                <>
                  <Download size={12} />
                  Download JSON
                </>
              )}
            </button>
            <button
              onClick={() => fullHistory && handleCopyToClipboard(fullHistory, 'history-copy')}
              disabled={!fullHistory || !cycleHistory?.length}
              className="px-3 py-2 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed text-white text-xs rounded flex items-center gap-1"
            >
              {copied === 'history-copy' ? (
                <>
                  <Check size={12} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={12} />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* Data Preview */}
        {cycleData && (
          <div className="bg-slate-800/30 rounded-lg p-3">
            <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">
              Preview
            </div>
            <div className="bg-slate-900 rounded p-2 max-h-32 overflow-auto">
              <pre className="text-[9px] text-slate-400 font-mono">
                {JSON.stringify({
                  country: cycleData.country,
                  strategy: cycleData.strategy,
                  currentMonth: cycleData.currentMonth,
                  wellbeingScore: cycleData.wellbeingScore,
                  activeProbes: cycleData.activeProbes?.length || 0,
                  '...': '(more data)'
                }, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Export Format Info */}
        <div className="text-[10px] text-slate-600 bg-slate-800/30 rounded p-2">
          <FileSpreadsheet size={10} className="inline mr-1" />
          <strong>Format:</strong> JSON (JavaScript Object Notation)
          <br />
          <span className="text-slate-500">
            Compatible with data analysis tools, spreadsheets (via import), and programming environments.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;
