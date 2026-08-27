import React, { useState } from 'react';
import { applicationProfiles, ApplicationProfile } from '../data/applicationsData';
import { Factory, ShieldCheck, ArrowRight, Cog, Flame, Cpu, CheckCircle2 } from 'lucide-react';

interface ApplicationsProps {
  onOpenEnquiry: (industryName?: string) => void;
  onOpenCatalogueWithCategory?: (categorySlug: string) => void;
}

export const Applications: React.FC<ApplicationsProps> = ({
  onOpenEnquiry,
  onOpenCatalogueWithCategory
}) => {
  const [activeTab, setActiveTab] = useState<string>(applicationProfiles[0].id);

  const activeApp = applicationProfiles.find(a => a.id === activeTab) || applicationProfiles[0];

  return (
    <section id="applications" className="relative w-full py-32 bg-slate-50 dark:bg-[#07090B] border-t border-slate-200 dark:border-white/5">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
                REAL-WORLD MANUFACTURING ENVIRONMENTS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tightest text-slate-900 dark:text-white leading-none">
              PRECISION, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                APPLIED.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm sm:text-base text-slate-600 dark:text-steel-400 max-w-md leading-relaxed">
            Our precision tooling is engineered for the highest-stress manufacturing environments—where tool deflection, thermal shock, or micro-chipping can halt continuous production schedules.
          </p>
        </div>

        {/* 4 Environmental Industry Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-12">
          {applicationProfiles.map((app) => {
            const isActive = app.id === activeTab;
            return (
              <button
                key={app.id}
                onClick={() => setActiveTab(app.id)}
                className={`p-4 sm:p-6 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isActive
                    ? 'bg-white dark:bg-[#0D1115] border-precision-blue shadow-md dark:shadow-[0_0_25px_rgba(0,102,255,0.25)]'
                    : 'bg-slate-100/80 dark:bg-[#0D1115]/50 border-slate-200 dark:border-white/10 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="text-[9px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest mb-2 font-bold">
                  {app.category}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-2">
                  {app.title}
                </div>
                <div className="text-xs font-mono text-precision-blue font-bold">
                  {app.cycleTimeGain}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Deep-Dive Card */}
        <div className="rounded-2xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/15 p-6 sm:p-10 mb-20 shadow-md dark:shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Context, Challenges, Solution */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-cad text-precision-blue px-3 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 font-semibold">
                <Factory className="w-3.5 h-3.5" />
                <span>ENVIRONMENT // {activeApp.title.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2">
                {activeApp.title}
              </h3>
              <div className="text-xs font-mono text-precision-blue mb-4 font-semibold">
                {activeApp.subtitle}
              </div>

              <p className="text-sm text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                {activeApp.description}
              </p>

              {/* Challenges vs Solution */}
              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2 flex items-center space-x-1.5 font-bold">
                    <Flame className="w-3.5 h-3.5" />
                    <span>KEY MACHINING CHALLENGES</span>
                  </div>
                  <ul className="text-xs text-slate-700 dark:text-steel-300 space-y-1.5">
                    {activeApp.challenges.map((c, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-precision-blue/10 border border-precision-blue/30">
                  <div className="text-[10px] font-mono text-precision-blue uppercase tracking-widest mb-1 flex items-center space-x-1.5 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-precision-blue" />
                    <span>JIAN TOOLS ENGINEERING SOLUTION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-steel-200 leading-relaxed">
                    {activeApp.jianSolution}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenEnquiry(activeApp.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                >
                  <span>CONSULT APPLICATION ENGINEER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Key Tooling Used & Machine Platforms */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              
              {/* Product Preview Stage */}
              <div className="h-48 sm:h-56 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={activeApp.environmentImage}
                  alt={activeApp.title}
                  className="h-full object-contain filter contrast-125 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Tooling Range in this application */}
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10">
                <div className="text-xs font-mono text-slate-500 dark:text-steel-400 uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                  <Cpu className="w-4 h-4 text-precision-blue" />
                  <span>PRIMARY JIAN TOOLING USED</span>
                </div>
                <div className="space-y-1.5">
                  {activeApp.toolingUsed.map((tool, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-xs font-mono text-slate-800 dark:text-steel-200 flex items-center space-x-2 shadow-sm font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-precision-blue shrink-0" />
                      <span>{tool}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Machine Platforms */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs font-mono">
                <div className="text-slate-400 dark:text-steel-500 uppercase text-[9px] mb-2 font-semibold">
                  TARGET MACHINE PLATFORMS
                </div>
                <div className="text-slate-900 dark:text-white font-bold">
                  {activeApp.machines.join(' • ')}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
