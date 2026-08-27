import React from 'react';
import { TechnicalGridOverlay } from '../components/TechnicalGridOverlay';
import { ArrowRight, Film, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';

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
  return (
    <section
      id="hero"
      className="relative w-full h-[90vh] min-h-[600px] max-h-[900px] bg-[#07090B] overflow-hidden select-none flex items-center"
    >
      {/* Sleek Dark Industrial Engineering Backdrop (Clean & Static) */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#0B0F15] via-[#07090B] to-[#040507]">
        {/* Subtle Radial Atmosphere */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-precision-blue/10 blur-[160px] rounded-full pointer-events-none" />
      </div>

      {/* CAD Grid Overlay */}
      <TechnicalGridOverlay />

      {/* Corner Shield */}
      <div className="absolute bottom-0 right-0 w-44 h-32 bg-gradient-to-tl from-[#07090B] via-[#07090B]/60 to-transparent pointer-events-none z-10" />

      {/* Main Foreground Content Layer */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 md:px-16 flex flex-col justify-center">
        
        {/* Animated Badge Linking to Coming Soon Page */}
        <div className="mb-6 flex items-center">
          <button
            onClick={onViewAnimationSoon}
            className="group inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-precision-blue/10 hover:bg-precision-blue/20 border border-precision-blue/30 text-sky-300 text-xs font-mono font-bold transition-all shadow-sm cursor-pointer"
          >
            <Film className="w-3.5 h-3.5 text-precision-blue animate-pulse" />
            <span>3D CINEMATIC ANIMATION // GOING LIVE SOON</span>
            <ChevronRight className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Clean, Bold, High-Contrast Editorial Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[0.95] mb-6 font-display max-w-4xl drop-shadow-2xl">
          PRECISION CARBIDE. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-white to-blue-400">
            BUILT TO CUT.
          </span>
        </h1>

        {/* Crisp Subtitle */}
        <p className="text-base sm:text-lg text-steel-300 max-w-2xl leading-relaxed mb-8">
          High-performance modular crown drills, deep-hole BTA tooling, and precision solid carbide systems engineered for demanding industrial machining environments.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center space-x-3 px-7 py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,102,255,0.6)] group cursor-pointer"
          >
            <span>EXPLORE 11 PRODUCT CATEGORIES</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>

          {onViewAnimationSoon && (
            <button
              onClick={onViewAnimationSoon}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-mono transition-all font-bold shadow-md cursor-pointer backdrop-blur-md"
            >
              <Film className="w-4 h-4 text-sky-400" />
              <span>ANIMATION TEASER</span>
            </button>
          )}

          {onOpenEnquiry && (
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-mono transition-all font-bold shadow-lg cursor-pointer"
            >
              <span>REQUEST QUOTE</span>
            </button>
          )}
        </div>

        {/* Micro Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-6 border-t border-white/10 max-w-3xl font-mono text-xs">
          <div>
            <div className="text-[10px] text-steel-400 font-semibold uppercase">MACHINING ACCURACY</div>
            <div className="text-white font-bold mt-0.5">±0.002 mm Grinding</div>
          </div>
          <div>
            <div className="text-[10px] text-steel-400 font-semibold uppercase">CARBIDE HARDNESS</div>
            <div className="text-sky-400 font-bold mt-0.5">Up to 93 HRA</div>
          </div>
          <div>
            <div className="text-[10px] text-steel-400 font-semibold uppercase">FACILITY LOCATION</div>
            <div className="text-white font-bold mt-0.5">Makarpura, Vadodara</div>
          </div>
          <div>
            <div className="text-[10px] text-steel-400 font-semibold uppercase">DISPATCH SLA</div>
            <div className="text-emerald-400 font-bold mt-0.5">24–48 Hours</div>
          </div>
        </div>

      </div>
    </section>
  );
};
