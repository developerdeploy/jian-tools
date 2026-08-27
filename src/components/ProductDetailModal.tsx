import React, { useState } from 'react';
import { JTProduct } from '../data/jtProducts';
import { X, CheckCircle2, ArrowUpRight, MessageSquare, ZoomIn, Settings, Cpu, Layers } from 'lucide-react';
import { companyContactDetails } from '../data/whyJianTools';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 dark:bg-black/90 backdrop-blur-xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-5xl rounded-2xl bg-white dark:bg-[#0D1115] border border-slate-200 dark:border-white/15 shadow-2xl p-6 sm:p-10 my-8 overflow-hidden max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white transition-colors z-20"
          aria-label="Close product detail"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Multi-Image Product Gallery & Zoom */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            
            {/* Main Stage View */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative w-full h-80 sm:h-96 rounded-xl bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 flex items-center justify-center p-6 cursor-zoom-in overflow-hidden shadow-inner group"
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
                  className={`w-full h-full object-contain filter contrast-125 transition-all duration-500 transform ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105'
                  }`}
                />
              </picture>

              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur text-white text-[10px] font-mono px-3 py-1 rounded flex items-center space-x-1.5 shadow-lg">
                <ZoomIn className="w-3 h-3 text-precision-blue" />
                <span>{isZoomed ? 'CLICK TO RESET' : 'CLICK FOR HIGH-RES ZOOM'}</span>
              </div>
            </div>

            {/* Thumbnail Strip (if multiple images exist) */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-lg border p-1 shrink-0 overflow-hidden bg-slate-50 dark:bg-black/40 transition-all ${
                      idx === activeImageIndex
                        ? 'border-precision-blue shadow-md scale-105'
                        : 'border-slate-200 dark:border-white/10 opacity-70 hover:opacity-100'
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

            {/* Carbide Grades Badge Strip (if available) */}
            {product.grades && product.grades.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <div className="text-[10px] font-mono text-slate-500 dark:text-steel-400 uppercase tracking-widest mb-2 font-bold flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-precision-blue" />
                  <span>AVAILABLE MATERIAL GRADES</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.grades.map((grade) => (
                    <span
                      key={grade}
                      className="px-3 py-1 rounded-md bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 text-xs font-mono font-bold text-slate-900 dark:text-white shadow-sm"
                    >
                      {grade}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Product Narrative, Specs & Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category Eyebrow */}
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-precision-blue animate-pulse" />
                <span>CATEGORY: {product.category.toUpperCase()}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                {product.name}
              </h2>

              <p className="text-sm text-slate-600 dark:text-steel-300 leading-relaxed mb-6">
                {product.fullDescription}
              </p>

              {/* Technical Specifications Matrix */}
              <div className="p-5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0D1115]/75 mb-6">
                <h4 className="text-xs font-mono text-slate-500 dark:text-steel-400 uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                  <Settings className="w-3.5 h-3.5 text-precision-blue" />
                  <span>ENGINEERING SPECIFICATIONS</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  {product.technicalSpecs.map((spec, idx) => (
                    <div key={idx} className="p-2.5 rounded bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 shadow-sm">
                      <div className="text-[9px] text-slate-400 dark:text-steel-500 font-semibold uppercase">{spec.label}</div>
                      <div className="text-slate-900 dark:text-white font-bold mt-0.5">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h4 className="text-xs font-mono text-slate-500 dark:text-steel-400 uppercase tracking-widest mb-3 flex items-center space-x-2 font-bold">
                  <Cpu className="w-3.5 h-3.5 text-precision-blue" />
                  <span>MACHINING PERFORMANCE HIGHLIGHTS</span>
                </h4>
                <ul className="space-y-2">
                  {product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 dark:text-steel-300">
                      <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    const name = product.name;
                    onClose();
                    onOpenEnquiry(name);
                  }}
                  className="w-full sm:flex-1 inline-flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,102,255,0.4)]"
                >
                  <span>REQUEST QUOTE / RFQ</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleWhatsAppEnquiry}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP INQUIRY</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-steel-500 pt-2">
                <span>GENUINE JIAN TOOLS INDUSTRIAL ASSET</span>
                <span>MAKARPURA GIDC, VADODARA</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
