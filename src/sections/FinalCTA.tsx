import React from 'react';
import { companyContactDetails } from '../data/whyJianTools';
import { Phone, MapPin, ArrowUpRight, Clock, ArrowRight } from 'lucide-react';

interface FinalCTAProps {
  onOpenEnquiry: () => void;
  onOpenCatalogue: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenEnquiry, onOpenCatalogue }) => {
  return (
    <section id="contact" className="relative w-full py-20 bg-[#F5F5F3] dark:bg-[#0a0a0a] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Headline & Actions */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight mb-4 font-display">
              Ready to discuss your
              <span className="block text-gray-400 dark:text-gray-500">tooling requirements?</span>
            </h2>

            <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mb-8">
              Share your component drawing, discuss deep-hole drilling needs, or request a tailored carbide tooling proposal from our application engineers.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-precision-blue hover:bg-blue-700 text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Talk to Jian Tools</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCatalogue}
                className="inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/15 text-gray-900 dark:text-white text-sm font-medium transition-colors cursor-pointer"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Contact Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141414]">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-5">
                Manufacturing & Contact
              </h3>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-md bg-gray-50 dark:bg-white/5 text-precision-blue shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 font-medium">Location</div>
                    <div className="text-sm text-gray-900 dark:text-white leading-relaxed">
                      {companyContactDetails.address}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-md bg-gray-50 dark:bg-white/5 text-precision-blue shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 font-medium">Phone & WhatsApp</div>
                    <a
                      href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                      className="text-sm font-semibold text-gray-900 dark:text-white hover:text-precision-blue transition-colors font-mono"
                    >
                      {companyContactDetails.phone}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-md bg-gray-50 dark:bg-white/5 text-precision-blue shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-0.5 font-medium">Hours</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {companyContactDetails.operationalHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
