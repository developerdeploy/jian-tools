import React from 'react';
import { companyContactDetails } from '../data/whyJianTools';
import { MapPin, Phone, MessageSquare, Shield, ArrowUp } from 'lucide-react';
import { PageId } from './Navbar';

interface FooterProps {
  onNavigate: (page: PageId, categorySlug?: string) => void;
  onOpenEnquiry: (productName?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenEnquiry
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030405] border-t border-slate-800 text-steel-400 font-mono text-xs overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-precision-blue shadow-[0_0_10px_rgba(0,102,255,0.8)]" />
                <span className="text-lg font-black tracking-technical text-white uppercase font-sans">
                  JIAN TOOLS
                </span>
              </div>

              <p className="text-xs text-steel-300 leading-relaxed max-w-sm mb-4">
                {companyContactDetails.tagline}
              </p>

              <div className="text-[11px] text-precision-blue tracking-widest uppercase mb-6 font-semibold">
                PRECISION • PERFORMANCE • PARTNERSHIP
              </div>
            </div>

            <div className="flex items-center space-x-3 text-[10px] text-steel-500">
              <Shield className="w-4 h-4 text-precision-blue" />
              <span>100% CONTACTLESS OPTICAL METROLOGY VERIFIED</span>
            </div>
          </div>

          {/* Col 2: Product Catalogue Jumpers (Exact 11 Categories) */}
          <div className="lg:col-span-4">
            <div className="text-[11px] text-white font-bold tracking-widest uppercase mb-4">
              PRODUCT PORTFOLIO (11 CATEGORIES) //
            </div>
            <ul className="space-y-2 text-xs text-steel-400">
              <li>
                <button onClick={() => onNavigate('products', 'modular-drill-crown-drill')} className="hover:text-white transition-colors text-left cursor-pointer">
                  01. MODULAR DRILL / CROWN DRILL
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'deep-hole-drilling-bta')} className="hover:text-white transition-colors text-left cursor-pointer">
                  02. Deep hole drilling - BTA (Brazed & Indexable)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'gun-drills')} className="hover:text-white transition-colors text-left cursor-pointer">
                  03. GUN DRILLS (Brazed & Indexable)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'bar-peeling-inserts')} className="hover:text-white transition-colors text-left cursor-pointer">
                  04. Bar Peeling Inserts
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'tube-scarfing')} className="hover:text-white transition-colors text-left cursor-pointer">
                  05. Tube Scarfing (O.D. & I.D.)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'bta-tube-accessories')} className="hover:text-white transition-colors text-left cursor-pointer">
                  06. BTA Tube & Accessories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'solid-carbide-end-mills')} className="hover:text-white transition-colors text-left cursor-pointer">
                  07. Solid Carbide End Mills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'solid-carbide-drills')} className="hover:text-white transition-colors text-left cursor-pointer">
                  08. Solid Carbide Drills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'carbide-rods')} className="hover:text-white transition-colors text-left cursor-pointer">
                  09. Carbide Rods
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'reamers')} className="hover:text-white transition-colors text-left cursor-pointer">
                  10. Reamers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'iso-turning-milling-inserts')} className="hover:text-white transition-colors text-left cursor-pointer">
                  11. ISO Turning and Milling Inserts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Hub & Contact */}
          <div className="lg:col-span-4">
            <div className="text-[11px] text-white font-bold tracking-widest uppercase mb-4">
              MANUFACTURING HUB //
            </div>
            
            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-precision-blue shrink-0 mt-0.5" />
                <span className="text-steel-300 leading-relaxed">
                  {companyContactDetails.address}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-precision-blue shrink-0" />
                <a
                  href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-sky-300 transition-colors font-bold"
                >
                  {companyContactDetails.phone}
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={companyContactDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold"
                >
                  WhatsApp Application Support
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & 4-Page Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-steel-500">
          <div>
            © {new Date().getFullYear()} JIAN TOOLS. ALL RIGHTS RESERVED. (jiantools.in)
          </div>

          <div className="flex items-center space-x-6">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              HOME
            </button>
            <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">
              PRODUCT
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              ABOUT
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              CONTACT US
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-steel-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
