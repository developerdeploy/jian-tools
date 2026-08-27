import React from 'react';
import { Layers, Cpu, Sparkles, Gauge, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface EngineeringStoryProps {
  onOpenCatalogue: () => void;
  onOpenEnquiry: () => void;
}

export const EngineeringStory: React.FC<EngineeringStoryProps> = ({
  onOpenCatalogue,
  onOpenEnquiry
}) => {
  const steps = [
    {
      step: '01',
      title: 'Virgin Micro-Grain Substrate',
      subtitle: 'Tungsten Carbide Metallurgy',
      desc: 'Formulated with ultra-fine 0.5–0.8 μm tungsten carbide grain particles and homogeneous cobalt distribution, maximizing hardness (up to 93 HRA) without compromising fracture toughness.',
      metric: '93 HRA Hardness'
    },
    {
      step: '02',
      title: '5-Axis Helical Flute Grinding',
      subtitle: 'Controlled Core Web Geometry',
      desc: 'Precision ground on multi-axis CNC centers with mirror-polished flute gullets to minimize chip friction and ensure harmonic stability under heavy chip loads.',
      metric: '±0.002 mm Runout'
    },
    {
      step: '03',
      title: 'PVD Thermal Nano-Coatings',
      subtitle: 'Advanced Wear Protection',
      desc: 'Multi-layer Titanium Nitride (TiN) and Titanium Aluminium Nitride (TiAlN) coatings engineered to withstand cutting temperatures up to 950°C during dry or wet machining.',
      metric: '950°C Thermal Barrier'
    },
    {
      step: '04',
      title: 'Dual Internal Coolant Delivery',
      subtitle: 'Targeted High-Pressure Flow',
      desc: 'Through-tool coolant orifices direct high-pressure cutting fluid directly to the chisel cutting edge, forcing swift chip evacuation in deep-hole and tube-sheet cavities.',
      metric: 'Min. 40 Bar Through-Flow'
    },
    {
      step: '05',
      title: '100% Optical Metrology',
      subtitle: 'Batch Traceability & Validation',
      desc: 'Every single manufactured cutting head and drill body undergoes non-contact optical presetting and laser dynamic verification before final packaging.',
      metric: '100% Quality Inspected'
    }
  ];

  return (
    <section className="relative w-full py-28 bg-slate-50 dark:bg-[#07090B] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
                THE ENGINEERING STORY // ANATOMY OF A CUT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none font-display">
              FROM CARBIDE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                TO PRECISION CUT.
              </span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-steel-400 leading-relaxed">
              Industrial cutting tools are not commodity items. Every JIAN TOOLS carbide insert and modular drill follows an exacting engineering process designed for repeatable tool life and zero scrap rates.
            </p>
          </div>
        </div>

        {/* 5-Step Process Timeline / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col justify-between hover:border-precision-blue transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-white/5">
                  <span className="text-xs font-mono font-black text-precision-blue">
                    {item.step} //
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-precision-blue/10 text-precision-blue border border-precision-blue/20">
                    {item.metric}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 group-hover:text-precision-blue transition-colors font-display">
                  {item.title}
                </h3>
                <div className="text-[11px] font-mono text-slate-500 dark:text-steel-400 font-semibold mb-3">
                  {item.subtitle}
                </div>

                <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span>PHASE 0{idx + 1}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Strip */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-precision-blue/10 flex items-center justify-center text-precision-blue shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Require Custom Tool Geometries for Specific Alloy Steels?
              </div>
              <div className="text-xs text-slate-500 dark:text-steel-400">
                Our application engineers optimize helix angles and coatings for Inconel, SS316, Titanium, and carbon steels.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={onOpenCatalogue}
              className="px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-mono font-bold text-slate-800 dark:text-white transition-colors"
            >
              BROWSE CATALOGUE
            </button>
            <button
              onClick={onOpenEnquiry}
              className="px-5 py-2.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-xs font-mono font-bold text-white transition-colors shadow-md"
            >
              REQUEST CUSTOM TOOLING
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
