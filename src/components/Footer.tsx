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
    <footer className="relative w-full bg-[#080A0C] border-t border-white/[0.08] text-[#94A3B8] font-mono text-xs overflow-hidden">
      {/* Background CAD Grid */}
      <div className="absolute inset-0 bg-cad-grid opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 pt-16 pb-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2.5 mb-3">
                <span className="w-2 h-2 rounded-full bg-precision-blue" />
                <span className="text-base font-bold tracking-widest text-white uppercase font-mono">
                  JIAN TOOLS
                </span>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm mb-4 font-sans">
                {companyContactDetails.tagline}
              </p>

              <div className="text-[10px] text-precision-blue tracking-widest uppercase mb-4 font-medium">
                PRECISION • PERFORMANCE • PARTNERSHIP
              </div>
            </div>

            <div className="flex items-center space-x-2 text-[10px] text-[#64748B]">
              <Shield className="w-3.5 h-3.5 text-precision-blue" />
              <span>100% CONTACTLESS OPTICAL METROLOGY</span>
            </div>
          </div>

          {/* Col 2: Product Catalogue Jumpers (Exact 11 Categories) */}
          <div className="lg:col-span-4">
            <div className="text-[10px] text-white font-bold tracking-widest uppercase mb-3">
              TOOLING CATALOGUE (11 CATEGORIES) //
            </div>
            <ul className="space-y-1.5 text-xs text-[#94A3B8]">
              <li>
                <button onClick={() => onNavigate('products', 'modular-drill-crown-drill')} className="hover:text-white transition-colors text-left cursor-pointer">
                  01. MODULAR DRILL / CROWN DRILL
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'deep-hole-drilling-bta')} className="hover:text-white transition-colors text-left cursor-pointer">
                  02. Deep Hole BTA Drills
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products', 'gun-drills')} className="hover:text-white transition-colors text-left cursor-pointer">
                  03. Gun Drills (Brazed & Indexable)
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
                  11. ISO Turning & Milling Inserts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing Hub & Contact */}
          <div className="lg:col-span-4">
            <div className="text-[10px] text-white font-bold tracking-widest uppercase mb-3">
              MANUFACTURING HUB //
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-3.5 h-3.5 text-precision-blue shrink-0 mt-0.5" />
                <span className="text-[#CBD5E1] leading-relaxed">
                  {companyContactDetails.address}
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-3.5 h-3.5 text-precision-blue shrink-0" />
                <a
                  href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-precision-blue transition-colors font-bold"
                >
                  {companyContactDetails.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <a
                  href={companyContactDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline transition-colors font-bold"
                >
                  WhatsApp Engineering Desk
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Navigation Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-[#64748B]">
          <div>
            © {new Date().getFullYear()} JIAN TOOLS (jiantools.in). ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-5">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">
              HOME
            </button>
            <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">
              PRODUCTS
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
              ABOUT
            </button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
              CONTACT
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
