import React from 'react';
import { JTProduct } from '../data/jtProducts';
import { ArrowUpRight, ChevronRight, Eye } from 'lucide-react';

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
    <div className="group relative flex flex-col justify-between rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] hover:border-precision-blue dark:hover:border-precision-blue/60 transition-colors overflow-hidden">
      
      {/* Card Header & Category Badge */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[9px] font-mono tracking-widest px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[#080A0C] dark:text-[#CBD5E1] font-bold uppercase">
            {product.category}
          </span>
          <span className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] font-medium">
            {product.technicalSpecs[0]?.value || 'CNC PRECISION'}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#080A0C] dark:text-white group-hover:text-precision-blue transition-colors mb-2 font-display">
          {product.name}
        </h3>
        <p className="text-xs text-[#64748B] dark:text-[#94A3B8] font-normal leading-relaxed line-clamp-2 mb-4">
          {product.shortDescription}
        </p>
      </div>

      {/* Responsive Product Image Display */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative w-full h-52 sm:h-56 cursor-pointer overflow-hidden bg-black/[0.02] dark:bg-black/30 flex items-center justify-center p-4"
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
            className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-300 ease-out"
            loading="lazy"
          />
        </picture>

        {/* Hover Quick Zoom Pill */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#080A0C]/90 backdrop-blur text-white text-[10px] font-mono px-2.5 py-1 rounded flex items-center space-x-1.5 border border-white/10">
          <Eye className="w-3 h-3 text-precision-blue" />
          <span>INSPECT</span>
        </div>
      </div>

      {/* Card Footer & Specs Matrix Summary */}
      <div className="p-6 pt-0 mt-auto">
        <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] font-mono border-t border-black/[0.06] dark:border-white/[0.06] pt-3">
          {product.technicalSpecs.slice(0, 2).map((spec, idx) => (
            <div key={idx}>
              <span className="text-[#64748B] dark:text-[#94A3B8] block text-[9px] font-medium uppercase">{spec.label}</span>
              <span className="text-[#080A0C] dark:text-white font-bold truncate block">{spec.value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenDetails(product)}
            className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white text-xs font-mono font-medium transition-colors group/btn cursor-pointer"
          >
            <span>SPECIFICATIONS</span>
            <ChevronRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onOpenEnquiry(product.name)}
            className="p-2.5 rounded-lg bg-precision-blue/10 hover:bg-precision-blue text-precision-blue hover:text-white border border-precision-blue/20 transition-colors cursor-pointer"
            title={`Enquire about ${product.name}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
