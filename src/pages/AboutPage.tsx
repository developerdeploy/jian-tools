import React from 'react';
import {
  ShieldCheck,
  MapPin,
  Phone,
  MessageSquare,
  Award,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  Gauge,
  Factory,
  Globe
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
    <div className="w-full pt-28 pb-24 bg-slate-50 dark:bg-[#07090B] min-h-screen text-slate-800 dark:text-steel-200 transition-colors duration-300">
      
      {/* CAD Background Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Page Header */}
        <div className="mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
              ABOUT JIAN TOOLS // PRECISION CARBIDE ARCHITECTURE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tightest text-slate-900 dark:text-white leading-none mb-6">
            ENGINEERING EXCELLENCE. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
              FROM CARBIDE TO PRECISION.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-steel-300 max-w-3xl leading-relaxed">
            Located in the industrial engineering capital of <strong className="text-slate-900 dark:text-white">Makarpura GIDC, Vadodara, Gujarat</strong>, JIAN TOOLS is a premier precision carbide cutting-tool manufacturer delivering high-accuracy modular drilling systems, solid carbide endmills, deep-hole tooling, and industrial scarfing solutions.
          </p>
        </div>

        {/* 4 Core Pillars of Precision */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-precision-blue/10 flex items-center justify-center text-precision-blue mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Virgin Carbide Substrates
            </h3>
            <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
              Exclusively formulated sub-micron tungsten carbide grains with uniform cobalt distribution for maximum tool hardness (up to 93 HRA) and wear life.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-precision-blue/10 flex items-center justify-center text-precision-blue mb-4">
              <Gauge className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              ±0.002 mm Tolerances
            </h3>
            <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
              Every tool diameter, flute helix, and shank profile is ground on high-precision multi-axis CNC tool grinding centers with laser dynamic calibration.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-precision-blue/10 flex items-center justify-center text-precision-blue mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              PVD Nano-Coatings
            </h3>
            <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
              Multi-layer TiN, TiAlN, and AlCrN physical vapor deposition coatings engineered to withstand cutting temperatures in excess of 950°C.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-precision-blue/10 flex items-center justify-center text-precision-blue mb-4">
              <Factory className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Direct Application Engineering
            </h3>
            <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
              Our engineering team works directly with your machinists to optimize cycle times, feed rates, chip evacuation, and custom tooling geometries.
            </p>
          </div>
        </div>

        {/* Manufacturing Facility & Vadodara Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-3 font-bold">
                <MapPin className="w-4 h-4" />
                <span>VADODARA MANUFACTURING HUB</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
                Strategically Positioned in Gujarat’s Industrial Corridor
              </h2>
              <p className="text-sm text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                Operating out of Makarpura GIDC, our facility houses high-precision CNC tool grinders, optical non-contact tool presetters, and a dedicated quality assurance laboratory to ensure every batch meets rigid aerospace, automotive, and heavy engineering standards.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-white/10 font-mono">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] text-slate-500 dark:text-steel-400 font-bold">INSPECTION</div>
                  <div className="text-slate-900 dark:text-white font-black text-sm mt-0.5">100% Optical</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] text-slate-500 dark:text-steel-400 font-bold">DISPATCH</div>
                  <div className="text-precision-blue font-black text-sm mt-0.5">24–48 Hours</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] text-slate-500 dark:text-steel-400 font-bold">STANDARD</div>
                  <div className="text-slate-900 dark:text-white font-black text-sm mt-0.5">ISO 9001 / DIN</div>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-slate-100 dark:border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 dark:text-steel-400">
                {companyContactDetails.address}
              </span>
              <button
                onClick={() => onOpenEnquiry()}
                className="px-5 py-2.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-bold font-mono transition-all shadow-md"
              >
                REQUEST FACILITY VISIT
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-slate-900 to-black text-white p-8 sm:p-10 flex flex-col justify-between border border-white/10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-precision-blue/10 blur-[90px] rounded-full pointer-events-none" />

            <div>
              <div className="text-xs font-mono text-precision-blue font-bold tracking-widest mb-3 uppercase">
                // OUR COMMITMENT
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 leading-tight">
                "Your Solution Provider For All Your Carbide Cutting Tools Need."
              </h3>
              <p className="text-xs sm:text-sm text-steel-300 leading-relaxed mb-6">
                From high-feed modular crown drills on heavy heat exchanger tube sheets to specialized ID/OD tube scarfing rings and custom form reamers, JIAN TOOLS delivers tooling that lowers cost-per-hole and maximizes spindle efficiency.
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs pt-4 border-t border-white/10">
              <div className="flex items-center space-x-2 text-steel-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>High-Rigidity Cam-Lock Modular Crown Bodies</span>
              </div>
              <div className="flex items-center space-x-2 text-steel-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deep Hole BTA & Gun Drills (Brazed & Indexable)</span>
              </div>
              <div className="flex items-center space-x-2 text-steel-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Custom Solid Carbide Endmills & Reamers</span>
              </div>
            </div>

            <div className="pt-8 mt-6">
              <button
                onClick={onNavigateProducts}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold tracking-wider uppercase transition-all shadow-lg font-sans"
              >
                <span>EXPLORE ALL 11 PRODUCT CATEGORIES</span>
                <ArrowRight className="w-4 h-4 text-precision-blue" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
