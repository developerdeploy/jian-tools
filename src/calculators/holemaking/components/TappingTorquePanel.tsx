import React, { useState, useEffect } from 'react';
import { UnitSystem } from '../engine/shared';
import { calculateTappingTorque, calculateRpm, TappingTorqueInput, TappingTorqueResult } from '../engine/tappingTorque';
import { FormulaDrawer } from './FormulaDrawer';
import torqueData from '../data/tappingTorqueTable.json';
import factorData from '../data/tappingMaterialFactors.json';

interface TappingTorquePanelProps {
  unitSystem: UnitSystem;
}

export const TappingTorquePanel: React.FC<TappingTorquePanelProps> = ({ unitSystem }) => {
  const [selectedTap, setSelectedTap] = useState<string>('1/4-20');
  const [selectedFactor, setSelectedFactor] = useState<string>('1.0');
  const [surfaceSpeed, setSurfaceSpeed] = useState<string>('30'); // m/min or SFM
  
  const [result, setResult] = useState<TappingTorqueResult | null>(null);
  const [rpm, setRpm] = useState<number>(0);

  // Initial defaults
  useEffect(() => {
    if (unitSystem === 'metric') {
      setSelectedTap('M8x1.25');
      setSurfaceSpeed('10'); // m/min
    } else {
      setSelectedTap('1/4-20');
      setSurfaceSpeed('30'); // SFM
    }
  }, [unitSystem]);

  useEffect(() => {
    const tapInfo = torqueData.find(t => t.tap === selectedTap);
    if (!tapInfo) {
      setResult(null);
      return;
    }

    const dia = tapInfo.diameterIn || (tapInfo.diameterMm ? tapInfo.diameterMm / 25.4 : 0.25);
    const speed = parseFloat(surfaceSpeed);
    
    // Ensure dia is passed correctly to calculateRpm based on unitSystem
    let calcDia = dia; 
    if (unitSystem === 'metric') {
      calcDia = tapInfo.diameterMm || (tapInfo.diameterIn ? tapInfo.diameterIn * 25.4 : 8.0);
    }

    const calculatedRpm = calculateRpm(speed, calcDia, unitSystem);
    setRpm(calculatedRpm);

    const input: TappingTorqueInput = {
      unitSystem,
      baseMinTorque: tapInfo.minTappingTorque,
      baseMaxTorque: tapInfo.maxTappingTorque,
      materialFactor: parseFloat(selectedFactor),
      rpm: calculatedRpm
    };

    const res = calculateTappingTorque(input);
    setResult(res);
  }, [unitSystem, selectedTap, selectedFactor, surfaceSpeed]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Tap Size
            </label>
            <select
              value={selectedTap}
              onChange={(e) => setSelectedTap(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            >
              {torqueData.map(t => (
                <option key={t.tap} value={t.tap}>{t.tap}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Workpiece Material
            </label>
            <select
              value={selectedFactor}
              onChange={(e) => setSelectedFactor(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            >
              <optgroup label="Simple Materials">
                {factorData.simple.map(m => (
                  <option key={m.id} value={m.factor}>{m.label}</option>
                ))}
              </optgroup>
              {factorData.hardnessSensitive.map(group => (
                <optgroup key={group.groupId} label={group.label}>
                  {group.values.map((v, idx) => (
                    <option key={`${group.groupId}-${idx}`} value={v.factor}>
                      {v.hardness} HB (Factor: {v.factor})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Surface Speed [{unitSystem === 'metric' ? 'm/min' : 'SFM'}]
            </label>
            <input
              type="number"
              value={surfaceSpeed}
              onChange={(e) => setSurfaceSpeed(e.target.value)}
              className="w-full bg-slate-50 dark:bg-[#1A1E23] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-precision-blue outline-none"
            />
          </div>
        </div>

        {/* Right: Results */}
        <div>
          <div className="bg-white dark:bg-[#1A1E23] rounded-xl p-5 border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 tracking-wider mb-4">TAPPING TORQUE & POWER</h3>
            
            {result ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Operating Torque Range</span>
                  <div className="text-3xl font-black font-mono text-slate-900 dark:text-white flex items-baseline">
                    {result.minTorque.toFixed(1)} <span className="text-slate-400 mx-2 font-sans font-normal">–</span> {result.maxTorque.toFixed(1)}
                    <span className="text-sm text-slate-400 font-sans ml-2">{unitSystem === 'metric' ? 'Nm' : 'in-lb'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-slate-200 dark:border-white/10 pt-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Required Spindle Speed</span>
                    <span className="font-mono font-bold dark:text-white">{rpm.toFixed(0)} RPM</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Planning Power (Max)</span>
                    <span className="font-mono font-bold dark:text-white">{result.maxPower.toFixed(3)} {unitSystem === 'metric' ? 'kW' : 'hp'}</span>
                  </div>
                </div>

                <FormulaDrawer 
                  label="Tapping Power"
                  trace={{
                    formula: unitSystem === 'metric' ? '(Torque × RPM) / 9549.3' : '(Torque × RPM) / 63025',
                    substituted: unitSystem === 'metric'
                      ? `(${result.maxTorque.toFixed(1)} × ${rpm.toFixed(0)}) / 9549.3`
                      : `(${result.maxTorque.toFixed(1)} × ${rpm.toFixed(0)}) / 63025`,
                    unit: unitSystem === 'metric' ? 'kW' : 'hp',
                    assumptions: ['Using maximum torque for conservative sizing']
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
