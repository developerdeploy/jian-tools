import React from 'react';
import { JTProduct } from '../data/jtProducts';
import { ArrowUpRight, ChevronRight, Layers, Eye } from 'lucide-react';

interface ProductCardProps {
  product: JTProduct;
  onOpenDetails: (product: JTProduct) => void;
  onOpenEnquiry: (productName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onOpenEnquiry
}) => {
  const primaryImg = product.images[0];

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 hover:border-precision-blue dark:hover:border-precision-blue/60 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-2xl">
      
      {/* Card Header & Category Badge */}
      <div className="p-6 sm:p-7 pb-0">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300 font-bold uppercase">
            {product.category}
          </span>
          <span className="text-[10px] font-mono text-slate-400 dark:text-steel-500 font-semibold">
            {product.technicalSpecs[0]?.value || 'CNC PRECISION'}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-precision-blue transition-colors mb-2 font-display">
          {product.name}
        </h3>
        <p className="text-xs text-slate-600 dark:text-steel-400 font-normal leading-relaxed line-clamp-2 mb-4">
          {product.shortDescription}
        </p>
      </div>

      {/* Responsive Product Image Display — Grayscale by default, Vivid Color on Hover */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative w-full h-56 sm:h-64 cursor-pointer overflow-hidden bg-slate-50 dark:bg-black/30 flex items-center justify-center p-4"
      >
        <picture>
          <source
            type="image/webp"
            srcSet={`
              ${primaryImg.w300} 300w,
              ${primaryImg.w600} 600w,
              ${primaryImg.w1200} 1200w,
              ${primaryImg.original} 4096w
            `}
            sizes="(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px"
          />
          <img
            src={primaryImg.w600}
            alt={product.name}
            className="w-full h-full object-contain filter grayscale contrast-120 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
            loading="lazy"
          />
        </picture>

        {/* Hover Quick Zoom Pill */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/80 backdrop-blur text-white text-[10px] font-mono px-2.5 py-1 rounded flex items-center space-x-1.5 shadow-lg">
          <Eye className="w-3 h-3 text-precision-blue" />
          <span>INSPECT</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0E1217] via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Card Footer & Specs Matrix Summary */}
      <div className="p-6 sm:p-7 pt-0 mt-auto">
        <div className="grid grid-cols-2 gap-2 mb-6 text-[11px] font-mono border-t border-slate-100 dark:border-white/5 pt-4">
          {product.technicalSpecs.slice(0, 2).map((spec, idx) => (
            <div key={idx}>
              <span className="text-slate-400 dark:text-steel-500 block text-[9px] font-semibold uppercase">{spec.label}</span>
              <span className="text-slate-800 dark:text-steel-200 font-bold truncate block">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onOpenDetails(product)}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs font-semibold tracking-wider transition-all duration-300 group/btn cursor-pointer"
          >
            <span>FULL SPECIFICATIONS</span>
            <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onOpenEnquiry(product.name)}
            className="p-3 rounded-xl bg-precision-blue/10 hover:bg-precision-blue text-precision-blue hover:text-white border border-precision-blue/30 transition-all duration-300 shadow-sm cursor-pointer"
            title={`Enquire about ${product.name}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
