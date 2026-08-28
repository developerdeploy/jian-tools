import React, { useState, useRef, useEffect } from 'react';
import { modularDrillVariations } from '../data/modularDrillData';
import {
  Lock,
  Unlock,
  Rotate3d,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Layers
} from 'lucide-react';

interface ModularCrownAssemblyProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const ModularCrownAssembly: React.FC<ModularCrownAssemblyProps> = ({ onOpenEnquiry }) => {
  const [selectedDepthIndex, setSelectedDepthIndex] = useState<number>(2); // Default to 3D
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'official-drill' | 'all-12-lineup'>('official-drill');
  
  // 360° 3D Interactive Rotation State
  const [rotationY, setRotationY] = useState<number>(0);
  const [rotationX, setRotationX] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const startRotRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const activeDrill = modularDrillVariations[selectedDepthIndex];
  const depthMultiplier = activeDrill.depthMultiplier;

  // Auto-spin animation loop
  useEffect(() => {
    if (!isAutoSpinning || isDragging || activeTab !== 'official-drill' || isExploded) return;
    const interval = setInterval(() => {
      setRotationY((prev) => (prev + 1.0) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isAutoSpinning, isDragging, activeTab, isExploded]);

  // Drag handlers for 3D interaction
  const handleMouseDown = (e: React.MouseEvent) => {
    if (activeTab !== 'official-drill' || isExploded) return;
    setIsDragging(true);
    setIsAutoSpinning(false);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    startRotRef.current = { x: rotationX, y: rotationY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    setRotationY((startRotRef.current.y + deltaX * 0.7 + 3600) % 360);
    setRotationX(Math.max(-20, Math.min(20, startRotRef.current.x - deltaY * 0.4)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activeTab !== 'official-drill' || isExploded) return;
    setIsDragging(true);
    setIsAutoSpinning(false);
    dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    startRotRef.current = { x: rotationX, y: rotationY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartRef.current.x;
    const deltaY = e.touches[0].clientY - dragStartRef.current.y;
    
    setRotationY((startRotRef.current.y + deltaX * 0.7 + 3600) % 360);
    setRotationX(Math.max(-20, Math.min(20, startRotRef.current.x - deltaY * 0.4)));
  };

  const roundedDegrees = Math.round(rotationY);
  const officialTransparentSrc = `/assets/images/modular-drills/official/transparent/${depthMultiplier}D.webp`;

  return (
    <section
      id="modular-drilling"
      className="relative w-full py-24 bg-[#F3F3F1] dark:bg-[#080A0C] border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden"
    >
      {/* Subtle CAD Grid Backdrop */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-6 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
                02 / MODULAR DRILLING SYSTEM (1D – 12D)
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080A0C] dark:text-white leading-none font-display">
              MODULAR DRILLING. <br />
              <span className="text-[#64748B] dark:text-[#94A3B8]">PRECISION & SPEED.</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <button
              onClick={() => {
                setIsExploded(!isExploded);
                setActiveTab('official-drill');
              }}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors border cursor-pointer ${
                isExploded
                  ? 'bg-precision-blue text-white border-precision-blue'
                  : 'bg-white dark:bg-[#111417] text-[#080A0C] dark:text-white border-black/[0.1] dark:border-white/[0.1] hover:border-precision-blue'
              }`}
            >
              {isExploded ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>LOCK ASSEMBLY</span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5" />
                  <span>EXPLODE CROWN HEAD</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1D to 12D Step Selector */}
        <div className="mb-6">
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
            {modularDrillVariations.map((drill, idx) => {
              const isSelected = idx === selectedDepthIndex;
              return (
                <button
                  key={drill.depthRatio}
                  onClick={() => {
                    setSelectedDepthIndex(idx);
                    setActiveTab('official-drill');
                    setIsExploded(false);
                    setRotationY(0);
                    setRotationX(0);
                  }}
                  className={`py-2 px-1 rounded-lg text-xs font-mono font-medium transition-all flex flex-col items-center justify-center border cursor-pointer ${
                    isSelected
                      ? 'bg-precision-blue text-white border-precision-blue shadow-sm'
                      : 'bg-white dark:bg-[#111417] text-[#64748B] dark:text-[#94A3B8] border-black/[0.08] dark:border-white/[0.08] hover:border-black/[0.2] dark:hover:border-white/[0.2] hover:text-[#080A0C] dark:hover:text-white'
                  }`}
                >
                  <span className="font-bold">{drill.depthRatio}</span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#64748B]'}`}>
                    {drill.depthMultiplier}D
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage & Parameters Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Official Drill High-Resolution CAD Stage */}
          <div className="lg:col-span-7 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 flex flex-col justify-between relative overflow-hidden select-none min-h-[500px]">
            
            {/* Top Coordinate Header */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] border-b border-black/[0.06] dark:border-white/[0.06] pb-3 mb-2">
              <span className="font-medium uppercase">
                SPECIMEN: JIAN.DRILL_{depthMultiplier}D // {activeDrill.maxHoleDepth}
              </span>
              
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[#080A0C] dark:text-white font-bold">
                  {roundedDegrees}° ROTATION
                </span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  !isExploded
                    ? 'bg-black/[0.04] dark:bg-white/[0.04] text-[#080A0C] dark:text-white'
                    : 'bg-precision-blue text-white'
                }`}>
                  {!isExploded ? 'LOCKED' : 'EXPLODED'}
                </span>
              </div>
            </div>

            {/* Drill Canvas Display Stage */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className="relative w-full h-[360px] flex items-center justify-center my-2 overflow-hidden rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.04] dark:border-white/[0.04] p-4 cursor-grab active:cursor-grabbing group"
              style={{ perspective: 1200 }}
            >
              {isExploded ? (
                /* Exploded View */
                <div className="relative flex items-center justify-center h-full w-full animate-fade-in">
                  <img
                    src="/assets/images/modular-drills/modular-drill-exploded-3d.webp"
                    alt="Modular Crown Drill 3D Exploded Engineering CAD"
                    className="h-full max-w-full object-contain filter contrast-125 hover:scale-105 transition-transform duration-300"
                    draggable={false}
                  />

                  <div className="absolute top-3 right-3 p-2 rounded bg-black/85 backdrop-blur border border-white/10 text-white text-[10px] font-mono pointer-events-none">
                    <div className="text-precision-blue font-bold">140° CROWN HEAD // EXPLODED</div>
                    <div className="text-[#94A3B8] mt-0.5">Cam-Lock Head Replacement on Spindle</div>
                  </div>
                </div>
              ) : activeTab === 'all-12-lineup' ? (
                /* All 12 Official Drills Lineup */
                <div className="relative flex items-end justify-between h-full w-full overflow-x-auto space-x-2 px-2 py-4 animate-fade-in">
                  {modularDrillVariations.map((d) => (
                    <div
                      key={d.depthRatio}
                      onClick={() => {
                        setSelectedDepthIndex(d.depthMultiplier - 1);
                        setActiveTab('official-drill');
                      }}
                      className="flex flex-col items-center cursor-pointer group/item h-full justify-end hover:scale-105 transition-transform shrink-0"
                      style={{ width: '45px' }}
                    >
                      <img
                        src={`/assets/images/modular-drills/official/transparent/${d.depthMultiplier}D.webp`}
                        alt={`Drill ${d.depthRatio}`}
                        className="h-60 object-contain filter contrast-125 drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
                      />
                      <span className="text-[9px] font-mono font-bold text-[#080A0C] dark:text-[#94A3B8] mt-2">
                        {d.depthRatio}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Official Real Reference Drill with 3D Interaction */
                <div
                  className="relative flex items-center justify-center h-full w-full transition-transform duration-75 ease-out"
                  style={{
                    transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    key={activeDrill.depthRatio}
                    src={officialTransparentSrc}
                    alt={`Official JIAN Modular Crown Drill ${activeDrill.depthRatio}`}
                    className="h-full max-w-full object-contain filter contrast-120 drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                    draggable={false}
                  />
                </div>
              )}

              {/* Drag Prompt */}
              {!isExploded && activeTab === 'official-drill' && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-[#080A0C]/90 backdrop-blur text-white text-[10px] font-mono px-3 py-1 rounded-full pointer-events-none border border-white/10">
                  <Rotate3d className="w-3 h-3 text-precision-blue" />
                  <span>DRAG TO ROTATE // {activeDrill.depthRatio}</span>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-black/[0.06] dark:border-white/[0.06] text-xs font-mono">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#080A0C] dark:text-white transition-colors font-medium cursor-pointer"
                >
                  {isAutoSpinning ? (
                    <>
                      <Pause className="w-3 h-3 text-precision-blue" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-precision-blue" />
                      <span>AUTO-SPIN</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setRotationY(0);
                    setRotationX(0);
                  }}
                  className="p-1.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#64748B] dark:text-[#94A3B8] cursor-pointer"
                  title="Reset Angle"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center space-x-2 text-[10px] font-bold">
                <button
                  onClick={() => {
                    setActiveTab(activeTab === 'official-drill' ? 'all-12-lineup' : 'official-drill');
                    setIsExploded(false);
                  }}
                  className="px-3 py-1.5 rounded-md bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#080A0C] dark:text-white cursor-pointer"
                >
                  {activeTab === 'official-drill' ? 'VIEW ALL 12 BITS' : 'SINGLE BIT 3D'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Engineering Metrics */}
          <div className="lg:col-span-5 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono text-precision-blue font-bold tracking-widest uppercase mb-2">
                // SPECIFICATION METRICS
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#080A0C] dark:text-white mb-4 font-display">
                Replaceable Crown Cutting Geometry
              </h3>

              <div className="space-y-2.5 mb-6 font-mono text-xs">
                <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#64748B] dark:text-[#94A3B8]">Reach Ratio:</span>
                  <span className="font-bold text-[#080A0C] dark:text-white">{activeDrill.depthRatio} ({activeDrill.depthMultiplier}× Dia)</span>
                </div>

                <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#64748B] dark:text-[#94A3B8]">Diameter Range:</span>
                  <span className="font-bold text-[#080A0C] dark:text-white">{activeDrill.diameterRange}</span>
                </div>

                <div className="p-3 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#64748B] dark:text-[#94A3B8]">Coolant System:</span>
                  <span className="font-bold text-precision-blue">Dual Internal Ports</span>
                </div>
              </div>

              <div className="space-y-2.5 font-mono text-xs text-[#2D3748] dark:text-[#94A3B8]">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0" />
                  <span>Cam-lock head swap without resetting machine datums</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0" />
                  <span>Self-centering 140° crown tip prevents hole deflection</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0" />
                  <span>High-feed machining for boiler and tube-sheet stacks</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-black/[0.06] dark:border-white/[0.06]">
              <button
                onClick={() => onOpenEnquiry(`Modular Drill ${activeDrill.depthRatio}`)}
                className="w-full py-3 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer border border-blue-400/30"
              >
                REQUEST QUOTE FOR {activeDrill.depthRatio}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
