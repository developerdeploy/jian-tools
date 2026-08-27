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
    toolType: initialProduct || 'Modular Drill (1D-12D)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 dark:bg-black/85 light:bg-slate-900/60 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0D1115] dark:bg-[#0D1115] light:bg-white border border-white/15 dark:border-white/15 light:border-slate-200 shadow-2xl p-6 sm:p-8 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 text-steel-400 dark:text-steel-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white dark:text-white light:text-slate-900 mb-2">
              APPLICATION INQUIRY RECEIVED
            </h3>
            <p className="text-sm text-steel-300 dark:text-steel-300 light:text-slate-600 max-w-md mx-auto mb-8">
              Our application engineers in Makarpura GIDC, Vadodara will review your machining specs and contact you within 2 business hours.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleWhatsAppDirect}
                className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold tracking-wider flex items-center space-x-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONTINUE ON WHATSAPP</span>
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-6 py-3 rounded-lg bg-white/10 dark:bg-white/10 light:bg-slate-100 text-white dark:text-white light:text-slate-900 text-xs font-semibold"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-2 text-xs font-mono text-precision-blue mb-1">
                <span className="w-2 h-2 rounded-full bg-precision-blue animate-pulse" />
                <span>DIRECT APPLICATION ENGINEERING // RFQ</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white dark:text-white light:text-slate-900">
                TALK TO JIAN TOOLS
              </h3>
              <p className="text-xs sm:text-sm text-steel-400 dark:text-steel-400 light:text-slate-600 mt-1">
                Request a quote, tool recommendation, or submit your component CAD drawing.
              </p>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-emerald-950/40 dark:bg-emerald-950/40 light:bg-emerald-50 hover:bg-emerald-900/50 dark:hover:bg-emerald-900/50 light:hover:bg-emerald-100 border border-emerald-500/30 text-emerald-400 dark:text-emerald-400 light:text-emerald-700 text-xs font-mono transition-all font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>WHATSAPP APPLICATION TEAM</span>
              </button>

              <a
                href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-slate-200 border border-white/10 dark:border-white/10 light:border-slate-200 text-white dark:text-white light:text-slate-900 text-xs font-mono transition-all font-semibold"
              >
                <Phone className="w-4 h-4 text-precision-blue" />
                <span>CALL: +91 79848 76123</span>
              </a>
            </div>

            <div className="relative flex py-2 items-center mb-6">
              <div className="flex-grow border-t border-white/10 dark:border-white/10 light:border-slate-200" />
              <span className="flex-shrink mx-4 text-[10px] font-mono text-steel-500 dark:text-steel-500 light:text-slate-500 uppercase tracking-widest">
                OR SUBMIT RFQ FORM
              </span>
              <div className="flex-grow border-t border-white/10 dark:border-white/10 light:border-slate-200" />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajesh Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
                    Company / Machine Shop *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Precision CNC"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
                    Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
                    Tool Category Required *
                  </label>
                  <select
                    value={formData.toolType}
                    onChange={(e) => setFormData({ ...formData, toolType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#07090B] dark:bg-[#07090B] light:bg-white border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue transition-colors"
                  >
                    <option value="Modular Drill (1D-12D)">Modular Drills (1D–12D)</option>
                    <option value="Solid Carbide Endmills">Solid Carbide Endmills</option>
                    <option value="Precision Reamers">Precision Reamers (H7)</option>
                    <option value="Helical Threadmills">Helical Threadmills</option>
                    <option value="Special Customised Tooling">Special Customised Tooling</option>
                    <option value="CNC Turning Tools & Inserts">CNC Turning Tools & Inserts</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-steel-400 dark:text-steel-400 light:text-slate-600 mb-1 text-[10px] uppercase">
                  Machining Application / Component Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention workpiece material (e.g. EN8, SS316, Cast Iron), hole depth, diameter, or tolerances..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-black/50 dark:bg-black/50 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 focus:outline-none focus:border-precision-blue transition-colors resize-none"
                />
              </div>

              {/* Drawing Attachment Checkbox */}
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/5 dark:border-white/5 light:border-slate-200">
                <input
                  type="checkbox"
                  id="drawingCheck"
                  checked={formData.hasDrawing}
                  onChange={(e) => setFormData({ ...formData, hasDrawing: e.target.checked })}
                  className="w-4 h-4 rounded text-precision-blue bg-black border-white/20 focus:ring-0"
                />
                <label htmlFor="drawingCheck" className="text-[11px] text-steel-300 dark:text-steel-300 light:text-slate-700 cursor-pointer">
                  I have a 2D PDF / 3D CAD drawing to share via WhatsApp / Email.
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(0,102,255,0.4)] flex items-center justify-center space-x-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT TECHNICAL ENQUIRY</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-between text-[9px] font-mono text-steel-500 dark:text-steel-500 light:text-slate-500">
              <span>FACILITY: MAKARPURA GIDC, VADODARA</span>
              <span>100% QUALITY GUARANTEE</span>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
