import React from 'react';
import { companyContactDetails } from '../data/whyJianTools';
import { MessageSquare, Phone, MapPin, ArrowUpRight, Clock, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenEnquiry: () => void;
  onOpenCatalogue: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenEnquiry, onOpenCatalogue }) => {
  return (
    <section id="contact" className="relative w-full py-32 bg-slate-50 dark:bg-[#040507] border-t border-slate-200 dark:border-white/10 overflow-hidden">
      {/* Background CAD Lines & Glow */}
      <div className="absolute inset-0 bg-cad-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-precision-blue/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Bold Headline & Action */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-cad text-precision-blue px-3 py-1 rounded bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 mb-6 shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-precision-blue animate-pulse" />
              <span>DIRECT APPLICATION ENGINEERING</span>
            </div>

            <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tightest text-slate-900 dark:text-white leading-[0.88] mb-6">
              LET'S ENGINEER <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 via-slate-900 to-slate-600 dark:from-steel-200 dark:via-white dark:to-steel-400">
                THE NEXT CUT.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-steel-400 font-normal leading-relaxed max-w-xl mb-10">
              Discuss your tooling requirement, scarfing inserts, deep-hole drilling, or send a component drawing for a tailored carbide tooling proposal.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-precision-blue hover:bg-blue-600 text-white text-xs font-bold tracking-loose uppercase transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(0,102,255,0.5)] border border-blue-400/30 group"
              >
                <span>TALK TO JIAN TOOLS</span>
                <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenCatalogue}
                className="inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl bg-white dark:bg-white/5 text-slate-900 dark:text-white text-xs font-bold tracking-loose uppercase border border-slate-300 dark:border-white/15 transition-all duration-300 hover:border-precision-blue shadow-sm group"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Verified Contact Card */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-[#0D1115]/80 shadow-lg dark:shadow-2xl relative overflow-hidden">
              <div className="text-xs font-mono text-precision-blue font-bold mb-6">
                HEADQUARTERS & MANUFACTURING HUB //
              </div>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-precision-blue shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-steel-500 uppercase tracking-wider mb-1 font-semibold">
                      FACILITY LOCATION
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {companyContactDetails.address}
                    </div>
                  </div>
                </div>

                {/* Direct Phone */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-precision-blue shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-steel-500 uppercase tracking-wider mb-1 font-semibold">
                      DIRECT PHONE & WHATSAPP
                    </div>
                    <a
                      href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                      className="text-base font-mono font-bold text-slate-900 dark:text-white hover:text-precision-blue transition-colors"
                    >
                      {companyContactDetails.phone}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-precision-blue shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-slate-500 dark:text-steel-500 uppercase tracking-wider mb-1 font-semibold">
                      OPERATING HOURS
                    </div>
                    <div className="text-xs font-mono text-slate-700 dark:text-steel-300">
                      {companyContactDetails.operationalHours}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10 text-[11px] font-mono text-slate-600 dark:text-steel-400">
                <span className="text-precision-blue font-bold">STATUS: </span>
                APPLICATION ENGINEERS ACTIVE & READY FOR CONSULTATION
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
