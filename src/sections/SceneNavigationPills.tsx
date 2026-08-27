import React from 'react';
import { HeroScene } from '../types';

interface SceneNavigationPillsProps {
  scenes: HeroScene[];
  activeSceneIndex: number;
  onSelectScene: (index: number) => void;
}

export const SceneNavigationPills: React.FC<SceneNavigationPillsProps> = ({
  scenes,
  activeSceneIndex,
  onSelectScene
}) => {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-end space-y-3 pointer-events-auto select-none">
      <div className="text-[9px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest mb-1 rotate-90 origin-right translate-x-3">
        STAGE
      </div>
      {scenes.map((scene, idx) => {
        const isActive = idx === activeSceneIndex;
        return (
          <button
            key={scene.id}
            onClick={() => onSelectScene(idx)}
            className="group flex items-center space-x-3 py-1 cursor-pointer focus:outline-none transition-all duration-300"
            aria-label={`Jump to scene 0${scene.id}: ${scene.title}`}
          >
            {/* Tooltip on hover */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[10px] font-mono tracking-wider text-slate-700 dark:text-steel-300 bg-white/95 dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/10 px-2 py-0.5 rounded shadow-lg whitespace-nowrap">
              {scene.label}
            </span>

            {/* Stage Number & Indicator Line */}
            <div className="flex items-center space-x-2">
              <span
                className={`text-[10px] font-mono transition-all duration-300 ${
                  isActive
                    ? 'text-slate-900 dark:text-white font-bold scale-110'
                    : 'text-slate-400 dark:text-steel-500 group-hover:text-slate-700 dark:group-hover:text-steel-300'
                }`}
              >
                0{scene.id}
              </span>
              <span
                className={`transition-all duration-500 rounded-full ${
                  isActive
                    ? 'w-6 h-1 bg-precision-blue shadow-[0_0_8px_rgba(0,102,255,0.8)]'
                    : 'w-2 h-0.5 bg-slate-300 dark:bg-white/20 group-hover:bg-slate-500 dark:group-hover:bg-white/50'
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
};
