import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFadingOut(true), 200);
          setTimeout(() => onComplete(), 700);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07090B] dark:bg-[#07090B] light:bg-[#F8FAFC] transition-opacity duration-500 pointer-events-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center max-w-xs w-full px-6">
        
        {/* Brand Wordmark */}
        <div className="flex items-center space-x-2.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-precision-blue shadow-[0_0_10px_rgba(0,102,255,0.8)]" />
          <span className="text-base sm:text-lg font-black tracking-technical text-white dark:text-white light:text-slate-900 uppercase">
            JIAN TOOLS
          </span>
        </div>

        {/* Thin Precision Progress Line */}
        <div className="w-48 h-px bg-white/10 dark:bg-white/10 light:bg-slate-300 relative overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-precision-blue via-white to-sky-400 dark:from-precision-blue dark:via-white dark:to-sky-400 light:from-precision-blue light:via-sky-600 light:to-precision-blue transition-all duration-200 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        {/* Progress Metadata */}
        <div className="flex items-center justify-between w-48 text-[9px] font-mono text-steel-500 dark:text-steel-500 light:text-slate-500 uppercase tracking-widest">
          <span>PRECISION SYS</span>
          <span>{Math.min(100, progress)}%</span>
        </div>

      </div>
    </div>
  );
};
