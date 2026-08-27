import React, { useState } from 'react';
import { jtCategories, JTCategory } from '../data/jtProducts';
import { ArrowRight, ArrowUpRight, Shield, Layers, ChevronRight } from 'lucide-react';

interface ProductSystemProps {
  onOpenCatalogue: (categorySlug?: string) => void;
  onOpenEnquiry: (categoryName: string) => void;
}

export const ProductSystem: React.FC<ProductSystemProps> = ({
  onOpenCatalogue,
  onOpenEnquiry
}) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const activeCategory = jtCategories[activeCategoryIndex] || jtCategories[0];
  const firstProduct = activeCategory.products[0];

  return (
    <section id="products" className="relative w-full py-28 bg-slate-50 dark:bg-[#07090B] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
                TOOLING ECOSYSTEM // 11 PRECISION CATEGORIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-none font-display">
              TOOLING FOR THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                ENTIRE CUT.
              </span>
            </h2>
          </div>

          <div className="mt-6 md:mt-0 flex items-center space-x-4">
            <button
              onClick={() => onOpenCatalogue()}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
            >
              <span>EXPLORE ALL 11 CATEGORIES</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Curated Tool Gallery (Physical-Feel Transition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Category Vertical Navigation Index */}
          <div className="lg:col-span-4 flex flex-col space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
            <div className="text-[10px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest mb-1 px-2 font-semibold">
              SELECT TOOL CATEGORY //
            </div>

            {jtCategories.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-3.5 rounded-xl text-left transition-all duration-200 flex items-center justify-between border ${
                    isActive
                      ? 'bg-white dark:bg-[#0E1217] border-precision-blue shadow-md text-slate-900 dark:text-white'
                      : 'bg-slate-100/60 dark:bg-white/5 border-slate-200/60 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-precision-blue' : 'text-slate-400 dark:text-steel-500'}`}>
                      {cat.index}
                    </span>
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {cat.name}
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-precision-blue translate-x-0.5' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Large Physical Product Gallery Showcase */}
          <div className="lg:col-span-8 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-6 sm:p-10 flex flex-col justify-between shadow-sm dark:shadow-2xl relative overflow-hidden">
            
            {/* Top Category Datum Header */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-slate-100 dark:border-white/10 pb-4 mb-6">
              <div className="flex items-center space-x-2 text-precision-blue font-bold">
                <span className="w-2 h-2 rounded-full bg-precision-blue" />
                <span>CATEGORY {activeCategory.index} // {activeCategory.tagline.toUpperCase()}</span>
              </div>
              <span className="text-slate-400 dark:text-steel-500 font-semibold">
                JIAN TOOLS PRECISION SPEC
              </span>
            </div>

            {/* Product Centerpiece */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4">
              
              {/* Product Visual Showcase */}
              <div className="md:col-span-7 relative h-64 sm:h-80 flex items-center justify-center p-4 rounded-xl bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 overflow-hidden group">
                <img
                  src={activeCategory.primaryImage}
                  alt={activeCategory.name}
                  className="max-h-full max-w-full object-contain filter grayscale contrast-120 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Product Technical Narrative & Specifications */}
              <div className="md:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 font-display">
                    {activeCategory.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                    {activeCategory.description}
                  </p>

                  {firstProduct && firstProduct.technicalSpecs && (
                    <div className="space-y-2 mb-6">
                      <div className="text-[10px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest font-bold">
                        ENGINEERING SPECIFICATIONS
                      </div>
                      {firstProduct.technicalSpecs.slice(0, 3).map((spec, i) => (
                        <div
                          key={i}
                          className="text-xs font-mono p-2.5 rounded-lg bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/5 flex items-center justify-between text-slate-800 dark:text-steel-200"
                        >
                          <span className="text-slate-500 dark:text-steel-400 text-[10px]">{spec.label}</span>
                          <span className="font-bold text-precision-blue text-xs">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => onOpenCatalogue(activeCategory.slug)}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-wider transition-all"
                  >
                    <span>VIEW CATEGORY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(activeCategory.name)}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white transition-colors"
                    title={`Request quotation for ${activeCategory.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4 text-precision-blue" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
