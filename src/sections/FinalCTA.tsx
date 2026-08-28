import React from 'react';
import { companyContactDetails } from '../data/whyJianTools';
import { Phone, MapPin, ArrowUpRight, Clock, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenEnquiry: () => void;
  onOpenCatalogue: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenEnquiry, onOpenCatalogue }) => {
  return (
    <section id="contact" className="relative w-full py-24 bg-[#F3F3F1] dark:bg-[#080A0C] border-b border-black/[0.08] dark:border-white/[0.08] overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bold Headline & Action */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-widest text-[#64748B] dark:text-[#94A3B8] px-2.5 py-1 rounded bg-white dark:bg-[#111417] border border-black/[0.08] dark:border-white/[0.08] mb-4 font-semibold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-precision-blue" />
              <span>DIRECT APPLICATION ENGINEERING</span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#080A0C] dark:text-white leading-[0.92] mb-4 font-display">
              LET'S ENGINEER <br />
              <span className="text-[#64748B] dark:text-[#94A3B8]">THE NEXT CUT.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed max-w-xl mb-8">
              Discuss your tooling requirement, scarfing inserts, deep-hole drilling, or send a component drawing for a tailored carbide tooling proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider uppercase transition-colors border border-blue-400/30 cursor-pointer"
              >
                <span>TALK TO JIAN TOOLS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenCatalogue}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-[#080A0C] dark:text-white text-xs font-mono font-medium tracking-wider uppercase border border-black/[0.08] dark:border-white/[0.08] transition-colors cursor-pointer"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Verified Contact Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#111417] relative overflow-hidden">
              <div className="text-[10px] font-mono text-precision-blue font-bold tracking-widest uppercase mb-5">
                HEADQUARTERS & MANUFACTURING HUB //
              </div>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-precision-blue shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-0.5 font-semibold">
                      FACILITY LOCATION
                    </div>
                    <div className="text-xs font-semibold text-[#080A0C] dark:text-white leading-relaxed">
                      {companyContactDetails.address}
                    </div>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-precision-blue shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-0.5 font-semibold">
                      DIRECT PHONE & WHATSAPP
                    </div>
                    <a
                      href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                      className="text-xs font-mono font-bold text-[#080A0C] dark:text-white hover:text-precision-blue transition-colors"
                    >
                      {companyContactDetails.phone}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-md bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-precision-blue shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8] uppercase tracking-wider mb-0.5 font-semibold">
                      OPERATING HOURS
                    </div>
                    <div className="text-xs font-mono text-[#64748B] dark:text-[#94A3B8]">
                      {companyContactDetails.operationalHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-[10px] font-mono text-[#64748B] dark:text-[#94A3B8]">
                <span className="text-precision-blue font-bold">STATUS: </span>
                APPLICATION ENGINEERS ACTIVE & READY FOR RFQ
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
