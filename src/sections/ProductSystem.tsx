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
    <section id="products" className="relative w-full py-20 bg-white dark:bg-[#0a0a0a] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-gray-200 dark:border-white/10">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight font-display">
              Product Range
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              onClick={() => onOpenCatalogue()}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-700 text-white text-sm font-medium transition-colors cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left: Category List */}
          <div className="lg:col-span-4 flex flex-col space-y-1 max-h-[540px] overflow-y-auto pr-1">
            {jtCategories.map((cat, idx) => {
              const isActive = idx === activeCategoryIndex;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`p-3 rounded-lg text-left transition-colors flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-semibold ${isActive ? 'text-precision-blue' : 'text-gray-400'}`}>
                      {cat.index}
                    </span>
                    <span className="text-sm font-medium truncate">
                      {cat.name}
                    </span>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-precision-blue translate-x-0.5' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Right: Product Showcase */}
          <div className="lg:col-span-8 rounded-xl bg-gray-50 dark:bg-[#141414] border border-gray-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-2">
              
              {/* Product Image */}
              <div className="md:col-span-7 relative h-64 sm:h-72 flex items-center justify-center p-4 rounded-lg bg-white dark:bg-black/30 overflow-hidden group">
                <img
                  src={activeCategory.primaryImage}
                  alt={activeCategory.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = activeCategory.primaryImage.replace('/600w/', '/original/');
                    if (target.src !== fallback) {
                      target.src = fallback;
                    }
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="md:col-span-5 flex flex-col justify-center h-full space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 font-display">
                    {activeCategory.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-2.5 pt-3 border-t border-gray-200 dark:border-white/10">
                  <button
                    onClick={() => onOpenCatalogue(activeCategory.slug)}
                    className="flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-lg bg-precision-blue hover:bg-blue-700 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onOpenEnquiry(activeCategory.name)}
                    className="p-3 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                    title={`Request quote for ${activeCategory.name}`}
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
