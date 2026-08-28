import React from 'react';
import { ArrowRight, CheckCircle2, Factory, Layers, ShieldCheck } from 'lucide-react';

interface TubeSheetApplicationProps {
  onOpenCatalogue: (categorySlug?: string) => void;
  onOpenEnquiry: (productName?: string) => void;
}

export const TubeSheetApplication: React.FC<TubeSheetApplicationProps> = ({
  onOpenCatalogue,
  onOpenEnquiry
}) => {
  return (
    <section className="relative w-full py-24 bg-[#F3F3F1] dark:bg-[#080A0C] border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden">
      
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-6 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
                03 / APPLICATION STORY // TUBE SHEET & BAFFLE DRILLING
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080A0C] dark:text-white leading-none font-display">
              HIGH-VOLUME DRILLING. <br />
              <span className="text-[#64748B] dark:text-[#94A3B8]">ZERO SCRAP TOLERANCE.</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 max-w-md">
            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Drilling thousands of contiguous holes in boiler tube sheets, heat exchangers, and stacked baffle plates demands rigid modular drill bodies that eliminate hole bell-mouthing and drift.
            </p>
          </div>
        </div>

        {/* 2-Column Split: Editorial Case Study & Real Factory Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Left: Main Feature Photo & Metrics */}
          <div className="lg:col-span-7 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 flex flex-col justify-between">
            <div className="relative rounded-lg overflow-hidden bg-black mb-6 border border-black/[0.06] dark:border-white/[0.06] group">
              <img
                src="/assets/images/tube-sheet/73cfe0c5-37c2-4152-b9ae-39d98e072ca1.webp"
                alt="Stacked Baffle Plate Drilling in Production"
                className="w-full h-80 sm:h-96 object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-[11px]">
                <span className="bg-black/80 backdrop-blur px-3 py-1 rounded border border-white/10 font-bold">
                  BAFFLE STACK MULTI-LAYER DRILLING
                </span>
                <span className="text-precision-blue font-bold">ASTM A516 / SS304</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-bold">HOLE ACCURACY</div>
                <div className="text-sm font-black text-[#080A0C] dark:text-white mt-1">H7 / H8</div>
              </div>
              <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-bold">SURFACE FINISH</div>
                <div className="text-sm font-black text-precision-blue mt-1">Ra 1.6 μm</div>
              </div>
              <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-bold">SPINDLE DOWNTIME</div>
                <div className="text-sm font-black text-precision-blue mt-1">&lt; 30 Sec Swap</div>
              </div>
            </div>
          </div>

          {/* Right: Technical Narrative & Factory Assets */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue font-bold mb-2">
                <Factory className="w-4 h-4" />
                <span>SOLVING MACHINING BOTTLENECKS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#080A0C] dark:text-white mb-3 font-display">
                Eliminate Re-clamping & Presetting
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
                When drilling arrays of 5,000+ holes in thick tube sheets, tool wear causes downtime. JIAN TOOLS modular crown drills allow indexable cutting head replacement right in the spindle without resetting machine datums.
              </p>

              <div className="space-y-2.5 font-mono text-xs text-[#2D3748] dark:text-[#94A3B8]">
                <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                  <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0" />
                  <span>Self-centering 140° crown tip prevents hole walking</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                  <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0" />
                  <span>Dual internal coolant ports clear swarf chips</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                  <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0" />
                  <span>Bodies available from 1D up to 12D reach ratios</span>
                </div>
              </div>
            </div>

            {/* Sub-gallery of factory photos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-lg overflow-hidden bg-black h-36 border border-black/[0.08] dark:border-white/[0.08] group">
                <img
                  src="/assets/images/tube-sheet/dede5817-acb0-4eea-975d-6a67f7d3a522.webp"
                  alt="Stacked Baffle Sheet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white font-bold">
                  STACKED BAFFLE HOLES
                </span>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-black h-36 border border-black/[0.08] dark:border-white/[0.08] group">
                <img
                  src="/assets/images/tube-sheet/perforated-plate-drillings.webp"
                  alt="Perforated Plate Drilling"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
