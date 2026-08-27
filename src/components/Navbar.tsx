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
      setIsScrolled(window.scrollY > 40);
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
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/92 dark:bg-[#07090B]/90 backdrop-blur-md py-4 border-b border-slate-200 dark:border-white/10 shadow-lg dark:shadow-2xl'
            : 'bg-gradient-to-b from-white/90 dark:from-[#07090B]/90 to-transparent py-5 border-b border-slate-200/40 dark:border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          
          {/* Brand Wordmark & Dot */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-precision-blue dark:bg-white shadow-[0_0_12px_rgba(0,102,255,0.8)] transition-all duration-300" />
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-black tracking-technical text-slate-900 dark:text-white uppercase group-hover:text-precision-blue transition-colors font-display">
                JIAN TOOLS
              </span>
              <span className="text-[8px] font-mono text-slate-500 dark:text-steel-400 tracking-widest uppercase -mt-0.5 font-semibold">
                PRECISION CARBIDE
              </span>
            </div>
          </button>

          {/* Desktop 4-Page Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 p-1 rounded-xl bg-slate-100/80 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-mono">
            
            {/* HOME */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-5 py-2 rounded-lg font-bold transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-precision-blue text-white shadow-md'
                  : 'text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              HOME
            </button>

            {/* PRODUCT */}
            <button
              onClick={() => handleNavClick('products')}
              className={`px-5 py-2 rounded-lg font-bold transition-all duration-200 flex items-center space-x-1.5 ${
                currentPage === 'products'
                  ? 'bg-precision-blue text-white shadow-md'
                  : 'text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              <span>PRODUCT</span>
              <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                currentPage === 'products' ? 'bg-white/20 text-white' : 'bg-precision-blue/10 text-precision-blue'
              }`}>
                11
              </span>
            </button>

            {/* ABOUT */}
            <button
              onClick={() => handleNavClick('about')}
              className={`px-5 py-2 rounded-lg font-bold transition-all duration-200 ${
                currentPage === 'about'
                  ? 'bg-precision-blue text-white shadow-md'
                  : 'text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              ABOUT
            </button>

            {/* CONTACT US */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`px-5 py-2 rounded-lg font-bold transition-all duration-200 ${
                currentPage === 'contact'
                  ? 'bg-precision-blue text-white shadow-md'
                  : 'text-slate-600 dark:text-steel-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5'
              }`}
            >
              CONTACT US
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300 transition-all duration-300 flex items-center justify-center group cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-precision-blue group-hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* Speed & Feed Calculator Trigger */}
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-700 dark:text-steel-300 hover:text-slate-900 dark:hover:text-white transition-all font-semibold cursor-pointer"
              title="Engineering Speed & Feed Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-precision-blue" />
              <span className="hidden xl:inline">SPEED/FEED CALC</span>
            </button>

            {/* Request Quote Button */}
            <button
              onClick={() => onOpenEnquiry()}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-precision-blue hover:bg-blue-600 text-white text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(0,102,255,0.4)] cursor-pointer"
            >
              <span>REQUEST QUOTE</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-steel-300"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-precision-blue" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/80 dark:bg-black/90 backdrop-blur-2xl md:hidden pt-24 px-6 animate-fade-in flex flex-col justify-between pb-10">
          <div className="space-y-3 font-mono text-base">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-3 px-4 rounded-xl font-bold transition-all ${
                currentPage === 'home' ? 'bg-precision-blue text-white' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              HOME
            </button>

            <button
              onClick={() => handleNavClick('products')}
              className={`w-full text-left py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-between ${
                currentPage === 'products' ? 'bg-precision-blue text-white' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              <span>PRODUCT</span>
              <span className="px-2 py-0.5 rounded bg-white/20 text-xs font-bold">11 Categories</span>
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left py-3 px-4 rounded-xl font-bold transition-all ${
                currentPage === 'about' ? 'bg-precision-blue text-white' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              ABOUT
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left py-3 px-4 rounded-xl font-bold transition-all ${
                currentPage === 'contact' ? 'bg-precision-blue text-white' : 'text-slate-200 hover:bg-white/5'
              }`}
            >
              CONTACT US
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenCalculator();
              }}
              className="w-full text-left py-3 px-4 rounded-xl font-bold text-slate-200 hover:bg-white/5 flex items-center space-x-2"
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
              className="w-full py-3.5 rounded-xl bg-precision-blue text-white text-xs font-bold font-mono tracking-wider uppercase text-center shadow-lg"
            >
              REQUEST FOR QUOTE
            </button>
          </div>
        </div>
      )}
    </>
  );
};
