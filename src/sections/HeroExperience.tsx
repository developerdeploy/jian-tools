import React, { useState } from 'react';
import { ArrowRight, Film, ChevronRight, Compass, ShieldCheck, Box, Layers } from 'lucide-react';
import { CadEndMillViewer } from '../components/CadEndMillViewer';

interface HeroExperienceProps {
  onExploreClick: () => void;
  onOpenEnquiry?: () => void;
  onViewAnimationSoon?: () => void;
}

export const HeroExperience: React.FC<HeroExperienceProps> = ({
  onExploreClick,
  onOpenEnquiry,
  onViewAnimationSoon
}) => {
  const [heroMode, setHeroMode] = useState<'cad-endmill' | 'modular-drill'>('cad-endmill');

  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] lg:min-h-[880px] bg-[#080A0C] text-white overflow-hidden flex items-center pt-24 pb-16 border-b border-white/[0.08]"
    >
      {/* Precision CAD Grid Backdrop */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      {/* Main Editorial Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Industrial Narrative */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Engineering Micro-Label */}
            <div className="flex items-center space-x-3 mb-6">
              <span className="w-6 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-medium tracking-widest text-[#94A3B8] uppercase">
                01 / INDUSTRIAL TOOLING ARCHITECTURE
              </span>
            </div>

            {/* Display Headline — Pure High-Contrast Editorial Typography */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tightest leading-[0.92] text-white mb-6 font-display">
              PRECISION <br />
              <span className="text-[#94A3B8]">CARBIDE.</span> <br />
              BUILT TO CUT.
            </h1>

            {/* Precise Technical Subtitle */}
            <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed mb-8 font-sans">
              High-rigidity modular crown drills, solid carbide end mills, and deep-hole BTA systems engineered in Vadodara for high-volume aerospace, tube-sheet, and automotive machining.
            </p>

            {/* Restrained Action Controls */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center space-x-3 px-6 py-3.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer border border-blue-400/30"
              >
                <span>EXPLORE 11 PRODUCT CATEGORIES</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {onOpenEnquiry && (
                <button
                  onClick={() => onOpenEnquiry()}
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors border border-white/[0.12] cursor-pointer"
                >
                  <span>REQUEST QUOTE</span>
                </button>
              )}

              {onViewAnimationSoon && (
                <button
                  onClick={onViewAnimationSoon}
                  className="inline-flex items-center space-x-2 px-4 py-3.5 rounded-lg bg-transparent hover:bg-white/[0.04] text-[#94A3B8] hover:text-white text-xs font-mono transition-colors border border-white/[0.06] cursor-pointer"
                  title="Preview 3D CGI Cinematic"
                >
                  <Film className="w-3.5 h-3.5 text-precision-blue" />
                  <span>3D CGI COMING SOON</span>
                </button>
              )}
            </div>

            {/* Micro Specs Bar with Crisp Hairline Dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/[0.08] max-w-2xl font-mono text-xs">
              <div>
                <div className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">TOLERANCE</div>
                <div className="text-white font-bold mt-1">±0.002 mm</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">HARDNESS</div>
                <div className="text-white font-bold mt-1">Up to 93 HRA</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">MANUFACTURING</div>
                <div className="text-white font-bold mt-1">Makarpura, Vadodara</div>
              </div>
              <div>
                <div className="text-[10px] text-[#64748B] font-medium uppercase tracking-wider">DISPATCH SLA</div>
                <div className="text-white font-bold mt-1">24–48 Hours</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D CAD Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Mode Switcher Tabs */}
            <div className="w-full max-w-lg mb-3 flex items-center justify-between px-1">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setHeroMode('cad-endmill')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wider uppercase transition-all cursor-pointer border ${
                    heroMode === 'cad-endmill'
                      ? 'bg-precision-blue text-white border-precision-blue shadow-lg shadow-blue-900/30'
                      : 'bg-white/[0.04] text-[#94A3B8] hover:text-white border-white/[0.08]'
                  }`}
                >
                  <Box className="w-3.5 h-3.5" />
                  <span>3D CAD MODEL // END MILL</span>
                </button>

                <button
                  onClick={() => setHeroMode('modular-drill')}
                  className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium tracking-wider uppercase transition-all cursor-pointer border ${
                    heroMode === 'modular-drill'
                      ? 'bg-precision-blue text-white border-precision-blue shadow-lg shadow-blue-900/30'
                      : 'bg-white/[0.04] text-[#94A3B8] hover:text-white border-white/[0.08]'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>MODULAR CROWN DRILL</span>
                </button>
              </div>

              <span className="hidden sm:inline-block text-[10px] font-mono text-[#64748B]">
                {heroMode === 'cad-endmill' ? 'DRAG TO ROTATE 360°' : 'SPECIMEN 3D'}
              </span>
            </div>

            {/* Active Display Panel */}
            <div className="w-full max-w-lg">
              {heroMode === 'cad-endmill' ? (
                <CadEndMillViewer onOpenEnquiry={onOpenEnquiry} />
              ) : (
                <div className="relative w-full aspect-square rounded-2xl bg-[#111417] border border-white/[0.08] p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
                  
                  {/* Top Coordinate Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] border-b border-white/[0.06] pb-3">
                    <span className="text-white font-bold">SPECIMEN // JIAN-CROWN-3D</span>
                    <span className="text-precision-blue font-bold">MODULAR ARCHITECTURE</span>
                  </div>

                  {/* Centered Product Image */}
                  <div className="relative flex-1 flex items-center justify-center py-4">
                    <img
                      src="/assets/images/modular-drills/official/transparent/3D.webp"
                      alt="JIAN Flagship Modular Crown Drill System"
                      className="max-h-72 w-auto object-contain filter contrast-125 drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-500"
                      draggable={false}
                    />

                    {/* Technical Micro Callouts */}
                    <div className="absolute top-6 right-2 text-right pointer-events-none">
                      <span className="text-[9px] font-mono text-[#64748B] block uppercase tracking-wider">CROWN TIP</span>
                      <span className="text-xs font-mono font-bold text-white">140° Self-Centering</span>
                    </div>

                    <div className="absolute bottom-6 left-2 pointer-events-none">
                      <span className="text-[9px] font-mono text-[#64748B] block uppercase tracking-wider">COOLANT</span>
                      <span className="text-xs font-mono font-bold text-white">Dual Internal Ports</span>
                    </div>
                  </div>

                  {/* Bottom Specimen Datum */}
                  <div className="flex items-center justify-between text-[10px] font-mono pt-3 border-t border-white/[0.06] text-[#94A3B8]">
                    <span>RATIO: 1D – 12D REACH</span>
                    <span className="text-white font-bold">Ø 9.5 mm – Ø 40.0 mm</span>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

