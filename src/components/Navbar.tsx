import React, { useState, useEffect } from 'react';
import { Menu, X, Calculator, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export type PageId = 'home' | 'products' | 'about' | 'contact' | 'animation-soon';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, categorySlug?: string) => void;
  onOpenEnquiry: (productName?: string) => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenEnquiry,
  onOpenCalculator
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#F3F3F1]/95 dark:bg-[#080A0C]/95 backdrop-blur-md py-3.5 border-b border-black/[0.08] dark:border-white/[0.08]'
            : 'bg-transparent py-4 border-b border-black/[0.05] dark:border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark & Precision Datum */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left cursor-pointer focus:outline-none"
            aria-label="JIAN TOOLS Home"
          >
            <span className="w-2 h-2 rounded-full bg-precision-blue shrink-0" />
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-widest text-[#080A0C] dark:text-white uppercase font-display group-hover:text-precision-blue transition-colors">
                JIAN TOOLS
              </span>
              <span className="text-[9px] font-mono text-[#64748B] dark:text-[#94A3B8] tracking-widest uppercase -mt-0.5 font-medium">
                PRECISION CARBIDE
              </span>
            </div>
          </button>

          {/* Desktop 4-Page Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 p-1 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-xs font-mono">
            
            {/* HOME */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-4 py-1.5 rounded-md font-medium transition-all ${
                currentPage === 'home'
                  ? 'bg-white dark:bg-[#14181D] text-[#080A0C] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              HOME
            </button>

            {/* PRODUCT */}
            <button
              onClick={() => handleNavClick('products')}
              className={`px-4 py-1.5 rounded-md font-medium transition-all flex items-center space-x-1.5 ${
                currentPage === 'products'
                  ? 'bg-white dark:bg-[#14181D] text-[#080A0C] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              <span>PRODUCT</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-precision-blue/10 text-precision-blue">
                11
              </span>
            </button>

            {/* ABOUT */}
            <button
              onClick={() => handleNavClick('about')}
              className={`px-4 py-1.5 rounded-md font-medium transition-all ${
                currentPage === 'about'
                  ? 'bg-white dark:bg-[#14181D] text-[#080A0C] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              ABOUT
            </button>

            {/* CONTACT US */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-4 py-1.5 rounded-md font-medium transition-all ${
                currentPage === 'contact'
                  ? 'bg-white dark:bg-[#14181D] text-[#080A0C] dark:text-white shadow-sm border border-black/[0.05] dark:border-white/[0.08]'
                  : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#080A0C] dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
              }`}
            >
              CONTACT US
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.06] text-[#64748B] dark:text-[#94A3B8] transition-colors flex items-center justify-center cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-[#F59E0B]" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-precision-blue" />
              )}
            </button>

            {/* Speed & Feed Calculator Trigger */}
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] hover:bg-black/[0.08] dark:hover:bg-white/[0.08] border border-black/[0.06] dark:border-white/[0.06] text-xs font-mono text-[#2D3748] dark:text-[#CBD5E1] transition-colors font-medium cursor-pointer"
              title="Engineering Speed & Feed Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-precision-blue" />
              <span className="hidden xl:inline">SPEED/FEED CALC</span>
            </button>

            {/* Request Quote Button */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-medium tracking-wider transition-colors cursor-pointer border border-blue-500/30"
            >
              <span>REQUEST QUOTE</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[#64748B] dark:text-[#94A3B8]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F59E0B]" /> : <Moon className="w-4 h-4 text-precision-blue" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] text-[#080A0C] dark:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080A0C]/95 backdrop-blur-xl md:hidden pt-24 px-6 animate-fade-in flex flex-col justify-between pb-10">
          <div className="space-y-2 font-mono text-sm">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all ${
                currentPage === 'home' ? 'bg-precision-blue text-white' : 'text-[#94A3B8] hover:bg-white/5'
              }`}
            >
              HOME
            </button>

            <button
              onClick={() => handleNavClick('products')}
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-between ${
                currentPage === 'products' ? 'bg-precision-blue text-white' : 'text-[#94A3B8] hover:bg-white/5'
              }`}
            >
              <span>PRODUCT</span>
              <span className="px-2 py-0.5 rounded bg-white/20 text-xs font-bold">11 Categories</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all ${
                currentPage === 'about' ? 'bg-precision-blue text-white' : 'text-[#94A3B8] hover:bg-white/5'
              }`}
            >
              ABOUT
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left py-3 px-4 rounded-lg font-medium transition-all ${
                currentPage === 'contact' ? 'bg-precision-blue text-white' : 'text-[#94A3B8] hover:bg-white/5'
              }`}
            >
              CONTACT US
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full text-left py-3 px-4 rounded-lg font-medium text-[#94A3B8] hover:bg-white/5 flex items-center space-x-2"
            >
              <Calculator className="w-4 h-4 text-precision-blue" />
              <span>SPEED & FEED CALCULATOR</span>
            </button>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-3 rounded-lg bg-precision-blue text-white text-xs font-medium font-mono tracking-wider uppercase text-center"
            >
              REQUEST FOR QUOTE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
