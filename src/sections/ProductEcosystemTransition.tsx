import React from 'react';
import { productCategories } from '../data/products';
import { Layers, ArrowRight, Shield } from 'lucide-react';

interface ProductEcosystemTransitionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const ProductEcosystemTransition: React.FC<ProductEcosystemTransitionProps> = ({
  onSelectCategory
}) => {
  return (
    <section className="relative w-full py-28 bg-slate-50 dark:bg-[#07090B] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />

      {/* Atmospheric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-precision-blue/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-cad text-precision-blue px-3 py-1 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-4 shadow-sm">
            <Layers className="w-3 h-3 text-precision-blue" />
            <span className="font-semibold">08 // PRODUCT ECOSYSTEM TRANSITION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tightest text-slate-900 dark:text-white mb-6">
            EXPANDING INTO THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-white dark:via-steel-200 dark:to-steel-400">
              TOOLING ECOSYSTEM
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-steel-400 leading-relaxed max-w-2xl mx-auto">
            From single-point modular drills to comprehensive solid carbide milling and custom tooling solutions. Built to optimize feeds, speeds, and tool life on modern CNC machinery.
          </p>
        </div>

        {/* Sharp Interactive HTML Tooling Family Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-16">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-lg bg-white dark:bg-[#0D1115]/80 border border-slate-200 dark:border-white/10 hover:border-precision-blue dark:hover:border-precision-blue/50 transition-all duration-300 text-left transform hover:-translate-y-1 shadow-sm hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {/* Top Index & Mini Light Indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-slate-400 dark:text-steel-500 group-hover:text-precision-blue transition-colors font-bold">
                  {cat.index}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-precision-blue transition-colors" />
              </div>

              {/* Product Category Image Preview */}
              <div className="w-full h-20 mb-4 overflow-hidden rounded bg-slate-50 dark:bg-black/40 flex items-center justify-center p-1 border border-slate-200 dark:border-white/5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain filter contrast-115 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Category Name */}
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide group-hover:text-precision-blue transition-colors mb-1">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center text-[10px] font-mono text-slate-500 dark:text-steel-500 group-hover:text-slate-800 dark:group-hover:text-steel-300 transition-colors font-semibold">
                  VIEW SPECS
                  <ArrowRight className="w-2.5 h-2.5 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Technical Guarantee Strip */}
        <div className="p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1115]/75 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-lg bg-precision-blue/10 border border-precision-blue/20 text-precision-blue">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                VERIFIED MANUFACTURING STANDARDS
              </div>
              <div className="text-xs text-slate-600 dark:text-steel-400">
                100% Optical Metrology Inspection on all cutting diameters and shank runouts.
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs font-mono text-slate-600 dark:text-steel-400 font-semibold">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>h6 SHANK TOLERANCE</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-precision-blue" />
              <span>TiN / AlTiN NANO-COATED</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
