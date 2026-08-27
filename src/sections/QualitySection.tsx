import React from 'react';
import { ShieldCheck, Eye, Sparkles, CheckCircle2, Award } from 'lucide-react';

export const QualitySection: React.FC = () => {
  const qualityPillars = [
    {
      title: 'Sub-Micron Grain Substrate',
      subtitle: 'Virgin Tungsten Carbide',
      desc: 'Uniform cobalt binder distribution and ultrafine carbide grains (0.4–0.8 µm) deliver extreme edge strength and fracture toughness.',
      badge: 'MATERIAL INTEGRITY'
    },
    {
      title: 'Precision Ground Cutting Geometry',
      subtitle: 'DIN 6535 Form HA / HE',
      desc: 'Micro-honed cutting edges and mirror-polished flute surfaces minimize cutting friction, prevent built-up edge, and lower spindle loads.',
      badge: 'EDGE METROLOGY'
    },
    {
      title: 'Advanced Nano-Coatings',
      subtitle: 'AlTiN / TiSiN Multi-Layers',
      desc: 'High-temperature physical vapor deposition nano-coatings provide oxidation resistance up to 1100°C for dry and high-speed machining.',
      badge: 'SURFACE FINISH'
    },
    {
      title: '100% Contactless Optical Inspection',
      subtitle: 'Sub-Micron Runout Verification',
      desc: 'Every tool profile, diameter tolerance, and shank concentricity is verified with non-contact optical metrology prior to dispatch.',
      badge: 'QUALITY RESULT'
    }
  ];

  return (
    <section className="relative w-full py-32 bg-slate-100 dark:bg-[#050608] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* CAD Grid Background */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-cad text-precision-blue px-3 py-1 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 shadow-sm font-semibold">
            <Award className="w-3.5 h-3.5 text-precision-blue" />
            <span>ENGINEERING VERIFICATION</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tightest text-slate-900 dark:text-white leading-tight mb-6">
            PRECISION ISN'T A CLAIM. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
              IT'S THE RESULT.
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-steel-400 leading-relaxed max-w-2xl mx-auto">
            Real industrial performance is measured on the machine: in micron-level bore roundness, mirror surface finishes, and consistent tool life across continuous production runs.
          </p>
        </div>

        {/* 4 Quality Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {qualityPillars.map((q, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/10 hover:border-precision-blue/40 transition-all duration-300 shadow-sm hover:shadow-xl dark:shadow-xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-precision-blue font-bold">0{idx + 1} //</span>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300 font-bold">
                    {q.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{q.title}</h3>
                <div className="text-xs font-mono text-precision-blue mb-4 font-semibold">{q.subtitle}</div>
                <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed mb-6">{q.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center space-x-2 text-xs font-mono text-slate-700 dark:text-steel-300 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-precision-blue" />
                <span>Verified in Production</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
