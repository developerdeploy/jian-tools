import React, { useState, useRef, useEffect } from 'react';
import { modularDrillVariations } from '../data/modularDrillData';
import {
  Maximize2,
  Lock,
  Unlock,
  Rotate3d,
  Play,
  Pause,
  Layers,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface ModularCrownAssemblyProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const ModularCrownAssembly: React.FC<ModularCrownAssemblyProps> = ({ onOpenEnquiry }) => {
  const [selectedDepthIndex, setSelectedDepthIndex] = useState<number>(2); // Default to 3D
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [showBlueprintModal, setShowBlueprintModal] = useState<boolean>(false);
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
      setRotationY((prev) => (prev + 1.2) % 360);
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
      className="relative w-full py-24 bg-slate-50 dark:bg-[#07090B] border-t border-slate-200 dark:border-white/10 overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Short & Punchy Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
                STRATEGIC MODULAR ARCHITECTURE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-none font-display">
              MODULAR DRILLING. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                PRECISION & SPEED.
              </span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => {
                setIsExploded(!isExploded);
                setActiveTab('official-drill');
              }}
              className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all shadow-md cursor-pointer ${
                !isExploded
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {!isExploded ? (
                <>
                  <Unlock className="w-4 h-4" />
                  <span>EXPLODE CROWN HEAD</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>LOCK ASSEMBLY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 1D to 12D Step Selector Buttons */}
        <div className="mb-6">
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
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
                  className={`py-2.5 px-1 rounded-xl text-xs font-mono font-bold transition-all duration-200 flex flex-col items-center justify-center border cursor-pointer ${
                    isSelected
                      ? 'bg-precision-blue text-white border-precision-blue shadow-[0_0_15px_rgba(0,102,255,0.5)] scale-105 z-10'
                      : 'bg-white dark:bg-[#0E1217] text-slate-700 dark:text-steel-300 border-slate-200 dark:border-white/10 hover:border-precision-blue hover:text-slate-900 dark:hover:text-white shadow-sm'
                  }`}
                >
                  <span>{drill.depthRatio}</span>
                  <span className={`text-[8px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-steel-500'}`}>
                    {drill.depthMultiplier}D
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage & Parameters Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Official Drill High-Resolution Stage */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm dark:shadow-2xl select-none min-h-[520px]">
            
            {/* Top Coordinate Header */}
            <div className="flex items-center justify-between text-[10px] font-mono mb-2">
              <span className="text-slate-600 dark:text-steel-400 uppercase font-bold">
                BIT SPECIMEN: JIAN.DRILL_{depthMultiplier}D // {activeDrill.maxHoleDepth}
              </span>
              
              <div className="flex items-center space-x-2">
                <span className="text-precision-blue font-bold px-2 py-0.5 rounded bg-precision-blue/10 border border-precision-blue/20">
                  ROTATION: {roundedDegrees}°
                </span>
                <span className={`font-bold px-2.5 py-0.5 rounded ${
                  !isExploded
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                }`}>
                  {!isExploded ? 'LOCKED' : 'EXPLODED'}
                </span>
              </div>
            </div>

            {/* Drill Canvas Display Stage with Studio Backlighting */}
            <div
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
              className="relative w-full h-[380px] flex items-center justify-center my-2 overflow-hidden rounded-xl bg-slate-100/80 dark:bg-gradient-to-b dark:from-[#11161D] dark:to-[#07090B] border border-slate-200 dark:border-white/10 p-6 cursor-grab active:cursor-grabbing group shadow-inner"
              style={{ perspective: 1200 }}
            >
              {/* Radial Backdrop Spotlight for Razor-Sharp Drill Definition */}
              <div className="absolute inset-0 bg-radial-gradient from-white/40 dark:from-white/10 via-transparent to-transparent pointer-events-none" />

              {isExploded ? (
                /* Exploded View */
                <div className="relative flex items-center justify-center h-full w-full animate-fade-in">
                  <img
                    src="/assets/images/modular-drills/modular-drill-exploded-3d.webp"
                    alt="Modular Crown Drill 3D Exploded Engineering CAD"
                    className="h-full max-w-full object-contain filter contrast-125 hover:scale-105 transition-transform duration-500"
                    draggable={false}
                  />

                  <div className="absolute top-4 right-4 p-2.5 rounded-lg bg-black/85 backdrop-blur border border-precision-blue text-white text-[10px] font-mono shadow-2xl pointer-events-none">
                    <div className="text-precision-blue font-bold">140° CROWN HEAD // EXPLODED</div>
                    <div className="text-slate-300 mt-0.5">Quick Head Replacement on Machine</div>
                  </div>
                </div>
              ) : activeTab === 'all-12-lineup' ? (
                /* All 12 Official Drills Lineup */
                <div className="relative flex items-end justify-between h-full w-full overflow-x-auto space-x-3 px-2 py-4 animate-fade-in">
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
                        className="h-64 object-contain filter contrast-125 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)]"
                      />
                      <span className="text-[9px] font-mono font-bold text-slate-700 dark:text-steel-300 mt-2">
                        {d.depthRatio}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                /* Official Real Reference Drill with 3D Interaction — Razor Sharp */
                <div
                  className="relative flex items-center justify-center h-full w-full transition-transform duration-100 ease-out"
                  style={{
                    transform: `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <img
                    key={activeDrill.depthRatio}
                    src={officialTransparentSrc}
                    alt={`Official JIAN Modular Crown Drill ${activeDrill.depthRatio}`}
                    className="h-full max-w-full object-contain filter contrast-120 drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] dark:drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] transition-all duration-300"
                    style={{ imageRendering: '-webkit-optimize-contrast' }}
                    draggable={false}
                  />
                </div>
              )}

              {/* Drag Prompt */}
              {!isExploded && activeTab === 'official-drill' && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-black/80 backdrop-blur text-white text-[10px] font-mono px-3.5 py-1.5 rounded-full pointer-events-none shadow-lg">
                  <Rotate3d className="w-3.5 h-3.5 text-precision-blue animate-spin" />
                  <span>DRAG TO ROTATE // {activeDrill.depthRatio} BIT</span>
                </div>
              )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5 text-xs font-mono">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white transition-colors font-bold cursor-pointer"
                >
                  {isAutoSpinning ? (
                    <>
                      <Pause className="w-3 h-3 text-precision-blue" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3 text-emerald-500" />
                      <span>AUTO-SPIN</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setRotationY(0);
                    setRotationX(0);
                  }}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 text-slate-700 dark:text-steel-300 cursor-pointer"
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
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white cursor-pointer"
                >
                  {activeTab === 'official-drill' ? 'VIEW ALL 12 BITS' : 'SINGLE BIT 3D'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Engineering Advantages */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-sm dark:shadow-2xl">
            <div>
              <div className="text-[10px] font-mono text-precision-blue font-bold tracking-widest uppercase mb-2">
                // SPECIFICATION METRICS
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 font-display">
                Replaceable Crown Cutting Geometry
              </h3>

              <div className="space-y-3 mb-6 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-steel-400">Drill Reach Ratio:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeDrill.depthRatio} ({activeDrill.depthMultiplier}× Dia)</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-steel-400">Diameter Range:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{activeDrill.diameterRange}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-steel-400">Coolant System:</span>
                  <span className="font-bold text-precision-blue">Dual Internal Ports</span>
                </div>
              </div>

              <div className="space-y-2 font-mono text-xs text-slate-700 dark:text-steel-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Cam-lock quick head swap without resetting machine datums</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Self-centering 140° crown tip prevents hole deflection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>High-feed machining for boiler and tube-sheet stacks</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/10">
              <button
                onClick={() => onOpenEnquiry(`Modular Drill ${activeDrill.depthRatio}`)}
                className="w-full py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
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
