import React from 'react';
import { HeroScene } from '../types';

interface SceneTextProps {
  scene: HeroScene;
  isActive: boolean;
  onExploreClick?: () => void;
}

export const SceneText: React.FC<SceneTextProps> = ({
  scene,
  isActive,
  onExploreClick
}) => {
  return (
    <div
      className={`transition-all duration-700 ease-out transform ${
        isActive
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-6 pointer-events-none absolute inset-0'
      }`}
    >
      <div className="max-w-xl">
        {/* Technical Eyebrow / Scene Label */}
        <div className="flex items-center space-x-3 mb-4">
          <span className="w-8 h-px bg-slate-400 dark:bg-white/40" />
          <span className="text-[11px] font-mono font-semibold tracking-cad text-slate-600 dark:text-steel-300 uppercase">
            {scene.label}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-precision-blue dark:text-precision-cyan/90 font-semibold">
            CAD REV.0{scene.id}
          </span>
        </div>

        {/* Hero Title */}
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tightest text-slate-900 dark:text-white leading-[0.95] mb-4">
          {scene.title}
        </h2>

        {/* Technical Badge */}
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-wider px-2.5 py-1 rounded bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300 mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-precision-blue" />
          <span className="font-semibold">{scene.technicalBadge}</span>
        </div>

        {/* Description Copy */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-steel-400 font-normal leading-relaxed mb-6 max-w-lg">
          {scene.description}
        </p>

        {/* Technical Metrology Specs (CAD Cards) */}
        {scene.specs && scene.specs.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-6 max-w-md">
            {scene.specs.map((spec, idx) => (
              <div
                key={idx}
                className="px-3 py-2 rounded border border-slate-200 dark:border-white/5 bg-white/90 dark:bg-[#0D1115]/60 shadow-sm"
              >
                <div className="text-[9px] font-mono text-slate-500 dark:text-steel-500 uppercase tracking-widest">
                  {spec.label}
                </div>
                <div className="text-xs font-mono font-bold text-slate-900 dark:text-steel-100 mt-0.5">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Scene 07 Result CTA */}
        {scene.id === 7 && (
          <div className="pt-2">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center space-x-3 px-6 py-3.5 rounded bg-precision-blue hover:bg-blue-600 text-white text-xs font-semibold tracking-loose uppercase transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(0,102,255,0.5)] border border-blue-400/30 group"
            >
              <span>EXPLORE OUR TOOLS</span>
              <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
