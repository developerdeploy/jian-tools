import React, { useState, useMemo } from 'react';
import { jtProductsData, jtCategories, JTProduct } from '../data/jtProducts';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal, LayoutGrid, List, ArrowLeft, Shield } from 'lucide-react';

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
    <div className="min-h-screen bg-[#F3F3F1] dark:bg-[#080A0C] pt-28 pb-24 text-[#080A0C] dark:text-[#E2E8F0]">
      
      {/* Background CAD Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-black/[0.08] dark:border-white/[0.08]">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 text-xs font-mono text-[#64748B] dark:text-[#94A3B8] hover:text-precision-blue dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO HOME</span>
          </button>

          <div className="flex items-center space-x-2 text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">
            <Shield className="w-3 h-3 text-precision-blue" />
            <span>OFFICIAL JIAN TOOLS CATALOGUE</span>
          </div>
        </div>

        {/* Catalogue Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-6 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
              TOOLING SPECIFICATION LIBRARY
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#080A0C] dark:text-white mb-3 font-display">
            PRODUCT CATALOGUE.
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Explore our precision carbide cutting systems, scarfing inserts, deep-hole drill tubes, and solid tooling. Filter by application or search by workpiece specifications.
          </p>
        </div>

        {/* Search & Filter Controls Bar */}
        <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by tool name, workpiece material (e.g. Scarfing, BTA, Endmill, Rod)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white placeholder-[#64748B] focus:outline-none focus:border-precision-blue transition-colors"
              />
            </div>

            {/* Results Count & View Toggle */}
            <div className="flex items-center space-x-3 shrink-0 text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
              <span>{filteredProducts.length} TOOLS</span>

              <div className="flex rounded-md bg-black/[0.04] dark:bg-black/40 p-0.5 border border-black/[0.06] dark:border-white/[0.06]">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-[#1E293B] text-[#080A0C] dark:text-white shadow-xs' : 'text-[#64748B]'}`}
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white dark:bg-[#1E293B] text-[#080A0C] dark:text-white shadow-xs' : 'text-[#64748B]'}`}
                  title="List View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 pb-0.5 text-xs font-mono">
            <button
              onClick={() => setSelectedCategorySlug('all')}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategorySlug === 'all'
                  ? 'bg-precision-blue text-white font-bold'
                  : 'bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white'
              }`}
            >
              ALL CATEGORIES (11)
            </button>

            {jtCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategorySlug(cat.slug)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategorySlug === cat.slug
                    ? 'bg-precision-blue text-white font-bold'
                    : 'bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>

        </div>

        {/* Product Cards Grid / List View */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-[#111417] rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-8">
            <SlidersHorizontal className="w-10 h-10 text-[#64748B] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[#080A0C] dark:text-white mb-1">No matching tooling found</h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mb-4">
              Try adjusting your keyword or reset category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategorySlug('all');
              }}
              className="px-5 py-2 rounded-lg bg-precision-blue text-white text-xs font-mono font-medium"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
