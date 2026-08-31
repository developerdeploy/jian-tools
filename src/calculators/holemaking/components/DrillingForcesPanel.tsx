import React, { useState, useEffect } from 'react';
import { UnitSystem } from '../engine/shared';
import { calculateDrillingForces, DrillingForcesInput, DrillingForcesResult } from '../engine/drillingForces';
import { FormulaDrawer } from './FormulaDrawer';

interface DrillingForcesPanelProps {
  unitSystem: UnitSystem;
}

export const DrillingForcesPanel: React.FC<DrillingForcesPanelProps> = ({ unitSystem }) => {
  const [diameter, setDiameter] = useState<string>('14');
  const [cuttingSpeed, setCuttingSpeed] = useState<string>('60'); // m/min or sfm
  const [depth, setDepth] = useState<string>('30');
  const [feed, setFeed] = useState<string>('0.2'); // mm/rev or in/rev
  
  const [result, setResult] = useState<DrillingForcesResult | null>(null);

  useEffect(() => {
    if (unitSystem === 'metric') {
      setDiameter('14');
      setCuttingSpeed('60');
      setDepth('30');
      setFeed('0.2');
    } else {
      setDiameter('0.551');
      setCuttingSpeed('197');
      setDepth('1.181');
      setFeed('0.0078');
    }
  }, [unitSystem]);

  useEffect(() => {
    const input: DrillingForcesInput = {
      unitSystem,
      diameter: parseFloat(diameter),
      cuttingSpeed: parseFloat(cuttingSpeed),
      depth: parseFloat(depth),
      feed: parseFloat(feed)
    };
    const res = calculateDrillingForces(input);
    setResult(res);
  }, [unitSystem, diameter, cuttingSpeed, depth, feed]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Drill Diameter (D) [{unitSystem === 'metric' ? 'mm' : 'inch'}]
            </label>
            <input
              type="number"
              value={diameter}
              onChange={(e) => setDiameter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Cutting Speed (Vc) [{unitSystem === 'metric' ? 'm/min' : 'SFM'}]
            </label>
            <input
              type="number"
              value={cuttingSpeed}
              onChange={(e) => setCuttingSpeed(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Feed per Rev (fn) [{unitSystem === 'metric' ? 'mm/rev' : 'in/rev'}]
            </label>
            <input
              type="number"
              step="0.01"
              value={feed}
              onChange={(e) => setFeed(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Hole Depth [{unitSystem === 'metric' ? 'mm' : 'inch'}]
            </label>
            <input
              type="number"
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white dark:bg-[#1A1E23] rounded-xl p-5 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider mb-4">KINEMATIC RESULTS</h3>
            
            {result ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Spindle Speed (n)</span>
                  <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {result.spindleSpeed.toFixed(0)} <span className="text-sm font-sans text-slate-400">RPM</span>
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Feed per Min (Vf)</span>
                  <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {result.feedPerMinute.toFixed(1)} <span className="text-sm font-sans text-slate-400">{unitSystem === 'metric' ? 'mm/min' : 'in/min'}</span>
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Time in Cut (Tc)</span>
                  <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {result.timeInCutSec.toFixed(1)} <span className="text-sm font-sans text-slate-400">sec</span>
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block mb-1">Metal Removal Rate (Qz)</span>
                  <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                    {result.mrr.toFixed(2)} <span className="text-sm font-sans text-slate-400">{unitSystem === 'metric' ? 'cm³/min' : 'in³/min'}</span>
                  </span>
                </div>
                
                <div className="col-span-2">
                  <FormulaDrawer 
                    label="Spindle Speed"
                    trace={{
                      formula: unitSystem === 'metric' ? '(1000 × Vc) / (π × D)' : '(12 × Vc) / (π × D)',
                      substituted: unitSystem === 'metric'
                        ? `(1000 × ${cuttingSpeed}) / (π × ${diameter})`
                        : `(12 × ${cuttingSpeed}) / (π × ${diameter})`,
                      unit: 'RPM'
                    }}
                  />
                </div>
                
                <div className="col-span-2 mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="flex items-center space-x-2 text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-md">
                    <span className="text-xs">Torque and thrust calculations require validated material coefficients. Showing deterministic kinematics only.</span>
                  </div>
                </div>
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
