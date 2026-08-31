import React, { useRef } from 'react';
import { ArrowRight, Film } from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      // Loop the video 8 seconds before it actually ends to hide the 'coming soon' text
      if (videoRef.current.currentTime >= videoRef.current.duration - 8.0) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };
  return (
    <section
      id="hero"
      className="relative w-full min-h-[85vh] lg:min-h-[880px] bg-[#0a0a0a] text-white overflow-hidden flex items-center pt-24 pb-16"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/hero-bg.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-3xl flex flex-col justify-center">
          
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-tight text-white mb-6 font-display">
            Precision Modular Drilling Solutions for Heat Exchangers & Structural Steel
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl leading-relaxed mb-10">
            High-performance modular drilling systems engineered for accurate, efficient and economical hole making in tube sheets, plates, flanges and structural components.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onExploreClick}
              className="inline-flex items-center space-x-2 px-6 py-4 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-base font-medium transition-colors shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {onOpenEnquiry && (
              <button
                onClick={() => onOpenEnquiry()}
                className="px-6 py-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-base font-medium backdrop-blur-sm transition-colors border border-white/10 cursor-pointer"
              >
                Request Quote
              </button>
            )}
          </div>

          {/* Single spec */}
          <div className="pt-6 border-t border-white/20 inline-block">
            <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-1">Machine Accuracy</div>
            <div className="text-xl text-white font-semibold font-mono">± 0.020 mm</div>
          </div>

        </div>
      </div>
    </section>
  );
};
