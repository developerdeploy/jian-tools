import React, { useState } from 'react';
import { modularDrillVariations, modularDrillFeatures } from '../data/modularDrillData';
import { Sliders, Maximize2, ShieldCheck, Droplets, Gauge } from 'lucide-react';

interface ModularDrillingProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const ModularDrilling: React.FC<ModularDrillingProps> = ({ onOpenEnquiry }) => {
  const [selectedDepthIndex, setSelectedDepthIndex] = useState<number>(2); // Default to 3D
  const [showBlueprintModal, setShowBlueprintModal] = useState<boolean>(false);

  const activeDrill = modularDrillVariations[selectedDepthIndex];

  return (
    <section id="modular-drilling" className="relative w-full py-32 bg-slate-100 dark:bg-[#050608] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid-dense opacity-20 pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-precision-blue/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-semibold tracking-cad text-precision-blue uppercase">
                CORE INNOVATION // HIGH L/D RATIO
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tightest text-slate-900 dark:text-white leading-none">
              MODULAR DRILLING. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                1D — 12D DEPTHS.
              </span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <button
              onClick={() => setShowBlueprintModal(true)}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/15 text-xs font-mono text-slate-800 dark:text-steel-200 transition-all hover:border-precision-blue shadow-sm font-semibold"
            >
              <Maximize2 className="w-3.5 h-3.5 text-precision-blue" />
              <span>VIEW 3D MODELING REFERENCE</span>
            </button>
          </div>
        </div>

        {/* Interactive 1D to 12D Depth Selector Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-steel-400 mb-3">
            <span className="flex items-center space-x-2 font-semibold">
              <Sliders className="w-3.5 h-3.5 text-precision-blue" />
              <span>SELECT HOLE DEPTH MULTIPLIER (L1 = n × D):</span>
            </span>
            <span className="text-precision-blue font-bold">
              ACTIVE RATIO: {activeDrill.depthRatio} ({activeDrill.depthMultiplier}× DIAMETER)
            </span>
          </div>

          {/* 1D to 12D Step Buttons */}
          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {modularDrillVariations.map((drill, idx) => {
              const isSelected = idx === selectedDepthIndex;
              return (
                <button
                  key={drill.depthRatio}
                  onClick={() => setSelectedDepthIndex(idx)}
                  className={`py-3 px-1 rounded-lg text-xs font-mono font-bold transition-all duration-300 flex flex-col items-center justify-center border ${
                    isSelected
                      ? 'bg-precision-blue text-white border-blue-400 shadow-[0_0_20px_rgba(0,102,255,0.6)] scale-105 z-10'
                      : 'bg-white dark:bg-[#0D1115]/90 text-slate-600 dark:text-steel-400 border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 hover:text-slate-900 dark:hover:text-white shadow-sm'
                  }`}
                >
                  <span>{drill.depthRatio}</span>
                  <span className={`text-[8px] mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-400 dark:text-steel-600'}`}>
                    {drill.depthMultiplier}D
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Interactive Stage: Blueprint Card & Drill Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          
          {/* Left Column: 3D CAD Drill Interactive Display */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/15 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-md dark:shadow-2xl">
            {/* Background Reticles & Crosshairs */}
            <div className="absolute top-4 left-4 text-[9px] font-mono text-slate-400 dark:text-steel-600">
              SYS.GEOMETRY // BODY_DEPTH: {activeDrill.depthRatio}
            </div>
            <div className="absolute top-4 right-4 text-[9px] font-mono text-precision-blue font-bold">
              RIGIDITY: {activeDrill.rigidityIndex}
            </div>

            {/* Visual Drill Display */}
            <div className="relative w-full h-80 sm:h-96 flex items-center justify-center my-4 overflow-hidden rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/5 p-4">
              <img
                src={activeDrill.image}
                alt={`JIAN Modular Drill ${activeDrill.depthRatio}`}
                className="h-full max-w-full object-contain filter contrast-125 transition-all duration-500 transform hover:scale-105"
              />

              {/* Dynamic CAD Dimension Rulers */}
              <div className="absolute left-6 top-8 bottom-8 flex flex-col justify-between items-center text-[10px] font-mono text-slate-400 pointer-events-none">
                <div className="w-4 border-t border-precision-blue" />
                <div className="h-full border-l border-dashed border-precision-blue/40 my-1 flex items-center">
                  <span className="bg-white dark:bg-[#0D1115] px-1 -rotate-90 whitespace-nowrap text-[9px] text-precision-blue font-bold">
                    L1 = {activeDrill.depthRatio} × D
                  </span>
                </div>
                <div className="w-4 border-b border-precision-blue" />
              </div>
            </div>

            {/* Drill Specs Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-white/10 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-semibold">DIAMETER</div>
                <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeDrill.diameterRange}</div>
              </div>
              <div className="p-2.5 rounded bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-semibold">SHANK SIZE</div>
                <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeDrill.shankDiameter}</div>
              </div>
              <div className="p-2.5 rounded bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-semibold">COOLANT</div>
                <div className="text-precision-blue font-bold mt-0.5">Dual Internal</div>
              </div>
              <div className="p-2.5 rounded bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                <div className="text-[9px] text-slate-400 dark:text-steel-500 font-semibold">INSERT</div>
                <div className="text-amber-600 dark:text-precision-gold font-bold mt-0.5">TiN Indexable</div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Technical Parameters & Quote CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="rounded-2xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/15 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-precision-blue animate-pulse" />
                <span>MODULAR SYSTEM ARCHITECTURE</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-4">
                Parametric Drill Bodies with Indexable Heads
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                Engineered for maximum rigidity across long overhangs. The indexable design allows instant tip replacement on the machine without losing tool offsets, slashing machine idle time.
              </p>

              <div className="space-y-3 font-mono text-xs text-slate-700 dark:text-steel-300">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <span className="flex items-center space-x-2 text-slate-500 dark:text-steel-400">
                    <Gauge className="w-3.5 h-3.5 text-precision-blue" />
                    <span>Hole Depth Reach</span>
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold">{activeDrill.maxHoleDepth}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <span className="flex items-center space-x-2 text-slate-500 dark:text-steel-400">
                    <Droplets className="w-3.5 h-3.5 text-precision-blue" />
                    <span>Through-Coolant Spec</span>
                  </span>
                  <span className="text-precision-blue font-bold">{activeDrill.cooling}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/5">
                  <span className="flex items-center space-x-2 text-slate-500 dark:text-steel-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Core Flute Geometry</span>
                  </span>
                  <span className="text-slate-900 dark:text-white font-bold">{activeDrill.fluteDesign}</span>
                </div>
              </div>
            </div>

            {/* Quick Enquire for this Drill Depth */}
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1115]/75 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Need {activeDrill.depthRatio} Modular Drill Bodies?</div>
                <div className="text-xs text-slate-600 dark:text-steel-400">Ready stock available for standard diameters.</div>
              </div>
              <button
                onClick={() => onOpenEnquiry(`Modular Drill ${activeDrill.depthRatio}`)}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)] whitespace-nowrap"
              >
                REQUEST {activeDrill.depthRatio} QUOTE
              </button>
            </div>
          </div>

        </div>

        {/* 6 Core Modular Performance Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modularDrillFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white dark:bg-[#0D1115]/60 border border-slate-200 dark:border-white/10 hover:border-precision-blue transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-precision-blue font-bold">0{idx + 1} //</span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-precision-blue/10 border border-precision-blue/30 text-precision-blue font-bold">
                  {feat.metric}
                </span>
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{feat.title}</h4>
              <p className="text-xs text-slate-600 dark:text-steel-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* 3D Modeling Reference Blueprint Modal */}
      {showBlueprintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 dark:bg-black/90 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-[#0D1115] border border-slate-200 dark:border-white/20 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/10">
              <div>
                <div className="text-xs font-mono text-precision-blue font-bold">CAD DATUM // JIAN TOOLS BLUEPRINT</div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">MODULAR DRILL 3D MODELING REFERENCE</h3>
              </div>
              <button
                onClick={() => setShowBlueprintModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-xs font-mono text-slate-800 dark:text-white transition-colors"
              >
                CLOSE [ESC]
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black p-2 border border-slate-200 dark:border-white/10">
              <img
                src="/assets/images/blueprint-reference.webp"
                alt="JIAN TOOLS Modular Drill 3D Reference"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
