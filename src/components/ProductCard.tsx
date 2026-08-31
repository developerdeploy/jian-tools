import React from 'react';
import { JTProduct } from '../data/jtProducts';
import { ArrowUpRight } from 'lucide-react';

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
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative flex flex-col rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] hover:border-precision-blue dark:hover:border-precision-blue/60 transition-colors overflow-hidden cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-50 dark:bg-black/30 flex items-center justify-center p-4">
        <img
          src={primaryImg?.w600 || primaryImg?.original || ''}
          srcSet={primaryImg ? `${primaryImg.w300} 300w, ${primaryImg.w600} 600w, ${primaryImg.w1200} 1200w` : undefined}
          sizes="(max-width: 640px) 300px, (max-width: 1024px) 600px, 1200px"
          alt={product.name}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 ease-out"
          onError={(e) => {
            const target = e.currentTarget;
            if (primaryImg?.original && target.src !== primaryImg.original) {
              target.src = primaryImg.original;
            }
          }}
        />
      </div>

      {/* Title + Enquiry */}
      <div className="p-5 flex items-center justify-between">
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-precision-blue transition-colors font-display leading-snug">
          {product.name}
        </h3>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenEnquiry(product.name);
          }}
          className="shrink-0 ml-3 p-2 rounded-lg bg-precision-blue/10 hover:bg-precision-blue text-precision-blue hover:text-white border border-precision-blue/20 transition-colors cursor-pointer"
          title={`Enquire about ${product.name}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
