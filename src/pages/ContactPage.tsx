import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Paperclip,
  ArrowRight,
  Globe
} from 'lucide-react';
import { companyContactDetails } from '../data/whyJianTools';

interface ContactPageProps {
  onNavigateHome: () => void;
  onNavigateProducts: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigateHome,
  onNavigateProducts
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    category: 'Modular Drill / Crown Drill',
    workpieceMaterial: 'Structural Steel / Alloy',
    toolDiameter: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello JIAN TOOLS, I am inquiring from your website regarding ${formData.category}. Company: ${formData.company || 'N/A'}`
  );

  return (
    <div className="w-full pt-28 pb-24 bg-slate-50 dark:bg-[#07090B] min-h-screen text-slate-800 dark:text-steel-200 transition-colors duration-300">
      
      {/* CAD Background Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Page Header */}
        <div className="mb-14 pb-8 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-8 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-bold tracking-cad text-precision-blue uppercase">
              CONTACT & APPLICATION ENGINEERING // DIRECT RFQ
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tightest text-slate-900 dark:text-white leading-none mb-4">
            LET'S ENGINEER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
              YOUR NEXT CUT.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-steel-300 max-w-2xl leading-relaxed">
            Connect directly with JIAN TOOLS technical specialists in Makarpura GIDC, Vadodara. Request technical tool drawings, customized carbide geometry, or immediate price quotations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct RFQ Form */}
          <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 p-8 sm:p-10 shadow-sm">
            
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-white/5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Request For Quote (RFQ)
                </h3>
                <p className="text-xs text-slate-500 dark:text-steel-400 mt-1">
                  Our application engineers respond within 4 business hours.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-precision-blue/10 text-precision-blue border border-precision-blue/20">
                FAST SLA: 4 HRS
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-fade-in my-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  Quote Request Received!
                </h4>
                <p className="text-xs text-slate-600 dark:text-steel-300 max-w-md mx-auto mb-6">
                  Thank you, <strong>{formData.name}</strong>. A JIAN TOOLS technical sales engineer will review your specification and contact you at <strong>{formData.email || formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-lg bg-precision-blue text-white text-xs font-bold font-mono"
                >
                  SUBMIT ANOTHER RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                      Company / Machine Shop *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Precision CNC Works"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                      Product Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
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

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                      Diameter / Depth Specification
                    </label>
                    <input
                      type="text"
                      value={formData.toolDiameter}
                      onChange={(e) => setFormData({ ...formData, toolDiameter: e.target.value })}
                      placeholder="e.g. Ø20mm - 5D Reach"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-steel-300 mb-1.5 uppercase">
                    Technical Specifications / Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide workpiece material (e.g. Inconel, SS316, ASTM A516), target cycle times, or specific drawing dimensions..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-precision-blue transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-steel-400 font-mono">
                    <ShieldCheck className="w-4 h-4 text-precision-blue" />
                    <span>Confidentiality Guaranteed</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,102,255,0.4)] flex items-center justify-center space-x-2"
                  >
                    <span>SUBMIT RFQ SPECIFICATION</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Contact Details & Quick WhatsApp */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#122A1E] to-[#0A1A12] border border-[#25D366]/30 text-white shadow-xl">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#25D366] font-bold mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>INSTANT WHATSAPP QUOTATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                Need Immediate Technical Support?
              </h3>
              <p className="text-xs text-steel-300 leading-relaxed mb-6">
                Send your component CAD drawings or cutting parameter questions directly to our engineering desk on WhatsApp for instant evaluation.
              </p>
              <a
                href={`https://wa.me/917984876123?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(37,211,102,0.5)] font-sans"
              >
                <span>CHAT ON WHATSAPP (+91 79848 76123)</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Verified Address & Contact Card */}
            <div className="p-8 rounded-2xl bg-white dark:bg-[#0E1217] border border-slate-200 dark:border-white/10 shadow-sm space-y-6">
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-precision-blue/10 text-precision-blue shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest font-bold">
                    MANUFACTURING FACILITY & SALES OFFICE
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                    {companyContactDetails.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-precision-blue/10 text-precision-blue shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest font-bold">
                    DIRECT PHONE & WHATSAPP
                  </div>
                  <a
                    href="tel:+917984876123"
                    className="text-sm font-bold text-slate-900 dark:text-white hover:text-precision-blue transition-colors mt-1 block"
                  >
                    +91 79848 76123
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-precision-blue/10 text-precision-blue shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 dark:text-steel-500 uppercase tracking-widest font-bold">
                    OPERATING HOURS
                  </div>
                  <div className="text-xs font-mono text-slate-700 dark:text-steel-300 mt-1">
                    {companyContactDetails.operationalHours}
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
