import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
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
    category: 'MODULAR DRILL / CROWN DRILL',
    workpieceMaterial: '',
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
    <div className="w-full pt-28 pb-24 bg-[#F3F3F1] dark:bg-[#080A0C] min-h-screen text-[#080A0C] dark:text-[#E2E8F0]">
      
      {/* CAD Background Grid */}
      <div className="fixed inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Page Header */}
        <div className="mb-12 pb-6 border-b border-black/[0.08] dark:border-white/[0.08]">
          <div className="flex items-center space-x-3 mb-3">
            <span className="w-6 h-px bg-precision-blue" />
            <span className="text-[11px] font-mono font-medium tracking-widest text-[#64748B] dark:text-[#94A3B8] uppercase">
              CONTACT & APPLICATION ENGINEERING // DIRECT RFQ
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#080A0C] dark:text-white leading-none mb-3 font-display">
            LET'S ENGINEER <br />
            <span className="text-[#64748B] dark:text-[#94A3B8]">YOUR NEXT CUT.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Connect directly with JIAN TOOLS technical specialists in Makarpura GIDC, Vadodara. Request technical tool drawings, customized carbide geometry, or immediate price quotations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct RFQ Form */}
          <div className="lg:col-span-7 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] p-6 sm:p-8">
            
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/[0.06] dark:border-white/[0.06]">
              <div>
                <h3 className="text-xl font-bold text-[#080A0C] dark:text-white font-display">
                  Request For Quote (RFQ)
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-0.5">
                  Our application engineers respond within 4 business hours.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.04] text-precision-blue border border-precision-blue/20">
                SLA: 4 HRS
              </span>
            </div>

            {isSubmitted ? (
              <div className="p-8 rounded-lg bg-black/[0.02] dark:bg-black/30 border border-black/[0.06] dark:border-white/[0.06] text-center animate-fade-in my-6">
                <CheckCircle2 className="w-10 h-10 text-precision-blue mx-auto mb-3" />
                <h4 className="text-lg font-bold text-[#080A0C] dark:text-white mb-1 font-display">
                  Quote Request Received
                </h4>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. A JIAN TOOLS technical sales engineer will review your specification and contact you at <strong>{formData.email || formData.phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2 rounded-lg bg-precision-blue text-white text-xs font-mono font-medium"
                >
                  SUBMIT ANOTHER RFQ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rajesh Sharma"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                      Company / Machine Shop *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Precision CNC Works"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                      Product Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
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
                    <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                      Diameter / Depth Specification
                    </label>
                    <input
                      type="text"
                      value={formData.toolDiameter}
                      onChange={(e) => setFormData({ ...formData, toolDiameter: e.target.value })}
                      placeholder="e.g. Ø20mm - 5D Reach"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono font-medium text-[#64748B] dark:text-[#94A3B8] mb-1 uppercase">
                    Technical Specifications / Workpiece Material
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Workpiece material (e.g. Inconel, SS316, ASTM A516), target cycle times, or drawing details..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/[0.02] dark:bg-black/40 border border-black/[0.08] dark:border-white/[0.08] text-xs font-mono text-[#080A0C] dark:text-white focus:outline-none focus:border-precision-blue transition-colors resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="flex items-center space-x-2 text-[11px] text-[#64748B] dark:text-[#94A3B8] font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-precision-blue" />
                    <span>Confidentiality Guaranteed</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors flex items-center justify-center space-x-2 border border-blue-400/30 cursor-pointer"
                  >
                    <span>SUBMIT RFQ SPECIFICATION</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Right Column: Contact Details & Quick WhatsApp */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Direct WhatsApp Callout */}
            <div className="p-6 sm:p-8 rounded-xl bg-[#111417] border border-white/[0.08] text-white">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#25D366] font-bold mb-2">
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP TECHNICAL DESK</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2 font-display">
                Immediate Application Engineering Support
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed mb-5">
                Send your component CAD drawings or cutting parameter questions directly to our engineering desk on WhatsApp for instant evaluation.
              </p>
              <a
                href={`https://wa.me/917984876123?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors"
              >
                <span>CHAT ON WHATSAPP (+91 79848 76123)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Verified Address & Contact Card */}
            <div className="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] space-y-5">
              
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] text-precision-blue shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest font-bold">
                    FACILITY LOCATION
                  </div>
                  <div className="text-xs font-semibold text-[#080A0C] dark:text-white mt-0.5 leading-relaxed">
                    {companyContactDetails.address}
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] text-precision-blue shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest font-bold">
                    DIRECT PHONE & WHATSAPP
                  </div>
                  <a
                    href="tel:+917984876123"
                    className="text-xs font-mono font-bold text-[#080A0C] dark:text-white hover:text-precision-blue transition-colors mt-0.5 block"
                  >
                    +91 79848 76123
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] text-precision-blue shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-widest font-bold">
                    OPERATING HOURS
                  </div>
                  <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8] mt-0.5">
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
