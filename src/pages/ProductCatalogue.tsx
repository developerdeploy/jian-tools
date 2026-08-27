import React, { useState, useMemo } from 'react';
import { jtProductsData, jtCategories, JTProduct } from '../data/jtProducts';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal, LayoutGrid, List, ArrowLeft, Shield } from 'lucide-react';

interface ProductCatalogueProps {
  onBackToHome: () => void;
  onOpenDetails: (product: JTProduct) => void;
  onOpenEnquiry: (productName: string) => void;
  initialCategory?: string | null;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  onBackToHome,
  onOpenDetails,
  onOpenEnquiry,
  initialCategory
}) => {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return jtProductsData.filter((prod) => {
      const matchesCategory =
        selectedCategorySlug === 'all' || prod.categorySlug === selectedCategorySlug;
      const matchesSearch =
        searchQuery.trim() === '' ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategorySlug, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090B] pt-28 pb-24 text-slate-800 dark:text-steel-200">
      
      {/* Background CAD Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Top Breadcrumb & Return to Journey */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-white/10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-steel-400 hover:text-precision-blue dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO CINEMATIC JOURNEY</span>
          </button>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-500 dark:text-steel-500">
            <Shield className="w-3.5 h-3.5 text-precision-blue" />
            <span>OFFICIAL JIAN TOOLS PRECISION CATALOGUE</span>
          </div>
        </div>

        {/* Catalogue Header */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
              TOOLING LIBRARY // VERIFIED ASSETS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tightest text-slate-900 dark:text-white mb-4">
            PRODUCT CATALOGUE.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-steel-400 max-w-3xl leading-relaxed">
            Explore our precision carbide cutting systems, scarfing inserts, deep-hole drill tubes, and solid tooling. Filter by application or search by engineering requirements.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-[#0D1115]/90 border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl mb-10 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 dark:text-steel-500 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by tool name, workpiece material (e.g. Scarfing, BTA, Endmill, Rod)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-steel-500 focus:outline-none focus:border-precision-blue transition-colors"
              />
            </div>

            {/* Results Count & View Toggle */}
            <div className="flex items-center space-x-4 shrink-0 text-xs font-mono text-slate-500 dark:text-steel-400">
              <span>{filteredProducts.length} TOOLS FOUND</span>

              <div className="flex rounded-lg bg-slate-100 dark:bg-black/40 p-1 border border-slate-200 dark:border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-precision-blue text-white shadow-sm' : 'text-slate-500 dark:text-steel-400'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-precision-blue text-white shadow-sm' : 'text-slate-500 dark:text-steel-400'}`}
                  title="List View"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pt-2 pb-1 text-xs font-mono">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                selectedCategorySlug === 'all'
                  ? 'bg-precision-blue text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ALL CATEGORIES (10)
            </button>

            {jtCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-precision-blue text-white font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid / List View */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#0D1115]/50 rounded-2xl border border-slate-200 dark:border-white/10 p-8">
            <SlidersHorizontal className="w-12 h-12 text-slate-400 dark:text-steel-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No matching tooling found</h3>
            <p className="text-xs text-slate-500 dark:text-steel-400 mb-6">
              Try adjusting your keyword or reset category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategorySlug('all');
              }}
              className="px-6 py-2.5 rounded-lg bg-precision-blue text-white text-xs font-mono font-bold"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={onOpenDetails}
                onOpenEnquiry={onOpenEnquiry}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
