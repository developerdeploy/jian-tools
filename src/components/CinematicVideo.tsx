import React, { useRef, useEffect, useState } from 'react';
import { HeroScene } from '../types';

interface CinematicVideoProps {
  scene: HeroScene;
  isActive: boolean;
  isPreloadTarget: boolean; // Active or immediate next
  isMobile: boolean;
  opacity: number;
}

export const CinematicVideo: React.FC<CinematicVideoProps> = ({
  scene,
  isActive,
  isPreloadTarget,
  isMobile,
  opacity
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const videoSource = isMobile ? scene.mobileVideo : scene.desktopVideo;

  // Strict Playback and Preload Controller
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      // Ensure video is set to play when active
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy or pause race condition handled silently
          console.debug(`Scene ${scene.id} play paused/fallback:`, err.name);
        });
      }
    } else {
      // Pause immediately when not active to free GPU and decoder pipelines
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isActive, scene.id]);

  // Video Ready Handler
  const handleCanPlay = () => {
    setIsVideoReady(true);
  };

  const handleError = () => {
    setHasError(true);
    console.warn(`Video load error for scene ${scene.id}: ${videoSource}`);
  };

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700 ease-out overflow-hidden"
      style={{
        opacity: opacity,
        visibility: opacity > 0.01 ? 'visible' : 'hidden',
        zIndex: isActive ? 10 : 5
      }}
    >
      {/* High-Resolution Poster Frame (Always renders instantly for zero layout shift) */}
      <img
        src={scene.poster}
        alt={scene.title}
        className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-opacity duration-1000 ${
          isVideoReady && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
        loading={scene.id <= 2 ? "eager" : "lazy"}
      />

      {/* HTML5 Cinematic Video Element (Only rendered or preloaded when needed) */}
      {(isPreloadTarget || isActive) && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-contain md:object-cover object-center transition-opacity duration-700 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          src={videoSource}
          poster={scene.poster}
          muted
          playsInline
          loop
          preload={isActive ? "auto" : "metadata"}
          onCanPlay={handleCanPlay}
          onError={handleError}
        />
      )}

      {/* Atmospheric Cinematic Gradients for Rich Visual Depth */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07090B] via-transparent to-[#07090B]/60 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#07090B]/80 via-transparent to-[#07090B]/80 pointer-events-none" />
    </div>
  );
};
