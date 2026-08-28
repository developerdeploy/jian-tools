import React, { useState } from 'react';
import { X, Send, MessageSquare, Phone, CheckCircle2 } from 'lucide-react';
import { companyContactDetails } from '../data/whyJianTools';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialProduct
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    toolType: initialProduct || 'MODULAR DRILL / CROWN DRILL',
    quantity: '1-10 Units',
    message: '',
    hasDrawing: false
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    if (initialProduct) {
      setFormData(prev => ({ ...prev, toolType: initialProduct }));
    }
  }, [initialProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello JIAN TOOLS,\n\nName: ${formData.name || 'Industrial Engineer'}\nCompany: ${formData.company || 'CNC Engineering'}\nRequirement: ${formData.toolType}\nMessage: ${formData.message || 'Please send technical catalogue and price quote.'}`
    );
    window.open(`https://wa.me/917984876123?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 rounded-full bg-black/[0.04] dark:bg-white/[0.04] border border-precision-blue/30 text-precision-blue flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-[#080A0C] dark:text-white mb-1.5 font-display">
              APPLICATION INQUIRY RECEIVED
            </h3>
            <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-md mx-auto mb-6 leading-relaxed">
              Our application engineers in Makarpura GIDC, Vadodara will review your machining specs and contact you within 2 business hours.
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={handleWhatsAppDirect}
                className="px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-medium flex items-center space-x-2 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>CONTINUE ON WHATSAPP</span>
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white text-xs font-mono font-medium cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center space-x-2 text-[10px] font-mono text-precision-blue mb-1 font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-precision-blue" />
                <span>DIRECT APPLICATION ENGINEERING // RFQ</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#080A0C] dark:text-white font-display">
                Talk to JIAN TOOLS
              </h3>
              <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                Request a quote, tool recommendation, or submit your component CAD drawing.
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="flex items-center justify-center space-x-2 p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-[#25D366]/30 text-[#25D366] text-xs font-mono transition-colors font-medium cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WHATSAPP APPLICATION DESK</span>
              </button>

              <a
                href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center space-x-2 p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white text-xs font-mono transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-precision-blue" />
                <span>+91 79848 76123</span>
              </a>
            </div>

            <div className="relative flex py-1 items-center mb-4">
              <div className="flex-grow border-t border-black/[0.06] dark:border-white/[0.06]" />
              <span className="flex-shrink mx-3 text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest">
                OR SUBMIT RFQ SPEC
              </span>
              <div className="flex-grow border-t border-black/[0.06] dark:border-white/[0.06]" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
                    Company / Machine Shop *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Precision CNC"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
                    Tool Category Required *
                  </label>
                  <select
                    value={formData.toolType}
                    onChange={(e) => setFormData({ ...formData, toolType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                  >
                    <option value="MODULAR DRILL / CROWN DRILL">MODULAR DRILL / CROWN DRILL</option>
                    <option value="Deep hole drilling - BTA (BRAZED Type & INDEXABLE Type)">Deep hole drilling - BTA (BRAZED & INDEXABLE)</option>
                    <option value="GUN DRILLS (BRAZED Type & INDEXABLE Type)">GUN DRILLS (BRAZED & INDEXABLE)</option>
                    <option value="bar peeling inserts">bar peeling inserts</option>
                    <option value="tube scarfing">tube scarfing</option>
                    <option value="BTA Tube & Accessories">BTA Tube & Accessories</option>
                    <option value="solid carbide end mills">solid carbide end mills</option>
                    <option value="sold carbide Drills">sold carbide Drills</option>
                    <option value="carbide rods">carbide rods</option>
                    <option value="reamers">reamers</option>
                    <option value="iso turning and milling Inserts">iso turning and milling Inserts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#64748B] dark:text-[#94A3B8] mb-1 text-[10px] uppercase">
                  Machining Application / Component Details
                </label>
                <textarea
                  rows={2}
                  placeholder="Workpiece material (e.g. EN8, SS316, ASTM A516), hole depth, diameter, or tolerances..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors resize-none"
                />
              </div>

              {/* Drawing Attachment Checkbox */}
              <div className="flex items-center space-x-2.5 p-2.5 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06]">
                <input
                  type="checkbox"
                  id="drawingCheck"
                  checked={formData.hasDrawing}
                  onChange={(e) => setFormData({ ...formData, hasDrawing: e.target.checked })}
                  className="w-3.5 h-3.5 rounded text-precision-blue bg-white dark:bg-black border-black/20 dark:border-white/20"
                />
                <label htmlFor="drawingCheck" className="text-[11px] text-[#2D3748] dark:text-[#CBD5E1] cursor-pointer">
                  I have a 2D PDF / 3D CAD drawing to share.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 border border-blue-400/30 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT TECHNICAL ENQUIRY</span>
              </button>
            </form>

            <div className="mt-4 pt-3 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8]">
              <span>MAKARPURA GIDC, VADODARA</span>
              <span>100% QUALITY GUARANTEE</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
