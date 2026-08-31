import React from 'react';
import { companyContactDetails } from '../data/whyJianTools';
import { MapPin, Phone, MessageSquare, ArrowUp } from 'lucide-react';
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
    <footer className="relative w-full bg-gray-900 dark:bg-[#0a0a0a] border-t border-gray-800 dark:border-white/5 text-gray-400 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-gray-800 dark:border-white/5">
          
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="text-lg font-bold text-white mb-3 font-display">
              Jian Tools
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm mb-4">
              {companyContactDetails.tagline}
            </p>
          </div>

          {/* Product Links */}
          <div className="lg:col-span-4">
            <div className="text-sm text-white font-semibold mb-3">Products</div>
            <ul className="space-y-1.5 text-sm text-gray-400">
              <li><button onClick={() => onNavigate('products', 'modular-drill-crown-drill')} className="hover:text-white transition-colors text-left cursor-pointer">Modular Drill / Crown Drill</button></li>
              <li><button onClick={() => onNavigate('products', 'deep-hole-drilling-bta')} className="hover:text-white transition-colors text-left cursor-pointer">Deep Hole BTA Drills</button></li>
              <li><button onClick={() => onNavigate('products', 'gun-drills')} className="hover:text-white transition-colors text-left cursor-pointer">Gun Drills</button></li>
              <li><button onClick={() => onNavigate('products', 'bar-peeling-inserts')} className="hover:text-white transition-colors text-left cursor-pointer">Bar Peeling Inserts</button></li>
              <li><button onClick={() => onNavigate('products', 'tube-scarfing')} className="hover:text-white transition-colors text-left cursor-pointer">Tube Scarfing</button></li>
              <li><button onClick={() => onNavigate('products', 'bta-tube-accessories')} className="hover:text-white transition-colors text-left cursor-pointer">BTA Tube & Accessories</button></li>
              <li><button onClick={() => onNavigate('products', 'solid-carbide-end-mills')} className="hover:text-white transition-colors text-left cursor-pointer">Solid Carbide End Mills</button></li>
              <li><button onClick={() => onNavigate('products', 'solid-carbide-drills')} className="hover:text-white transition-colors text-left cursor-pointer">Solid Carbide Drills</button></li>
              <li><button onClick={() => onNavigate('products', 'carbide-rods')} className="hover:text-white transition-colors text-left cursor-pointer">Carbide Rods</button></li>
              <li><button onClick={() => onNavigate('products', 'reamers')} className="hover:text-white transition-colors text-left cursor-pointer">Reamers</button></li>
              <li><button onClick={() => onNavigate('products', 'iso-turning-milling-inserts')} className="hover:text-white transition-colors text-left cursor-pointer">ISO Turning & Milling Inserts</button></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-4">
            <div className="text-sm text-white font-semibold mb-3">Contact Us</div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2.5">
                <span className="text-gray-300 font-medium">Owner & Contact Person: Nitin</span>
              </div>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-precision-blue shrink-0 mt-0.5" />
                <span className="text-gray-300 leading-relaxed">
                  {companyContactDetails.address}
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-precision-blue shrink-0" />
                <a
                  href={`tel:${companyContactDetails.phone.replace(/\s+/g, '')}`}
                  className="text-white hover:text-precision-blue transition-colors font-semibold font-mono"
                >
                  {companyContactDetails.phone}
                </a>
              </div>

              <div className="flex items-center space-x-2.5">
                <MessageSquare className="w-4 h-4 text-green-500 shrink-0" />
                <a
                  href={companyContactDetails.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:underline transition-colors font-medium"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Jian Tools (jiantools.in). All rights reserved.
          </div>

          <div className="flex items-center space-x-5">
            <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer">Home</button>
            <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors cursor-pointer">Products</button>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">Contact Us</button>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
