import React from 'react';
import { whyPillars } from '../data/whyJianTools';
import { ShieldCheck, BadgePercent, Truck, Users, Headphones, CheckCircle2 } from 'lucide-react';

export const WhyJianTools: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-5 h-5 text-precision-blue" />,
    BadgePercent: <BadgePercent className="w-5 h-5 text-precision-blue" />,
    Truck: <Truck className="w-5 h-5 text-precision-blue" />,
    Users: <Users className="w-5 h-5 text-precision-blue" />,
    Headphones: <Headphones className="w-5 h-5 text-precision-blue" />
  };

  return (
    <section id="why-jian-tools" className="relative w-full py-32 bg-slate-100 dark:bg-[#050608] border-t border-slate-200 dark:border-white/10">
      {/* CAD Grid Background */}
      <div className="absolute inset-0 bg-cad-grid-dense opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-cad text-precision-blue px-3 py-1 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 shadow-sm font-semibold">
            <span>BRAND REASONING</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tightest text-slate-900 dark:text-white leading-tight mb-6">
            BUILT AROUND <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
              WHAT MATTERS.
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-steel-400 leading-relaxed max-w-2xl mx-auto">
            The foundation of our engineering: repeatable micron-level tool accuracy, direct manufacturer economics, and rapid dispatch from the industrial heart of Gujarat.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {whyPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative rounded-2xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/10 hover:border-precision-blue/40 transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Top Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-steel-500 group-hover:text-precision-blue transition-colors">
                    PILLAR {pillar.number} //
                  </span>
                  <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 group-hover:border-precision-blue/30 group-hover:bg-precision-blue/10 transition-colors">
                    {iconMap[pillar.icon]}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-precision-blue transition-colors mb-2">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono text-precision-blue mb-4 font-semibold">
                  {pillar.subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-steel-400 leading-relaxed mb-6">
                  {pillar.description}
                </p>
              </div>

              {/* Metrics Box */}
              <div className="border-t border-slate-100 dark:border-white/5 pt-4 space-y-2 font-mono text-xs">
                {pillar.metrics.map((m, idx) => (
                  <div key={idx} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-steel-500 uppercase">{m.label}</span>
                    <span className="text-slate-900 dark:text-steel-200 font-bold">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Quick Engineering Advantage Card */}
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-white to-slate-50 dark:from-precision-blue/20 dark:via-[#0D1115] dark:to-[#07090B] border border-precision-blue/30 dark:border-precision-blue/40 p-6 sm:p-8 flex flex-col justify-between shadow-sm">
            <div>
              <div className="text-xs font-mono text-precision-blue font-bold mb-4">
                THE JIAN PROMISE //
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                Precision Ground. Verified Performance.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                Whether you require high-rigidity modular drills, scarfing inserts, deep-hole tubes or custom tooling, JIAN TOOLS delivers tested industrial cutting performance.
              </p>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-steel-300 font-semibold">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-precision-blue" />
                <span>DIN 6535 Shank Standards</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-precision-blue" />
                <span>100% Optical Metrology Inspection</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-precision-blue" />
                <span>Express Dispatch from Vadodara Hub</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
