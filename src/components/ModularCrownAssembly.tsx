import React, { useState, useRef, useEffect } from 'react';
import { modularDrillVariations } from '../data/modularDrillData';
import { CadModularDrillViewer } from './CadModularDrillViewer';
import {
  Lock,
  Unlock,
  Rotate3d,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Layers,
  Download
} from 'lucide-react';

interface ModularCrownAssemblyProps {
  onOpenEnquiry: (productName?: string) => void;
}

export const ModularCrownAssembly: React.FC<ModularCrownAssemblyProps> = ({ onOpenEnquiry }) => {
  const [selectedDepthIndex, setSelectedDepthIndex] = useState<number>(2);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'official-drill' | 'all-12-lineup'>('official-drill');
  
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [materialMode, setMaterialMode] = useState<'solid' | '3d-render'>('solid');

  const activeDrill = modularDrillVariations[selectedDepthIndex];
  const depthMultiplier = activeDrill.depthMultiplier;
  
  const getModelUrl = (depthRatio: string) => {
    const lower = depthRatio.toLowerCase();
    return `/models/${lower}${['8d', '9d', '12d'].includes(lower) ? '.stp' : '.zip'}`;
  };

  return (
    <section
      id="modular-drilling"
      className="relative w-full py-20 bg-white dark:bg-[#0a0a0a] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-gray-200 dark:border-white/10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight font-display">
              Modular Drilling System
              <span className="block text-gray-400 dark:text-gray-500 text-xl sm:text-2xl mt-1">1D to 12D Depth Range</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <a
              href={getModelUrl(activeDrill.depthRatio)}
              download
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-precision-blue text-white text-sm font-medium transition-colors shadow-sm hover:bg-blue-600 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download 3D Model</span>
            </a>

            <button
              onClick={() => {
                setIsExploded(!isExploded);
                setActiveTab('official-drill');
              }}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isExploded
                  ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white shadow-inner'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15'
              }`}
            >
              {isExploded ? (
                <><Lock className="w-4 h-4" /><span>Lock Assembly</span></>
              ) : (
                <><Unlock className="w-4 h-4" /><span>Explode View</span></>
              )}
            </button>
          </div>
        </div>

        {/* Depth Selector */}
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
                  }}
                  className={`py-2 px-1 rounded-lg text-sm font-medium transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isSelected
                      ? 'bg-precision-blue text-white shadow-sm'
                      : 'bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span className="font-bold text-xs">{drill.depthRatio}</span>
                  <span className={`text-[9px] mt-0.5 ${isSelected ? 'text-white/80' : ''}`}>
                    {drill.depthMultiplier}D
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left: Drill Display */}
          <div className="lg:col-span-7 rounded-xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-white/10 p-6 flex flex-col justify-between relative overflow-hidden select-none min-h-[500px]">
            
            {/* Drill Canvas */}
            <div
              className="relative w-full h-[360px] flex items-center justify-center my-2 overflow-hidden rounded-lg p-4"
              style={{ perspective: 1200 }}
            >
              {isExploded ? (
                <div className="relative flex items-center justify-center h-full w-full animate-fade-in">
                  <img
                    src="/assets/images/modular-drills/modular-drill-exploded-3d.webp"
                    alt="Modular Crown Drill Exploded View"
                    className="h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                    draggable={false}
                  />
                </div>
              ) : activeTab === 'all-12-lineup' ? (
                <div className="relative flex items-end justify-between h-full w-full overflow-x-auto space-x-2 px-2 py-4 animate-fade-in">
                  {modularDrillVariations.map((d) => (
                    <div
                      key={d.depthRatio}
                      onClick={() => {
                        setSelectedDepthIndex(d.depthMultiplier - 1);
                        setActiveTab('official-drill');
                      }}
                      className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform shrink-0 h-full justify-end"
                      style={{ width: '45px' }}
                    >
                      <img
                        src={`/assets/images/modular-drills/official/transparent/${d.depthMultiplier}D.webp`}
                        alt={`Drill ${d.depthRatio}`}
                        className="h-60 object-contain"
                      />
                      <span className="text-[10px] font-medium text-gray-500 dark:text-gray-400 mt-2">
                        {d.depthRatio}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <CadModularDrillViewer
                  depthMultiplier={depthMultiplier}
                  isAutoSpinning={isAutoSpinning}
                  materialMode={materialMode}
                />
              )}

              {!isExploded && activeTab === 'official-drill' && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 bg-gray-900/80 text-white text-xs px-3 py-1 rounded-full pointer-events-none z-10">
                  <Rotate3d className="w-3 h-3 text-precision-blue" />
                  <span>Drag to rotate • Pinch to zoom</span>
                </div>
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-gray-200 dark:border-white/10 text-sm gap-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoSpinning(!isAutoSpinning)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-md bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                >
                  {isAutoSpinning ? (
                    <><Pause className="w-3 h-3 text-precision-blue" /><span>Pause Spin</span></>
                  ) : (
                    <><Play className="w-3 h-3 text-precision-blue" /><span>Auto Spin</span></>
                  )}
                </button>
              </div>

              {activeTab === 'official-drill' && (
                <div className="flex bg-gray-100 dark:bg-white/5 rounded-md p-1 overflow-x-auto whitespace-nowrap">
                  <button
                    onClick={() => setMaterialMode('solid')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      materialMode === 'solid'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    Solid View
                  </button>
                  <button
                    onClick={() => setMaterialMode('3d-render')}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                      materialMode === '3d-render'
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    3D Render View
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-2 bg-gray-100 dark:bg-white/5 rounded-md p-1">
                <button
                  onClick={() => {
                    setActiveTab('official-drill');
                    setIsExploded(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'official-drill'
                      ? 'bg-white dark:bg-gray-700 text-precision-blue shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  Interactive 3D
                </button>
                <button
                  onClick={() => {
                    setActiveTab('all-12-lineup');
                    setIsExploded(false);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'all-12-lineup'
                      ? 'bg-white dark:bg-gray-700 text-precision-blue shadow-sm'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  View All 12
                </button>
              </div>
            </div>

          </div>

          {/* Right: Specs */}
          <div className="lg:col-span-5 rounded-xl bg-white dark:bg-[#141414] border border-gray-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 font-display">
                Replaceable Type Modular Drills
              </h3>

              <div className="space-y-2.5 mb-6 text-sm">
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Reach Ratio</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{activeDrill.depthRatio} ({activeDrill.depthMultiplier}× Dia)</span>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Drill dia Range : </span>
                  <span className="font-semibold text-gray-900 dark:text-white">8.00 to 52.00 mm</span>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Coolant System</span>
                  <span className="font-semibold text-precision-blue">Internal Coolant</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-gray-200 dark:border-white/10">
              <button
                onClick={() => onOpenEnquiry(`Modular Drill ${activeDrill.depthRatio}`)}
                className="w-full py-3 rounded-lg bg-precision-blue hover:bg-blue-700 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                Request Quote for {activeDrill.depthRatio}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
