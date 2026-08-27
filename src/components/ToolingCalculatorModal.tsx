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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 dark:bg-black/85 light:bg-slate-900/60 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0D1115] dark:bg-[#0D1115] light:bg-white border border-white/15 dark:border-white/15 light:border-slate-200 shadow-2xl p-6 sm:p-8 my-8">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-steel-400 dark:text-steel-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          aria-label="Close calculator"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-1">
            <Calculator className="w-4 h-4 text-precision-blue" />
            <span>CNC MACHINING PARAMETERS // JIAN CAD LAB</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900">
            Speed & Feed Engineering Calculator
          </h3>
          <p className="text-xs text-steel-400 dark:text-steel-400 light:text-slate-600 mt-1">
            Calculate optimal RPM, feed rate, and machining cycle time for JIAN TOOLS carbide cutters.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex rounded-lg bg-black/40 dark:bg-black/40 light:bg-slate-100 p-1 border border-white/10 dark:border-white/10 light:border-slate-200 mb-6">
          <button
            onClick={() => {
              setCalcMode('drilling');
              setFlutes(2);
            }}
            className={`flex-1 py-2 rounded-md text-xs font-mono font-bold transition-all ${
              calcMode === 'drilling'
                ? 'bg-precision-blue text-white shadow-md'
                : 'text-steel-400 dark:text-steel-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            MODULAR & SOLID DRILLING
          </button>
          <button
            onClick={() => {
              setCalcMode('milling');
              setFlutes(4);
            }}
            className={`flex-1 py-2 rounded-md text-xs font-mono font-bold transition-all ${
              calcMode === 'milling'
                ? 'bg-precision-blue text-white shadow-md'
                : 'text-steel-400 dark:text-steel-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            SOLID CARBIDE ENDMILLING
          </button>
        </div>

        {/* Material Presets */}
        <div className="mb-6">
          <label className="block text-[10px] font-mono uppercase text-steel-400 dark:text-steel-400 light:text-slate-600 mb-2 font-semibold">
            SELECT WORKPIECE MATERIAL PRESET:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              { id: 'steel', label: 'Carbon Steel (EN8/EN24)' },
              { id: 'castiron', label: 'Cast Iron (GG25)' },
              { id: 'stainless', label: 'Stainless (SS304/316)' },
              { id: 'aluminum', label: 'Aluminum 6061/7075' },
              { id: 'hardened', label: 'Hardened (HRC 45-55)' },
            ].map((mat) => (
              <button
                key={mat.id}
                onClick={() => handlePresetChange(mat.id)}
                className={`px-2 py-2 rounded border text-[10px] font-mono text-center transition-all ${
                  materialPreset === mat.id
                    ? 'bg-precision-blue/20 border-precision-blue text-precision-blue dark:text-precision-blue light:text-precision-blue font-bold shadow-sm'
                    : 'bg-white/5 dark:bg-white/5 light:bg-slate-50 border-white/5 dark:border-white/5 light:border-slate-200 text-steel-400 dark:text-steel-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
                }`}
              >
                {mat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 font-mono text-xs">
          <div>
            <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
              Tool Diameter (D) [mm]
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={diameter}
              onChange={(e) => setDiameter(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue"
            />
          </div>

          <div>
            <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
              Cutting Speed (Vc) [m/min]
            </label>
            <input
              type="number"
              min="10"
              max="1000"
              value={cuttingSpeed}
              onChange={(e) => setCuttingSpeed(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue"
            />
          </div>

          <div>
            <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
              {calcMode === 'drilling' ? 'Feed per Rev (fn) [mm/rev]' : 'Feed per Tooth (fz) [mm/tooth]'}
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              max="2.0"
              value={feedPerTooth}
              onChange={(e) => setFeedPerTooth(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue"
            />
          </div>

          <div>
            <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
              {calcMode === 'drilling' ? 'Hole Depth (L) [mm]' : 'Flute Count (z)'}
            </label>
            {calcMode === 'drilling' ? (
              <input
                type="number"
                min="1"
                max="500"
                value={holeDepth}
                onChange={(e) => setHoleDepth(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue"
              />
            ) : (
              <input
                type="number"
                min="1"
                max="12"
                value={flutes}
                onChange={(e) => setFlutes(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue"
              />
            )}
          </div>
        </div>

        {/* Calculated Results Panel */}
        <div className="rounded-xl bg-gradient-to-br from-precision-blue/15 via-black/60 to-black/80 dark:from-precision-blue/15 dark:via-black/60 dark:to-black/80 light:from-blue-50 light:via-white light:to-slate-100 border border-precision-blue/40 light:border-precision-blue/30 p-5 font-mono">
          <div className="text-[10px] text-precision-blue uppercase tracking-widest mb-3 flex items-center space-x-1.5 font-bold">
            <Cpu className="w-3.5 h-3.5 text-precision-blue" />
            <span>CALCULATED CNC MACHINE OUTPUTS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-black/50 dark:bg-black/50 light:bg-white border border-white/5 dark:border-white/5 light:border-slate-200 light:shadow-sm">
              <div className="text-[9px] text-steel-500 dark:text-steel-500 light:text-slate-500 uppercase">SPINDLE SPEED (N)</div>
              <div className="text-xl font-bold text-white dark:text-white light:text-slate-900 mt-0.5">
                {spindleRPM} <span className="text-xs text-steel-400 dark:text-steel-400 light:text-slate-500 font-normal">RPM</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/50 dark:bg-black/50 light:bg-white border border-white/5 dark:border-white/5 light:border-slate-200 light:shadow-sm">
              <div className="text-[9px] text-steel-500 dark:text-steel-500 light:text-slate-500 uppercase">TABLE FEED (Vf)</div>
              <div className="text-xl font-bold text-precision-blue mt-0.5">
                {tableFeed} <span className="text-xs text-steel-400 dark:text-steel-400 light:text-slate-500 font-normal">mm/min</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/50 dark:bg-black/50 light:bg-white border border-white/5 dark:border-white/5 light:border-slate-200 col-span-2 sm:col-span-1 light:shadow-sm">
              <div className="text-[9px] text-steel-500 dark:text-steel-500 light:text-slate-500 uppercase">ESTIMATED TIME (T)</div>
              <div className="text-xl font-bold text-amber-500 mt-0.5">
                {cycleTimeSec} <span className="text-xs text-steel-400 dark:text-steel-400 light:text-slate-500 font-normal">sec / hole</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-white/10 dark:bg-white/10 light:bg-slate-100 hover:bg-white/20 dark:hover:bg-white/20 light:hover:bg-slate-200 text-white dark:text-white light:text-slate-900 text-xs font-mono transition-colors"
          >
            CLOSE CALCULATOR
          </button>
        </div>

      </div>
    </div>
  );
};
