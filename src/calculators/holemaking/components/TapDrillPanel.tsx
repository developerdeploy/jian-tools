import React, { useState, useEffect } from 'react';
import { UnitSystem } from '../engine/shared';
import { calculateTapDrill, TapDrillInput, TapDrillResult } from '../engine/tapDrill';
import { FormulaDrawer } from './FormulaDrawer';

interface TapDrillPanelProps {
  unitSystem: UnitSystem;
}

export const TapDrillPanel: React.FC<TapDrillPanelProps> = ({ unitSystem }) => {
  const [tapType, setTapType] = useState<'cutting' | 'forming' | 'machine_screw'>('cutting');
  const [majorDiameter, setMajorDiameter] = useState<string>('8');
  const [pitch, setPitch] = useState<string>('1.25');
  const [threadPercent, setThreadPercent] = useState<string>('70');
  
  const [result, setResult] = useState<TapDrillResult | null>(null);

  useEffect(() => {
    // Default values based on unit
    if (unitSystem === 'metric') {
      setMajorDiameter('8');
      setPitch('1.25');
    } else {
      setMajorDiameter('0.25');
      setPitch('20'); // TPI
    }
  }, [unitSystem]);

  useEffect(() => {
    const input: TapDrillInput = {
      unitSystem,
      tapType,
      majorDiameter: parseFloat(majorDiameter),
      pitch: parseFloat(pitch),
      threadPercent: parseFloat(threadPercent)
    };
    const res = calculateTapDrill(input);
    setResult(res);
  }, [unitSystem, tapType, majorDiameter, pitch, threadPercent]);

  return (
    <div>
      {/* Type Selector */}
      <div className="flex space-x-2 mb-6 border-b border-slate-200 dark:border-white/10 pb-2">
        {(['cutting', 'forming', 'machine_screw'] as const).map(type => (
          <button
            key={type}
            onClick={() => setTapType(type)}
            className={`px-4 py-2 text-sm font-bold transition-colors ${
              tapType === type
                ? 'text-precision-blue border-b-2 border-precision-blue'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {type === 'cutting' ? 'Cutting Tap' : type === 'forming' ? 'Forming Tap' : 'Machine Screw'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          {tapType !== 'machine_screw' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Major Diameter (D) [{unitSystem === 'metric' ? 'mm' : 'inch'}]
                </label>
                <input
                  type="number"
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
                  value={pitch}
                  onChange={(e) => setPitch(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Desired Thread % (Planning)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min={tapType === 'forming' ? "55" : "50"}
                    max={tapType === 'forming' ? "75" : "90"}
                    value={threadPercent}
                    onChange={(e) => setThreadPercent(e.target.value)}
                    className="flex-1"
                  />
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-white w-12 text-right">
                    {threadPercent}%
                  </span>
                </div>
              </div>
            </>
          ) : (
             <div className="text-sm text-slate-500">Machine screw lookup coming in full implementation.</div>
          )}
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white dark:bg-[#1A1E23] rounded-xl p-5 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider mb-4">CALCULATED HOLE SIZE</h3>
            
            {result ? (
              <div>
                <div className="text-4xl font-black font-mono text-slate-900 dark:text-white mb-1">
                  {result.holeDiameter.toFixed(3)}
                  <span className="text-lg text-slate-400 font-sans ml-2">{unitSystem === 'metric' ? 'mm' : 'in'}</span>
                </div>
                
                {result.closestStandardDrill && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                    <span className="text-xs text-slate-500 block mb-1">Closest Standard Drill</span>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {result.closestStandardDrill.label}
                      </span>
                      <span className="text-sm font-mono text-slate-500">
                        ({unitSystem === 'metric' ? result.closestStandardDrill.diameterMm.toFixed(3) + ' mm' : result.closestStandardDrill.diameterIn.toFixed(4) + ' in'})
                      </span>
                    </div>
                    {result.actualPercent && (
                      <div className="text-xs text-slate-500 mt-2">
                        Actual Thread: <span className="font-bold text-precision-blue">{result.actualPercent.toFixed(1)}%</span>
                      </div>
                    )}
                  </div>
                )}

                <FormulaDrawer 
                  label="Tap Drill"
                  trace={{
                    formula: unitSystem === 'metric' ? 'D - ((% × P) / 76.98)' : 'D - (% / (76.98 × TPI))',
                    substituted: unitSystem === 'metric' 
                      ? `${majorDiameter} - ((${threadPercent} × ${pitch}) / 76.98)`
                      : `${majorDiameter} - (${threadPercent} / (76.98 × ${pitch}))`,
                    unit: unitSystem === 'metric' ? 'mm' : 'in',
                    assumptions: ['Standard 60° thread form', 'Theoretical planning value']
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
