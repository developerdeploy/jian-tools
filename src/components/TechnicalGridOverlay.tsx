import React from 'react';

interface TechnicalGridOverlayProps {
  activeSceneIndex?: number;
  totalScenes?: number;
}

export const TechnicalGridOverlay: React.FC<TechnicalGridOverlayProps> = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Subtle Ambient CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 dark:opacity-20" />

      {/* Subtle Corner Markers without text */}
      <div className="absolute top-20 left-6 md:left-10 w-3 h-3 border-t border-l border-slate-300/30 dark:border-white/10" />
      <div className="absolute top-20 right-6 md:right-10 w-3 h-3 border-t border-r border-slate-300/30 dark:border-white/10" />
      <div className="absolute bottom-16 left-6 md:left-10 w-3 h-3 border-b border-l border-slate-300/30 dark:border-white/10" />
      <div className="absolute bottom-16 right-6 md:right-10 w-3 h-3 border-b border-r border-slate-300/30 dark:border-white/10" />
    </div>
  );
};
