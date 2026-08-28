import React, { useState } from 'react';
import { jtCategories } from '../data/jtProducts';
import { ArrowRight, ArrowUpRight, ChevronRight } from 'lucide-react';

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
    <section id="products" className="relative w-full py-24 bg-[#F3F3F1] dark:bg-[#080A0C] border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-6 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
                04 / TOOLING ECOSYSTEM // 11 PRECISION CATEGORIES
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#080A0C] dark:text-white leading-none font-display">
              TOOLING FOR THE <br />
              <span className="text-[#64748B] dark:text-[#94A3B8]">ENTIRE CUT.</span>
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => onOpenCatalogue()}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider transition-colors cursor-pointer border border-blue-400/30"
            >
              <span>EXPLORE ALL 11 CATEGORIES</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Interactive Curated Tool Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          
          {/* Left Column: Category Vertical Navigation Index */}
          <div className="lg:col-span-4 flex flex-col space-y-1 max-h-[540px] overflow-y-auto pr-1">
            <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest mb-1.5 px-2 font-semibold">
              SELECT CATEGORY //
            </div>

            {jtCategories.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-3 rounded-lg text-left transition-colors flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-[#111417] border-precision-blue text-[#080A0C] dark:text-white shadow-sm'
                      : 'bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.06] dark:border-white/[0.06] hover:border-black/[0.15] dark:hover:border-white/[0.15] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-mono font-bold ${isActive ? 'text-precision-blue' : 'text-[#64748B]'}`}>
                      {cat.index}
                    </span>
                    <span className="text-xs font-bold truncate">
                      {cat.name}
                    </span>
                  </div>

                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-precision-blue translate-x-0.5' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Physical Product Gallery Showcase */}
          <div className="lg:col-span-8 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            
            {/* Top Category Datum Header */}
            <div className="flex items-center justify-between text-xs font-mono border-b border-black/[0.06] dark:border-white/[0.06] pb-3 mb-6">
              <div className="flex items-center space-x-2 text-precision-blue font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-precision-blue" />
                <span>CATEGORY {activeCategory.index} // {activeCategory.tagline.toUpperCase()}</span>
              </div>
              <span className="text-[#64748B] dark:text-[#94A3B8] font-medium text-[10px]">
                JIAN TOOLS PRECISION SPEC
              </span>
            </div>

            {/* Product Centerpiece */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-2">
              
              {/* Product Visual Showcase */}
              <div className="md:col-span-7 relative h-64 sm:h-72 flex items-center justify-center p-4 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] overflow-hidden group">
                <img
                  src={activeCategory.primaryImage}
                  alt={activeCategory.name}
                  className="max-h-full max-w-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Technical Narrative & Specifications */}
              <div className="md:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-bold text-[#080A0C] dark:text-white mb-2 font-display">
                    {activeCategory.name}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-4">
                    {activeCategory.description}
                  </p>

                  {firstProduct && firstProduct.technicalSpecs && (
                    <div className="space-y-1.5 mb-4">
                      <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest font-bold">
                        ENGINEERING SPECIFICATIONS
                      </div>
                      {firstProduct.technicalSpecs.slice(0, 3).map((spec, i) => (
                        <div
                          key={i}
                          className="text-xs font-mono p-2 rounded-md bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[#080A0C] dark:text-white"
                        >
                          <span className="text-[#64748B] dark:text-[#94A3B8] text-[10px]">{spec.label}</span>
                          <span className="font-bold text-precision-blue text-xs">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2.5 pt-3 border-t border-black/[0.06] dark:border-white/[0.06]">
                  <button
                    onClick={() => onOpenCatalogue(activeCategory.slug)}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider transition-colors cursor-pointer border border-blue-400/30"
                  >
                    <span>VIEW CATEGORY</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(activeCategory.name)}
                    className="p-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white transition-colors cursor-pointer"
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
