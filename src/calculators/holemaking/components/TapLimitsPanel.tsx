import React, { useState, useEffect } from 'react';
import { UnitSystem } from '../engine/shared';
import { calculateTapLimits, TapLimitsInput, TapLimitsResult } from '../engine/tapLimits';
import { FormulaDrawer } from './FormulaDrawer';
import unifiedData from '../data/unifiedTapLimits.json';
import metricData from '../data/metricTapLimits.json';

interface TapLimitsPanelProps {
  unitSystem: UnitSystem;
}

export const TapLimitsPanel: React.FC<TapLimitsPanelProps> = ({ unitSystem }) => {
  const [majorDiameter, setMajorDiameter] = useState<string>('8');
  const [pitch, setPitch] = useState<string>('1.25');
  const [toleranceClass, setToleranceClass] = useState<string>('D4');
  
  const [result, setResult] = useState<TapLimitsResult | null>(null);

  useEffect(() => {
    if (unitSystem === 'metric') {
      setMajorDiameter('8');
      setPitch('1.25');
      setToleranceClass('D4');
    } else {
      setMajorDiameter('0.25');
      setPitch('20');
      setToleranceClass('H2');
    }
  }, [unitSystem]);

  useEffect(() => {
    const input: TapLimitsInput = {
      threadSystem: unitSystem === 'metric' ? 'metric' : 'unified',
      majorDiameter: parseFloat(majorDiameter),
      pitch: parseFloat(pitch),
      toleranceClass
    };
    
    // Attempt lookup in current dataset
    const lookupData = unitSystem === 'metric' 
      ? metricData.find(d => d.sizeMm === input.majorDiameter && d.pitchMm === input.pitch)
      : unifiedData.find(d => d.majorDiameterIn === input.majorDiameter && d.tpi === input.pitch);

    const res = calculateTapLimits(input, lookupData);
    setResult(res);
  }, [unitSystem, majorDiameter, pitch, toleranceClass]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Major Diameter (D) [{unitSystem === 'metric' ? 'mm' : 'inch'}]
            </label>
            <input
              type="number"
              step="0.01"
              value={majorDiameter}
              onChange={(e) => setMajorDiameter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              {unitSystem === 'metric' ? 'Pitch (P) [mm]' : 'Threads per Inch (TPI)'}
            </label>
            <input
              type="number"
              step="0.01"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Tolerance Class
            </label>
            <input
              type="text"
              value={toleranceClass}
              onChange={(e) => setToleranceClass(e.target.value.toUpperCase())}
              placeholder={unitSystem === 'metric' ? 'e.g. D4, D5' : 'e.g. H2, H3'}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none uppercase"
            />
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white dark:bg-[#1A1E23] rounded-xl p-5 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider mb-4">THREAD LIMITS</h3>
            
            {result ? (
              <div>
                <div className="mb-6">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Basic Pitch Diameter</span>
                  <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                    {result.basicPitchDiameter.toFixed(4)}
                    <span className="text-sm text-slate-400 font-sans ml-2">{unitSystem === 'metric' ? 'mm' : 'in'}</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-black/30 p-4 rounded-lg border border-slate-200 dark:border-white/10 relative">
                  <span className="absolute top-0 right-0 bg-precision-blue text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                    {toleranceClass}
                  </span>
                  
                  {result.minLimit !== undefined && result.maxLimit !== undefined ? (
                    <div className="flex flex-col space-y-4">
                      {/* Tolerance Ladder Visual */}
                      <div className="flex items-center space-x-4">
                        <div className="w-1 bg-slate-200 dark:bg-white/20 h-16 relative rounded-full">
                          <div className="absolute top-2 bottom-2 left-0 right-0 bg-precision-blue w-full rounded-full"></div>
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex justify-between items-center border-b border-dashed border-slate-200 dark:border-white/10 pb-1">
                            <span className="text-xs text-slate-500">Max</span>
                            <span className="font-mono font-bold dark:text-white">{result.maxLimit.toFixed(4)}</span>
                          </div>
                          <div className="flex justify-between items-center border-b border-dashed border-slate-200 dark:border-white/10 pb-1">
                            <span className="text-xs text-slate-500">Min</span>
                            <span className="font-mono font-bold dark:text-white">{result.minLimit.toFixed(4)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-amber-600 dark:text-amber-500 py-2">
                      No published {toleranceClass} limits found for this size in the database.
                    </div>
                  )}
                </div>

                <FormulaDrawer 
                  label="Basic P.D."
                  trace={{
                    formula: unitSystem === 'metric' ? 'D - 0.6495190528 × P' : 'D - (0.6495190528 × (1 / TPI))',
                    substituted: unitSystem === 'metric'
                      ? `${majorDiameter} - 0.6495190528 × ${pitch}`
                      : `${majorDiameter} - (0.6495190528 × (1 / ${pitch}))`,
                    unit: unitSystem === 'metric' ? 'mm' : 'in',
                    assumptions: ['Standard 60° thread form']
                  }}
                />
              </div>
            ) : (
              <div className="text-slate-400 font-mono">Invalid inputs</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
