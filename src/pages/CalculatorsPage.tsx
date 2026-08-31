import React, { useState } from 'react';
import { UnitSystem } from '../calculators/holemaking/engine/shared';
import { UnitToggle } from '../calculators/holemaking/components/UnitToggle';
import { CuttingFluidPanel } from '../calculators/holemaking/components/CuttingFluidPanel';
import { TapDrillPanel } from '../calculators/holemaking/components/TapDrillPanel';
import { TapLimitsPanel } from '../calculators/holemaking/components/TapLimitsPanel';
import { TappingTorquePanel } from '../calculators/holemaking/components/TappingTorquePanel';
import { DrillingForcesPanel } from '../calculators/holemaking/components/DrillingForcesPanel';
import { Droplets, Settings, ArrowDownToDot, Zap, CircleDashed } from 'lucide-react';

interface CalculatorsPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: () => void;
}

type CalculatorId = 'cutting-fluid' | 'tap-drill' | 'tap-limits' | 'tapping-torque' | 'drilling-forces';

export const CalculatorsPage: React.FC<CalculatorsPageProps> = ({
  onBackToHome,
  onOpenEnquiry
}) => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>('cutting-fluid');

  const calculators = [
    { id: 'cutting-fluid', label: 'Cutting Fluid', icon: Droplets },
    { id: 'tap-drill', label: 'Tap Drill Size', icon: ArrowDownToDot },
    { id: 'tap-limits', label: 'D/H Tap Limits', icon: CircleDashed },
    { id: 'tapping-torque', label: 'Tapping Torque', icon: Settings },
    { id: 'drilling-forces', label: 'Drilling Kinematics', icon: Zap }
  ] as const;

  return (
    <div className="w-full min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-[#07090B]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Header Area */}
        <div className="mb-12 border-b border-slate-200 dark:border-white/10 pb-8 flex flex-col md:flex-row justify-between md:items-end">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-steel-400 mb-4">
              <button onClick={onBackToHome} className="hover:text-precision-blue transition-colors">HOME</button>
              <span>/</span>
              <span className="text-precision-blue font-semibold">ENGINEERING CALCULATORS</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display mb-4">
              Holemaking Engineering Calculators
            </h1>
            <p className="text-sm text-slate-600 dark:text-steel-300 max-w-3xl">
              Engineering calculations are theoretical planning estimates. Actual machining results depend on tooling, geometry, material condition, machine rigidity, coolant, setup, and operating conditions.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <UnitToggle unitSystem={unitSystem} onChange={setUnitSystem} />
          </div>
        </div>

        {/* Workspace Shell */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Navigator (Left) */}
          <div className="lg:col-span-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#0D1115] border border-slate-200 dark:border-white/10 shadow-sm sticky top-32">
              <h2 className="text-[10px] font-bold font-mono text-slate-400 mb-4 tracking-wider uppercase px-2">Calculator Suite</h2>
              <div className="flex flex-col space-y-1">
                {calculators.map(calc => {
                  const Icon = calc.icon;
                  return (
                    <button
                      key={calc.id}
                      onClick={() => setActiveCalculator(calc.id as CalculatorId)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-semibold transition-all text-left ${
                        activeCalculator === calc.id
                          ? 'bg-precision-blue text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{calc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Calculator Panel (Center + Right) */}
          <div className="lg:col-span-9">
            <div className="p-6 rounded-xl bg-white dark:bg-[#0D1115] border border-slate-200 dark:border-white/10 shadow-sm min-h-[500px]">
              
              <div className="mb-8 pb-4 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                  {calculators.find(c => c.id === activeCalculator)?.label}
                </h2>
                <button
                  onClick={onOpenEnquiry}
                  className="px-4 py-2 text-xs font-bold font-mono text-precision-blue border border-precision-blue rounded-lg hover:bg-precision-blue hover:text-white transition-colors"
                >
                  TALK TO AN EXPERT
                </button>
              </div>

              {activeCalculator === 'cutting-fluid' && <CuttingFluidPanel unitSystem={unitSystem} />}
              {activeCalculator === 'tap-drill' && <TapDrillPanel unitSystem={unitSystem} />}
              {activeCalculator === 'tap-limits' && <TapLimitsPanel unitSystem={unitSystem} />}
              {activeCalculator === 'tapping-torque' && <TappingTorquePanel unitSystem={unitSystem} />}
              {activeCalculator === 'drilling-forces' && <DrillingForcesPanel unitSystem={unitSystem} />}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
