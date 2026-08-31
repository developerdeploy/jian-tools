import React, { useState, useEffect } from 'react';
import { UnitSystem } from '../engine/shared';
import { calculateCuttingFluid, CuttingFluidInput, CuttingFluidResult } from '../engine/cuttingFluid';
import { FormulaDrawer } from './FormulaDrawer';

interface CuttingFluidPanelProps {
  unitSystem: UnitSystem;
}

export const CuttingFluidPanel: React.FC<CuttingFluidPanelProps> = ({ unitSystem }) => {
  const [pressure, setPressure] = useState<string>('70');
  const [mode, setMode] = useState<'flow' | 'orifice'>('orifice');
  const [orificeDiameter, setOrificeDiameter] = useState<string>('2.5');
  const [flow, setFlow] = useState<string>('15');
  const [impellerEfficiency, setImpellerEfficiency] = useState<string>('85');
  const [motorEfficiency, setMotorEfficiency] = useState<string>('85');
  
  const [result, setResult] = useState<CuttingFluidResult | null>(null);

  useEffect(() => {
    if (unitSystem === 'metric') {
      setPressure('70'); // bar
      setOrificeDiameter('2.5'); // mm
      setFlow('15'); // L/min
    } else {
      setPressure('1000'); // psi
      setOrificeDiameter('0.1'); // inch
      setFlow('4'); // GPM
    }
  }, [unitSystem]);

  useEffect(() => {
    const input: CuttingFluidInput = {
      unitSystem,
      pressure: parseFloat(pressure),
      mode,
      orificeDiameter: mode === 'orifice' ? parseFloat(orificeDiameter) : undefined,
      flow: mode === 'flow' ? parseFloat(flow) : undefined,
      impellerEfficiency: parseFloat(impellerEfficiency),
      motorEfficiency: parseFloat(motorEfficiency)
    };
    const res = calculateCuttingFluid(input);
    setResult(res);
  }, [unitSystem, pressure, mode, orificeDiameter, flow, impellerEfficiency, motorEfficiency]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Coolant Pressure [{unitSystem === 'metric' ? 'bar' : 'psi'}]
            </label>
            <input
              type="number"
              value={pressure}
              onChange={(e) => setPressure(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>

          <div className="bg-slate-100 dark:bg-[#1A1E23] p-1 rounded-lg w-full grid grid-cols-2">
            <button
              onClick={() => setMode('orifice')}
              className={`px-2 py-1.5 text-xs font-bold rounded-md transition-all ${
                mode === 'orifice'
                  ? 'bg-white dark:bg-[#2A2E33] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              I know Orifice
            </button>
            <button
              onClick={() => setMode('flow')}
              className={`px-2 py-1.5 text-xs font-bold rounded-md transition-all ${
                mode === 'flow'
                  ? 'bg-white dark:bg-[#2A2E33] text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
              }`}
            >
              I know Flow
            </button>
          </div>

          {mode === 'orifice' ? (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Orifice Diameter [{unitSystem === 'metric' ? 'mm' : 'inch'}]
              </label>
              <input
                type="number"
                step="0.1"
                value={orificeDiameter}
                onChange={(e) => setOrificeDiameter(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Total Flow Rate [{unitSystem === 'metric' ? 'L/min' : 'GPM'}]
              </label>
              <input
                type="number"
                value={flow}
                onChange={(e) => setFlow(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Impeller Eff. [%]
              </label>
              <input
                type="number"
                value={impellerEfficiency}
                onChange={(e) => setImpellerEfficiency(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Motor Eff. [%]
              </label>
              <input
                type="number"
                value={motorEfficiency}
                onChange={(e) => setMotorEfficiency(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white dark:bg-[#1A1E23] rounded-xl p-5 border border-slate-200 dark:border-white/10 shadow-sm relative overflow-hidden">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider mb-4 relative z-10">MINIMUM MOTOR SIZE</h3>
            
            {result ? (
              <div className="relative z-10">
                <div className="text-4xl font-black font-mono text-precision-blue mb-6">
                  {result.motorPower.toFixed(3)}
                  <span className="text-lg text-slate-400 font-sans ml-2">{unitSystem === 'metric' ? 'kW' : 'hp'}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-slate-200 dark:border-white/10 pt-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Jet Velocity</span>
                    <span className="font-mono text-sm dark:text-white">{result.velocity.toFixed(1)} {unitSystem === 'metric' ? 'm/min' : 'ft/min'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Hydraulic Power</span>
                    <span className="font-mono text-sm dark:text-white">{result.hydraulicPower.toFixed(3)} {unitSystem === 'metric' ? 'kW' : 'hp'}</span>
                  </div>
                  {mode === 'flow' ? (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Required Orifice</span>
                      <span className="font-mono text-sm dark:text-white">{result.orificeDiameter.toFixed(3)} {unitSystem === 'metric' ? 'mm' : 'in'}</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Flow Rate</span>
                      <span className="font-mono text-sm dark:text-white">{result.flow.toFixed(2)} {unitSystem === 'metric' ? 'L/min' : 'GPM'}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Efficiency</span>
                    <span className="font-mono text-sm dark:text-white">{(result.totalEfficiency * 100).toFixed(1)}%</span>
                  </div>
                </div>

                <FormulaDrawer 
                  label="Motor Size"
                  trace={{
                    formula: 'P_hydraulic / (η_impeller × η_motor)',
                    substituted: `${result.hydraulicPower.toFixed(3)} / (${(parseFloat(impellerEfficiency)/100).toFixed(2)} × ${(parseFloat(motorEfficiency)/100).toFixed(2)})`,
                    unit: unitSystem === 'metric' ? 'kW' : 'hp',
                    assumptions: ['Fluid density = 1000 kg/m³ (water)', 'Theoretical hydraulic jet model']
                  }}
                />
              </div>
            ) : (
              <div className="text-slate-400 font-mono relative z-10">Invalid inputs</div>
            )}
            
            {/* Subtle Jet Graphic */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-32 h-32 flex items-center justify-center translate-x-4 translate-y-4">
               <svg viewBox="0 0 100 100" className="w-full h-full text-precision-blue">
                 <path d="M0,50 Q25,25 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="8" />
                 <path d="M0,60 Q25,35 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="4" />
                 <path d="M0,40 Q25,15 50,40 T100,40" fill="none" stroke="currentColor" strokeWidth="4" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
