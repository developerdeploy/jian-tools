import React from 'react';
import {
  MapPin,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Sparkles,
  Factory
} from 'lucide-react';
import { companyContactDetails } from '../data/whyJianTools';

interface AboutPageProps {
  onOpenEnquiry: (productName?: string) => void;
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onOpenEnquiry,
  onNavigateHome,
  onNavigateProducts
}) => {
  return (
    <div className="w-full pt-28 pb-24 bg-[#F3F3F1] dark:bg-[#080A0C] min-h-screen text-[#080A0C] dark:text-[#E2E8F0]">
      
      {/* CAD Background Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Page Header */}
        <div className="mb-14 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-6 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
              ABOUT JIAN TOOLS // PRECISION CARBIDE ARCHITECTURE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#080A0C] dark:text-white leading-none mb-4 font-display">
            ENGINEERING EXCELLENCE. <br />
            <span className="text-[#64748B] dark:text-[#94A3B8]">FROM CARBIDE TO PRECISION.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Located in the industrial engineering capital of <strong className="text-[#080A0C] dark:text-white">Makarpura GIDC, Vadodara, Gujarat</strong>, JIAN TOOLS is a premier precision carbide cutting-tool manufacturer delivering high-accuracy modular drilling systems, solid carbide endmills, deep-hole tooling, and industrial scarfing solutions.
          </p>
        </div>

        {/* 4 Core Pillars of Precision */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
            <div className="text-[10px] font-mono font-bold text-precision-blue uppercase tracking-widest mb-3">
              01 / SUBSTRATE
            </div>
            <h3 className="text-base font-bold text-[#080A0C] dark:text-white mb-2 font-display">
              Virgin Carbide Substrates
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Exclusively formulated sub-micron tungsten carbide grains with uniform cobalt distribution for maximum hardness (up to 93 HRA) and wear life.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
            <div className="text-[10px] font-mono font-bold text-precision-blue uppercase tracking-widest mb-3">
              02 / METROLOGY
            </div>
            <h3 className="text-base font-bold text-[#080A0C] dark:text-white mb-2 font-display">
              ±0.002 mm Tolerances
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Every tool diameter, flute helix, and shank profile is ground on high-precision multi-axis CNC tool grinding centers with laser dynamic calibration.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
            <div className="text-[10px] font-mono font-bold text-precision-blue uppercase tracking-widest mb-3">
              03 / SURFACE
            </div>
            <h3 className="text-base font-bold text-[#080A0C] dark:text-white mb-2 font-display">
              PVD Nano-Coatings
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Multi-layer TiN, TiAlN, and AlCrN physical vapor deposition coatings engineered to withstand cutting temperatures in excess of 950°C.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
            <div className="text-[10px] font-mono font-bold text-precision-blue uppercase tracking-widest mb-3">
              04 / PARTNERSHIP
            </div>
            <h3 className="text-base font-bold text-[#080A0C] dark:text-white mb-2 font-display">
              Application Engineering
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
              Our engineering team works directly with your machinists to optimize cycle times, feed rates, chip evacuation, and custom tooling geometries.
            </p>
          </div>
        </div>

        {/* Manufacturing Facility & Vadodara Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          
          <div className="lg:col-span-7 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-2 font-bold">
                <MapPin className="w-4 h-4" />
                <span>VADODARA MANUFACTURING HUB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#080A0C] dark:text-white mb-3 font-display">
                Positioned in Gujarat’s Industrial Corridor
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-6">
                Operating out of Makarpura GIDC, our facility houses high-precision CNC tool grinders, optical non-contact tool presetters, and a dedicated quality assurance laboratory to ensure every batch meets rigid aerospace, automotive, and heavy engineering standards.
              </p>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] font-mono">
                <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-bold">INSPECTION</div>
                  <div className="text-[#080A0C] dark:text-white font-bold text-xs mt-0.5">100% Optical</div>
                </div>
                <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-bold">DISPATCH</div>
                  <div className="text-precision-blue font-bold text-xs mt-0.5">24–48 Hours</div>
                </div>
                <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                  <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-bold">STANDARD</div>
                  <div className="text-[#080A0C] dark:text-white font-bold text-xs mt-0.5">ISO 9001 / DIN</div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <span className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                {companyContactDetails.address}
              </span>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-4 py-2 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-medium font-mono transition-colors border border-blue-400/30 cursor-pointer"
              >
                REQUEST FACILITY VISIT
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl bg-[#111417] text-white p-6 sm:p-8 flex flex-col justify-between border border-white/[0.08]">
            <div>
              <div className="text-[10px] font-mono text-precision-blue font-bold tracking-widest mb-2 uppercase">
                // OUR COMMITMENT
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 font-display">
                "Your Solution Provider For All Your Carbide Cutting Tools Need."
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                From high-feed modular crown drills on heavy heat exchanger tube sheets to specialized ID/OD tube scarfing rings and custom form reamers, JIAN TOOLS delivers tooling that lowers cost-per-hole and maximizes spindle efficiency.
              </p>
            </div>

            <div className="space-y-2.5 font-mono text-xs pt-4 border-t border-white/[0.08]">
              <div className="flex items-center space-x-2 text-[#CBD5E1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-precision-blue shrink-0" />
                <span>High-Rigidity Screw Lock Modular Drill Bodies</span>
              </div>
              <div className="flex items-center space-x-2 text-[#CBD5E1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-precision-blue shrink-0" />
                <span>Deep Hole BTA & Gun Drills (Brazed & Indexable)</span>
              </div>
              <div className="flex items-center space-x-2 text-[#CBD5E1]">
                <CheckCircle2 className="w-3.5 h-3.5 text-precision-blue shrink-0" />
                <span>Custom Solid Carbide Endmills & Reamers</span>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/[0.08]">
              <button
                onClick={onNavigateProducts}
                className="w-full flex items-center justify-center space-x-2 px-5 py-3 rounded-lg bg-white hover:bg-slate-100 text-[#080A0C] text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer"
              >
                <span>EXPLORE ALL 11 PRODUCT CATEGORIES</span>
                <ArrowRight className="w-3.5 h-3.5 text-precision-blue" />
              </button>
            </div>
          </div>

        </div>

        {/* OUR CORE EXPERTISE */}
        <div className="mt-16 pt-16 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center space-x-3 mb-8">
            <span className="w-6 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
              OUR STRENGTH // OUR CORE EXPERTISE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#080A0C] dark:text-white leading-tight mb-4 font-display">
                Specialized in Modular Drilling Solutions.
              </h2>
              <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                At JIAN TOOLS, we specialize in modular drilling solutions for demanding industrial applications. Our expertise is focused on high-volume accuracy, reliability, and custom tool engineering.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Heat Exchanger */}
              <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
                <h3 className="text-lg font-bold text-[#080A0C] dark:text-white mb-2 font-display">
                  HEAT EXCHANGER DRILLING
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Precision hole making for tube sheets, baffles, plates and heat exchanger components. Designed for high-volume hole accuracy, efficient chip evacuation, and reduced machining time.
                </p>
              </div>

              {/* Structural Steel */}
              <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08]">
                <h3 className="text-lg font-bold text-[#080A0C] dark:text-white mb-2 font-display">
                  STRUCTURAL STEEL DRILLING
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
                  Reliable and efficient drilling solutions for beams, columns, plates, flanges and fabricated structures. Built to deliver reliable performance and high productivity in heavy fabrication.
                </p>
              </div>

              {/* Custom Drilling */}
              <div className="p-6 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] md:col-span-2">
                <h3 className="text-lg font-bold text-[#080A0C] dark:text-white mb-2 font-display">
                  CUSTOM DRILLING SOLUTIONS
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-4">
                  Tooling solutions developed according to your machine, material, hole diameter, depth and machining requirements. With replaceable cutting components, our systems reduce tooling inventory and overall machining costs.
                </p>
                <button
                  onClick={() => onOpenEnquiry('Custom Drilling Solutions')}
                  className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-precision-blue hover:text-blue-700 transition-colors"
                >
                  <span>REQUEST CUSTOM TOOLING</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
