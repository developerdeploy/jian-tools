import React, { useState } from 'react';
import { JTProduct } from '../data/jtProducts';
import { X, CheckCircle2, ArrowUpRight, MessageSquare, ZoomIn, Settings, Cpu, Layers } from 'lucide-react';

interface ProductDetailModalProps {
  product: JTProduct | null;
  onClose: () => void;
  onOpenEnquiry: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenEnquiry
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  if (!product) return null;

  const currentImg = product.images[activeImageIndex] || product.images[0];

  const handleWhatsAppEnquiry = () => {
    const text = encodeURIComponent(
      `Hello JIAN TOOLS,\n\nI am interested in:\nTool: ${product.name}\nCategory: ${product.category}\n\nPlease share technical datasheet, CAD drawing, and price quotation.`
    );
    window.open(`https://wa.me/917984876123?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 my-8 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white transition-colors z-20 cursor-pointer"
          aria-label="Close product detail"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-Image Product Gallery & Zoom */}
          <div className="lg:col-span-6 flex flex-col space-y-3">
            
            {/* Main Stage View */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative w-full h-80 sm:h-96 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center p-6 cursor-zoom-in overflow-hidden group"
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={`
                    ${currentImg.w600} 600w,
                    ${currentImg.w1200} 1200w,
                    ${currentImg.original} 4096w
                  `}
                  sizes="(max-width: 640px) 600px, 1200px"
                />
                <img
                  src={currentImg.w1200}
                  alt={product.name}
                  className={`w-full h-full object-contain filter contrast-110 transition-transform duration-300 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
                  }`}
                />
              </picture>

              <div className="absolute bottom-3 right-3 bg-[#080A0C]/90 text-white text-[10px] font-mono px-2.5 py-1 rounded flex items-center space-x-1.5 border border-white/10">
                <ZoomIn className="w-3 h-3 text-precision-blue" />
                <span>{isZoomed ? 'RESET' : 'ZOOM'}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg border p-1 shrink-0 overflow-hidden bg-black/[0.02] dark:bg-black/30 transition-colors cursor-pointer ${
                      idx === activeImageIndex
                        ? 'border-precision-blue'
                        : 'border-black/[0.06] dark:border-white/[0.06] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.w300}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Carbide Grades Strip */}
            {product.grades && product.grades.length > 0 && (
              <div className="p-3.5 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest mb-1.5 font-bold flex items-center space-x-1.5">
                  <Layers className="w-3 h-3 text-precision-blue" />
                  <span>MATERIAL GRADES</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {product.grades.map((grade) => (
                    <span
                      key={grade}
                      className="px-2.5 py-0.5 rounded bg-white dark:bg-[#1E293B] border border-black/[0.06] dark:border-white/[0.06] text-xs font-mono font-bold text-[#080A0C] dark:text-white"
                    >
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Product Narrative, Specs & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div>
              {/* Category Eyebrow */}
              <div className="flex items-center space-x-2 text-[10px] font-mono text-precision-blue mb-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-precision-blue" />
                <span>CATEGORY: {product.category.toUpperCase()}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-[#080A0C] dark:text-white mb-2 font-display">
                {product.name}
              </h2>

              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed mb-4">
                {product.fullDescription}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="p-4 rounded-lg border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-black/30 mb-4">
                <h4 className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest mb-2.5 flex items-center space-x-1.5 font-bold">
                  <Settings className="w-3 h-3 text-precision-blue" />
                  <span>ENGINEERING SPECIFICATIONS</span>
                </h4>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {product.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="p-2 rounded bg-white dark:bg-[#111417] border border-black/[0.06] dark:border-white/[0.06]">
                      <div className="text-[9px] text-[#64748B] dark:text-[#94A3B8] font-medium uppercase">{spec.label}</div>
                      <div className="text-[#080A0C] dark:text-white font-bold mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-4">
                <h4 className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest mb-2 flex items-center space-x-1.5 font-bold">
                  <Cpu className="w-3 h-3 text-precision-blue" />
                  <span>PERFORMANCE HIGHLIGHTS</span>
                </h4>
                <ul className="space-y-1.5">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-[#2D3748] dark:text-[#CBD5E1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-precision-blue shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.06] space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => {
                    const name = product.name;
                    onClose();
                    onOpenEnquiry(name);
                  }}
                  className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors border border-blue-400/30 cursor-pointer"
                >
                  <span>REQUEST QUOTE / RFQ</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WHATSAPP</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8] pt-1">
                <span>JIAN TOOLS INDUSTRIAL ASSET</span>
                <span>MAKARPURA GIDC, VADODARA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
