import React, { useState } from 'react';
import { X, Calculator, Cpu } from 'lucide-react';

interface ToolingCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolingCalculatorModal: React.FC<ToolingCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [calcMode, setCalcMode] = useState<'milling' | 'drilling'>('drilling');
  
  // Inputs
  const [diameter, setDiameter] = useState<number>(20); // mm
  const [cuttingSpeed, setCuttingSpeed] = useState<number>(110); // Vc in m/min
  const [feedPerTooth, setFeedPerTooth] = useState<number>(0.12); // fz or fn in mm/rev
  const [flutes, setFlutes] = useState<number>(2);
  const [holeDepth, setHoleDepth] = useState<number>(60); // mm (3D for Ø20)
  const [materialPreset, setMaterialPreset] = useState<string>('steel');

  if (!isOpen) return null;

  // Material Presets
  const handlePresetChange = (mat: string) => {
    setMaterialPreset(mat);
    if (mat === 'steel') {
      setCuttingSpeed(110);
      setFeedPerTooth(0.12);
    } else if (mat === 'castiron') {
      setCuttingSpeed(135);
      setFeedPerTooth(0.16);
    } else if (mat === 'stainless') {
      setCuttingSpeed(75);
      setFeedPerTooth(0.08);
    } else if (mat === 'aluminum') {
      setCuttingSpeed(280);
      setFeedPerTooth(0.20);
    } else if (mat === 'hardened') {
      setCuttingSpeed(50);
      setFeedPerTooth(0.06);
    }
  };

  // Calculations
  const spindleRPM = diameter > 0 ? Math.round((cuttingSpeed * 1000) / (Math.PI * diameter)) : 0;
  const tableFeed = calcMode === 'drilling'
    ? Math.round(spindleRPM * feedPerTooth)
    : Math.round(spindleRPM * feedPerTooth * flutes);
  const cycleTimeSec = tableFeed > 0 ? (((holeDepth + 2) / tableFeed) * 60).toFixed(1) : '0';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close calculator"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-precision-blue mb-1 font-bold uppercase">
            <Calculator className="w-3.5 h-3.5 text-precision-blue" />
            <span>CNC MACHINING PARAMETERS // JIAN CAD LAB</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#080A0C] dark:text-white font-display">
            Speed & Feed Engineering Calculator
          </h3>
          <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
            Calculate optimal RPM, feed rate, and machining cycle time for JIAN TOOLS carbide cutters.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex rounded-lg bg-black/[0.04] dark:bg-black/40 p-1 border border-black/[0.06] dark:border-white/[0.06] mb-5">
          <button
            onClick={() => {
              setCalcMode('drilling');
              setFlutes(2);
            }}
            className={`flex-1 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
              calcMode === 'drilling'
                ? 'bg-precision-blue text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white'
            }`}
          >
            MODULAR & SOLID DRILLING
          </button>
          <button
            onClick={() => {
              setCalcMode('milling');
              setFlutes(4);
            }}
            className={`flex-1 py-1.5 rounded-md text-xs font-mono font-medium transition-colors cursor-pointer ${
              calcMode === 'milling'
                ? 'bg-precision-blue text-white shadow-xs'
                : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white'
            }`}
          >
            SOLID CARBIDE ENDMILLING
          </button>
        </div>

        {/* Material Presets */}
        <div className="mb-5">
          <label className="block text-[10px] font-mono uppercase text-[#64748B] dark:text-[#94A3B8] mb-1.5 font-semibold">
            SELECT WORKPIECE MATERIAL PRESET:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {[
              { id: 'steel', label: 'Carbon Steel (EN8)' },
              { id: 'castiron', label: 'Cast Iron (GG25)' },
              { id: 'stainless', label: 'Stainless (SS304)' },
              { id: 'aluminum', label: 'Aluminum 6061' },
              { id: 'hardened', label: 'Hardened (HRC 45+)' },
            ].map((mat) => (
              <button
                key={mat.id}
                onClick={() => handlePresetChange(mat.id)}
                className={`px-2 py-1.5 rounded border text-[10px] font-mono text-center transition-colors cursor-pointer ${
                  materialPreset === mat.id
                    ? 'bg-precision-blue text-white border-precision-blue font-bold'
                    : 'bg-black/[0.02] dark:bg-white/[0.02] border-black/[0.06] dark:border-white/[0.06] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white'
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 font-mono text-xs">
          <div>
            <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
              Tool Diameter (D) [mm]
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue"
            />
          </div>

          <div>
            <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
              Cutting Speed (Vc) [m/min]
            </label>
            <input
              type="number"
              min="10"
              max="1000"
              value={cuttingSpeed}
              onChange={(e) => setCuttingSpeed(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue"
            />
          </div>

          <div>
            <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
              {calcMode === 'drilling' ? 'Feed per Rev (fn) [mm/rev]' : 'Feed per Tooth (fz) [mm/tooth]'}
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max="2.0"
              value={feedPerTooth}
              onChange={(e) => setFeedPerTooth(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue"
            />
          </div>

          <div>
            <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
              {calcMode === 'drilling' ? 'Hole Depth (L) [mm]' : 'Flute Count (z)'}
            </label>
            {calcMode === 'drilling' ? (
              <input
                type="number"
                min="1"
                max="500"
                value={holeDepth}
                onChange={(e) => setHoleDepth(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue"
              />
            ) : (
              <input
                type="number"
                min="1"
                max="12"
                value={flutes}
                onChange={(e) => setFlutes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue"
              />
            )}
          </div>
        </div>

        {/* Calculated Results Panel */}
        <div className="rounded-xl bg-black/[0.02] dark:bg-black/30 border border-black/[0.08] dark:border-white/[0.08] p-4 font-mono mb-5">
          <div className="text-[10px] text-precision-blue uppercase tracking-widest mb-2.5 flex items-center space-x-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5 text-precision-blue" />
            <span>CALCULATED CNC MACHINE OUTPUTS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white dark:bg-[#111417] border border-black/[0.06] dark:border-white/[0.06]">
              <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] uppercase">SPINDLE SPEED (N)</div>
              <div className="text-lg font-bold text-[#080A0C] dark:text-white mt-0.5">
                {spindleRPM} <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-normal">RPM</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#111417] border border-black/[0.06] dark:border-white/[0.06]">
              <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] uppercase">TABLE FEED (Vf)</div>
              <div className="text-lg font-bold text-precision-blue mt-0.5">
                {tableFeed} <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-normal">mm/min</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-[#111417] border border-black/[0.06] dark:border-white/[0.06] col-span-2 sm:col-span-1">
              <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] uppercase">ESTIMATED TIME (T)</div>
              <div className="text-lg font-bold text-precision-blue mt-0.5">
                {cycleTimeSec} <span className="text-xs text-[#64748B] dark:text-[#94A3B8] font-normal">sec / hole</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#080A0C] dark:text-white text-xs font-mono transition-colors cursor-pointer border border-black/[0.08] dark:border-white/[0.08]"
          >
            CLOSE CALCULATOR
          </button>
        </div>

      </div>
    </div>
  );
};
