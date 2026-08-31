import React, { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';

interface CalculationTrace {
  formula: string;
  substituted: string;
  assumptions?: string[];
  unit: string;
}

interface FormulaDrawerProps {
  label: string;
  trace: CalculationTrace;
}

export const FormulaDrawer: React.FC<FormulaDrawerProps> = ({ label, trace }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-xs font-semibold text-precision-blue hover:text-blue-600 transition-colors"
      >
        <Info className="w-3.5 h-3.5" />
        <span>How was {label.toLowerCase()} calculated?</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-[#1A1E23] text-sm text-slate-700 dark:text-slate-300 font-mono overflow-x-auto">
          <div className="mb-2">
            <span className="text-slate-400 dark:text-slate-500 text-xs block mb-1">Formula:</span>
            <span>{trace.formula}</span>
          </div>
          <div className="mb-2">
            <span className="text-slate-400 dark:text-slate-500 text-xs block mb-1">Substitution:</span>
            <span>{trace.substituted}</span>
          </div>
          <div>
            <span className="text-slate-400 dark:text-slate-500 text-xs block mb-1">Result:</span>
            <span className="font-bold text-slate-900 dark:text-white">... {trace.unit}</span>
          </div>
          
          {trace.assumptions && trace.assumptions.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-white/10">
              <span className="text-slate-400 dark:text-slate-500 text-xs block mb-1">Assumptions:</span>
              <ul className="list-disc pl-4 text-xs">
                {trace.assumptions.map((a, idx) => (
                  <li key={idx}>{a}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
