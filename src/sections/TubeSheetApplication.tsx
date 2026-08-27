import React from 'react';
import { ShieldCheck, ArrowRight, Gauge, CheckCircle2, Factory } from 'lucide-react';

interface TubeSheetApplicationProps {
  onOpenCatalogue: (categorySlug?: string) => void;
  onOpenEnquiry: (productName?: string) => void;
}

export const TubeSheetApplication: React.FC<TubeSheetApplicationProps> = ({
  onOpenCatalogue,
  onOpenEnquiry
}) => {
  return (
    <section className="relative w-full py-28 bg-slate-100 dark:bg-[#050608] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
                CORE APPLICATION STORY // TUBE SHEET & BAFFLE STACK DRILLING
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none font-display">
              HIGH-VOLUME DRILLING. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                ZERO SCRAP TOLERANCE.
              </span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-steel-400 leading-relaxed">
              Drilling thousands of contiguous holes in boiler tube sheets, heat exchangers, and stacked baffle plates demands rigid modular drill bodies that eliminate hole bell-mouthing and drift.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Editorial Case Study & Real Factory Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Big Feature Photo & Technical Callouts */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-6 sm:p-8 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative rounded-xl overflow-hidden bg-slate-900 mb-6 border border-slate-200 dark:border-white/5 group">
              <img
                src="/assets/images/tube-sheet/73cfe0c5-37c2-4152-b9ae-39d98e072ca1.webp"
                alt="Stacked Baffle Plate Drilling in Production"
                className="w-full h-80 sm:h-96 object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[11px]">
                <span className="bg-black/60 backdrop-blur px-3 py-1 rounded-md border border-white/10 font-bold">
                  BAFFLE STACK MULTI-LAYER DRILLING
                </span>
                <span className="text-precision-blue font-bold">ASTM A516 / SS304</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-bold">HOLE ACCURACY</div>
                <div className="text-sm font-black text-slate-900 dark:text-white mt-0.5">H7 / H8</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-bold">SURFACE FINISH</div>
                <div className="text-sm font-black text-precision-blue mt-0.5">Ra 1.6 μm</div>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-bold">TOOL LIFE</div>
                <div className="text-sm font-black text-emerald-500 mt-0.5">+40% vs HSS</div>
              </div>
            </div>
          </div>

          {/* Right: Real Application Details & Gallery */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue font-bold mb-2">
                <Factory className="w-4 h-4" />
                <span>SOLVING CRITICAL MACHINING BOTTLENECKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 font-display">
                Eliminate Re-clamping & Tool Length Presetting
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                When drilling arrays of 5,000+ holes in thick tube sheets, tool wear causes downtime. JIAN TOOLS modular crown drills allow indexable cutting head replacement right in the spindle under 30 seconds without resetting machine datums.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-700 dark:text-steel-300">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Self-centering 140° crown tip prevents hole walking</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Dual internal coolant ports clear stringy swarf chips</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Bodies available from 1D up to 12D reach ratios</span>
                </div>
              </div>
            </div>

            {/* Sub-gallery of factory photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-xl overflow-hidden bg-black h-36 border border-slate-200 dark:border-white/5 group">
                <img
                  src="/assets/images/tube-sheet/dede5817-acb0-4eea-975d-6a67f7d3a522.webp"
                  alt="Stacked Baffle Sheet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white font-bold">
                  STACKED BAFFLE HOLES
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-black h-36 border border-slate-200 dark:border-white/5 group">
                <img
                  src="/assets/images/tube-sheet/perforated-plate-drillings.webp"
                  alt="Perforated Plate Drilling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white font-bold">
                  PERFORATED PLATES
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
