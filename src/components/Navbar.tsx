import React, { useState, useEffect } from 'react';
import { Menu, X, Calculator, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export type PageId = 'home' | 'products' | 'about' | 'contact' | 'applications' | 'technical' | 'animation-soon' | 'calculators';

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
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const navStructure = [
    { id: 'home', label: 'HOME', type: 'link' },
    { id: 'about', label: 'ABOUT JIAN TOOLS', type: 'link' },
    {
      id: 'products',
      label: 'PRODUCTS',
      type: 'dropdown',
      items: [
        { label: 'Modular Drills', slug: 'modular-drill-crown-drill' },
        { label: 'Cartridges', slug: 'cartridge-type-drill' },
        { label: 'Inserts', slug: 'scarfing-inserts' },
        { label: 'Pilot Drills', slug: 'gun-drills' },
        { label: 'Special Tools', slug: 'special-tools' }
      ]
    },
    {
      id: 'applications',
      label: 'APPLICATIONS',
      type: 'dropdown',
      items: [
        { label: 'Heat Exchanger Drilling', slug: 'heat-exchanger' },
        { label: 'Structural Steel Drilling', slug: 'structural-steel' },
        { label: 'Plate Drilling', slug: 'plate' },
        { label: 'Flange Drilling', slug: 'flange' },
        { label: 'Heavy Engineering', slug: 'heavy-engineering' }
      ]
    },
    {
      id: 'technical',
      label: 'TECHNICAL',
      type: 'dropdown',
      items: [
        { label: 'Tool Selection', slug: 'tool-selection' },
        { label: 'Cutting Parameters', slug: 'cutting-parameters' },
        { label: 'Hole Diameter Range', slug: 'diameter-range' },
        { label: 'Materials', slug: 'materials' },
        { label: 'Downloads / Catalogue', slug: 'downloads' }
      ]
    },
    { id: 'calculators', label: 'CALCULATORS', type: 'link' },
    { id: 'contact', label: 'CONTACT US', type: 'link' }
  ];

  const handleDropdownClick = (navId: string, subSlug?: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(navId as PageId, subSlug);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#07090B]/95 backdrop-blur-md shadow-sm py-2'
            : 'bg-white/80 dark:bg-[#07090B]/80 backdrop-blur-sm py-4'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 flex items-center justify-between">
          
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2 group text-left cursor-pointer focus:outline-none"
            aria-label="JIAN TOOLS Home"
          >
            <span className="text-xl font-black tracking-widest text-slate-900 dark:text-white font-display group-hover:text-precision-blue transition-colors uppercase">
              Jian Tools
            </span>
          </button>

          {/* Desktop Navigation - Morphic Style */}
          <nav 
            className="hidden lg:flex items-center justify-center flex-shrink-0 relative z-50"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center justify-between rounded-xl overflow-hidden p-1 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10">
              {navStructure.map((nav, idx) => {
                const defaultActiveIdx = navStructure.findIndex(n => n.id === currentPage);
                const activeIdx = hoveredIndex !== null ? hoveredIndex : defaultActiveIdx;
                
                const isCurrent = idx === activeIdx;
                const isFirst = idx === 0;
                const isLast = idx === navStructure.length - 1;
                const isPrev = activeIdx !== -1 && idx === activeIdx - 1;
                const isNext = activeIdx !== -1 && idx === activeIdx + 1;

                let itemClasses = "flex items-center justify-center px-4 py-1.5 font-mono text-[12.5px] font-semibold tracking-wider transition-all duration-300 whitespace-nowrap cursor-pointer select-none border-none outline-none group relative ";

                if (isCurrent) {
                  itemClasses += "mx-[6px] rounded-[10px] bg-slate-900 text-white dark:bg-white dark:text-black shadow-md font-bold z-10 ";
                } else {
                  itemClasses += "bg-transparent text-slate-600 hover:bg-slate-900 hover:text-white dark:text-gray-300 dark:hover:bg-white dark:hover:text-black z-0 ";
                  if (isPrev || isFirst) itemClasses += "rounded-l-[10px] ";
                  if (isNext || isLast) itemClasses += "rounded-r-[10px] ";
                }

                if (nav.type === 'link') {
                  return (
                    <button
                      key={nav.id}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => handleNavClick(nav.id as PageId)}
                      className={itemClasses}
                    >
                      {nav.label}
                    </button>
                  );
                }

                // Dropdown Item
                return (
                  <div 
                    key={nav.id} 
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setHoveredIndex(idx)}
                  >
                    <button
                      onClick={() => handleDropdownClick(nav.id)}
                      className={itemClasses}
                    >
                      <span>{nav.label}</span>
                      <ChevronDown className="ml-1 w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="bg-white dark:bg-[#0D1115] rounded-xl shadow-xl border border-slate-200 dark:border-white/10 py-2 overflow-hidden">
                        {nav.items?.map((subItem, sidx) => (
                          <button
                            key={sidx}
                            onClick={() => handleDropdownClick(nav.id, typeof subItem === 'string' ? subItem : subItem.slug)}
                            className="w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-precision-blue transition-colors cursor-pointer"
                          >
                            {typeof subItem === 'string' ? subItem : subItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <button 
              className="kokonut-switch-btn" 
              onClick={toggleTheme}
              aria-label="Toggle Light and Dark Theme"
              title="Toggle Theme"
            >
              <div className="kokonut-switch-inner">
                <svg className="kokonut-sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path>
                  <path d="M12 20v2"></path>
                  <path d="m4.93 4.93 1.41 1.41"></path>
                  <path d="m17.66 17.66 1.41 1.41"></path>
                  <path d="M2 12h2"></path>
                  <path d="M20 12h2"></path>
                  <path d="m6.34 17.66-1.41 1.41"></path>
                  <path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
                <span className="kokonut-switch-label">
                  <span className="label-light">Light<span className="label-glow-line"></span></span>
                  <span className="label-dark">Dark<span className="label-glow-line"></span></span>
                  <span className="label-spacer">Light</span>
                </span>
              </div>
              <span className="kokonut-sheen-sweep"></span>
              <span className="kokonut-sheen-radial"></span>
            </button>

            <button
              onClick={() => onOpenEnquiry()}
              className="px-5 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-700 text-white text-[11px] font-bold tracking-widest uppercase font-mono transition-colors shadow-sm cursor-pointer border-transparent"
            >
              Request Quote
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button 
              className="kokonut-switch-btn !h-9 !px-2" 
              onClick={toggleTheme}
              aria-label="Toggle Theme"
            >
              <div className="kokonut-switch-inner !gap-0">
                <svg className="kokonut-sun-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"></circle>
                  <path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
              </div>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-white dark:bg-[#07090B] lg:hidden pt-24 px-6 animate-fade-in overflow-y-auto pb-10">
          <div className="space-y-2">
            {navStructure.map((nav) => {
              if (nav.type === 'link') {
                return (
                  <button
                    key={nav.id}
                    onClick={() => handleNavClick(nav.id as PageId)}
                    className={`w-full text-left py-3.5 px-4 rounded-lg text-sm font-bold font-mono tracking-wider transition-colors cursor-pointer ${
                      currentPage === nav.id
                        ? 'bg-precision-blue text-white'
                        : 'text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5'
                    }`}
                  >
                    {nav.label}
                  </button>
                );
              }

              // Mobile Dropdown
              const isOpen = openMobileDropdown === nav.id;
              return (
                <div key={nav.id} className="w-full">
                  <button
                    onClick={() => setOpenMobileDropdown(isOpen ? null : nav.id)}
                    className="w-full flex items-center justify-between py-3.5 px-4 rounded-lg text-sm font-bold font-mono tracking-wider text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span>{nav.label}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-precision-blue' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="pl-4 pr-2 py-2 space-y-1 border-l-2 border-precision-blue/30 ml-4 mt-1">
                      {nav.items?.map((subItem, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleDropdownClick(nav.id, typeof subItem === 'string' ? subItem : subItem.slug)}
                          className="w-full text-left py-2.5 px-4 rounded-lg text-xs font-semibold text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-precision-blue transition-colors cursor-pointer"
                        >
                          {typeof subItem === 'string' ? subItem : subItem.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-8 mt-8 border-t border-slate-200 dark:border-white/10">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnquiry();
              }}
              className="w-full py-4 rounded-xl bg-precision-blue text-white text-sm font-bold tracking-wider font-mono uppercase text-center cursor-pointer shadow-lg shadow-precision-blue/20"
            >
              Get a Quote
            </button>
          </div>
        </div>
      )}
    </>
  );
};
