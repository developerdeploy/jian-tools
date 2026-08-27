import React from 'react';
import { Play, Sparkles, Clock, ArrowLeft, ArrowRight, ShieldCheck, Film, Cpu, Layers } from 'lucide-react';
import { companyContactDetails } from '../data/whyJianTools';

interface AnimationComingSoonPageProps {
  onBackToHome: () => void;
  onNavigateProducts: () => void;
  onOpenEnquiry: () => void;
}

export const AnimationComingSoonPage: React.FC<AnimationComingSoonPageProps> = ({
  onBackToHome,
  onNavigateProducts,
  onOpenEnquiry
}) => {
  return (
    <div className="w-full pt-28 pb-24 bg-slate-50 dark:bg-[#07090B] min-h-screen text-slate-800 dark:text-steel-200 transition-colors duration-300">
      
      {/* CAD Background Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Back Button */}
        <div className="mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-steel-400 hover:text-precision-blue dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </button>
        </div>

        {/* Hero Card Container */}
        <div className="rounded-3xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-8 sm:p-14 shadow-xl dark:shadow-2xl relative overflow-hidden text-center">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-precision-blue/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-precision-blue/10 border border-precision-blue/30 text-precision-blue text-xs font-mono font-bold uppercase mb-8 shadow-sm">
            <Film className="w-3.5 h-3.5 animate-pulse" />
            <span>3D CINEMATIC MACHINING ANIMATION // GOING LIVE SOON</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[0.95] mb-6 font-display">
            HIGH-PRECISION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-precision-blue via-sky-400 to-blue-600 dark:from-sky-300 dark:via-white dark:to-precision-blue">
              ANIMATION LIVE SOON.
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-steel-300 max-w-2xl mx-auto leading-relaxed mb-10">
            We are currently rendering our full-physics 3D simulation of JIAN TOOLS modular crown drills penetrating heavy heat exchanger tube sheets, multi-axis chip evacuation, and submicron tool metrology.
          </p>

          {/* 3 Teaser Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 text-left">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
              <div className="w-8 h-8 rounded-lg bg-precision-blue/10 text-precision-blue flex items-center justify-center mb-3">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Physics-Accurate Machining
              </h4>
              <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
                Real-time 140° chisel contact, spindle torque dynamics, and internal coolant discharge under pressure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
              <div className="w-8 h-8 rounded-lg bg-precision-blue/10 text-precision-blue flex items-center justify-center mb-3">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Tube-Sheet Baffle Penetration
              </h4>
              <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
                Seamless multi-layer baffle stack drilling sequence showing zero hole wander and H7 bore accuracy.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
              <div className="w-8 h-8 rounded-lg bg-precision-blue/10 text-precision-blue flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                Interactive 360° CAD Orbit
              </h4>
              <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">
                Full user-controlled camera orbiting with exploded cam-lock cutting head assembly mechanisms.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onNavigateProducts}
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,102,255,0.4)] cursor-pointer"
            >
              <span>EXPLORE 11 PRODUCT CATEGORIES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/917984876123?text=${encodeURIComponent('Hello JIAN TOOLS, please notify me when your 3D Machining Animation goes live!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              <span>GET NOTIFIED ON WHATSAPP</span>
            </a>
          </div>

          {/* Footer note */}
          <div className="mt-10 pt-6 border-t border-slate-100 dark:border-white/5 text-[11px] font-mono text-slate-400 dark:text-steel-500">
            JIAN TOOLS PRECISION ENGINEERING LAB // VADODARA, GUJARAT, INDIA
          </div>

        </div>

      </div>
    </div>
  );
};
