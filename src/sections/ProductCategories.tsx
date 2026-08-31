import React, { useState } from 'react';
import { productCategories } from '../data/products';
import { ProductCategory } from '../types';
import { ArrowUpRight, CheckCircle2, ChevronRight, X, Cpu, Settings } from 'lucide-react';

interface ProductCategoriesProps {
  onOpenEnquiry: (productName?: string) => void;
  selectedCategoryFromParent?: string | null;
}

export const ProductCategories: React.FC<ProductCategoriesProps> = ({
  onOpenEnquiry,
  selectedCategoryFromParent
}) => {
  const [activeModalCategory, setActiveModalCategory] = useState<ProductCategory | null>(null);

  // If triggered from ecosystem transition
  React.useEffect(() => {
    if (selectedCategoryFromParent) {
      const match = productCategories.find(c => c.id === selectedCategoryFromParent);
      if (match) {
        setActiveModalCategory(match);
      }
    }
  }, [selectedCategoryFromParent]);

  return (
    <section id="products" className="relative w-full py-32 bg-slate-50 dark:bg-[#07090B] border-t border-slate-200 dark:border-white/5">
      {/* CAD Grid Background */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-semibold tracking-cad text-slate-500 dark:text-steel-400 uppercase">
                PRODUCT PORTFOLIO // JIAN TOOLS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tightest text-slate-900 dark:text-white leading-tight">
              PRECISION TOOLING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                FOR EVERY APPLICATION.
              </span>
            </h2>
          </div>

          <p className="mt-4 md:mt-0 text-sm sm:text-base text-slate-600 dark:text-steel-400 max-w-md leading-relaxed">
            A considered tooling range for the engineers who make parts, solve machining bottlenecks, and keep high-production CNC spindles running.
          </p>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {productCategories.map((category) => (
            <div
              key={category.id}
              className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/10 hover:border-precision-blue dark:hover:border-precision-blue/40 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            >
              {/* Top Accent & Index */}
              <div className="p-6 sm:p-8 pb-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-slate-400 dark:text-steel-500 group-hover:text-precision-blue transition-colors">
                    {category.index} //
                  </span>
                  <span className="text-[9px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300 font-semibold">
                    {category.badge}
                  </span>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-precision-blue transition-colors mb-2">
                  {category.name}
                </h3>
              </div>

              {/* Product Visual Container */}
              <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-50 dark:bg-gradient-to-b dark:from-transparent dark:to-black/60 flex items-center justify-center p-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain filter contrast-115 group-hover:scale-105 transition-transform duration-500 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0D1115] via-transparent to-transparent opacity-80 pointer-events-none" />
              </div>

              {/* Card Footer */}
              <div className="p-6 sm:p-8 pt-0 mt-auto">

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveModalCategory(category)}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold tracking-wider transition-all duration-300 group/btn"
                  >
                    <span>TECHNICAL SPECS</span>
                    <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(category.name)}
                    className="p-3 rounded-lg bg-precision-blue/10 hover:bg-precision-blue text-precision-blue hover:text-white border border-precision-blue/30 transition-all duration-300 shadow-sm"
                    title={`Enquire about ${category.name}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Technical Spec Detail Modal */}
      {activeModalCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 dark:bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-white dark:bg-[#0D1115] border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[90vh] overflow-y-auto">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalCategory(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-xs font-mono text-precision-blue font-bold">
                CATEGORY {activeModalCategory.index} //
              </span>
              <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300 font-semibold">
                {activeModalCategory.badge}
              </span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">
              {activeModalCategory.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-steel-300 mb-6">
              {activeModalCategory.subtitle} — {activeModalCategory.description}
            </p>

            {/* Spec Matrix Table */}
            <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0D1115]/75 mb-6">
              <h4 className="text-xs font-mono text-slate-500 dark:text-steel-400 uppercase tracking-widest mb-4 flex items-center space-x-2 font-bold">
                <Settings className="w-3.5 h-3.5 text-precision-blue" />
                <span>ENGINEERING PARAMETERS & CAD LIMITS</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-3 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-[10px] text-slate-500 dark:text-steel-500">DIAMETER RANGE</div>
                  <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeModalCategory.specs.diameterRange}</div>
                </div>
                <div className="p-3 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-[10px] text-slate-500 dark:text-steel-500">FLUTE / GEOMETRY</div>
                  <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeModalCategory.specs.fluteRange}</div>
                </div>
                <div className="p-3 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-[10px] text-slate-500 dark:text-steel-500">SURFACE NANO-COATING</div>
                  <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeModalCategory.specs.coating}</div>
                </div>
                <div className="p-3 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-sm">
                  <div className="text-[10px] text-slate-500 dark:text-steel-500">MANUFACTURING TOLERANCE</div>
                  <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeModalCategory.specs.tolerance}</div>
                </div>
                {activeModalCategory.specs.helixAngle && (
                  <div className="p-3 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-sm sm:col-span-2">
                    <div className="text-[10px] text-slate-500 dark:text-steel-500">HELIX ANGLE & FLUTE DYNAMICS</div>
                    <div className="text-slate-900 dark:text-white font-bold mt-0.5">{activeModalCategory.specs.helixAngle}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Key Features Bullet List */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-slate-500 dark:text-steel-400 uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                <Cpu className="w-3.5 h-3.5 text-precision-blue" />
                <span>KEY MACHINING ADVANTAGES</span>
              </h4>
              <ul className="space-y-2">
                {activeModalCategory.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-700 dark:text-steel-300">
                    <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
              <button
                onClick={() => setActiveModalCategory(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white text-xs font-semibold transition-colors"
              >
                CLOSE
              </button>
              <button
                onClick={() => {
                  const catName = activeModalCategory.name;
                  setActiveModalCategory(null);
                  onOpenEnquiry(catName);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-semibold tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
              >
                <span>REQUEST RFQ / CAD MODEL</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
