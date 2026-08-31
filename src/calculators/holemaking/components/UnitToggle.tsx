import React from 'react';
import { UnitSystem } from '../engine/shared';

interface UnitToggleProps {
  unitSystem: UnitSystem;
  onChange: (unit: UnitSystem) => void;
}

export const UnitToggle: React.FC<UnitToggleProps> = ({ unitSystem, onChange }) => {
  return (
    <div className="flex bg-slate-100 dark:bg-[#1A1E23] p-1 rounded-lg w-fit mb-6">
      <button
        onClick={() => onChange('metric')}
        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
          unitSystem === 'metric'
            ? 'bg-white dark:bg-[#2A2E33] text-slate-900 dark:text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
      >
        Metric
      </button>
      <button
        onClick={() => onChange('imperial')}
        className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
          unitSystem === 'imperial'
            ? 'bg-white dark:bg-[#2A2E33] text-slate-900 dark:text-white shadow-sm'
            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
        }`}
      >
        Imperial
      </button>
    </div>
  );
};
