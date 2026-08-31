import React, { useState, useEffect } from 'react';
import { CheckCircle2, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

interface TubeSheetApplicationProps {
  onOpenCatalogue: (categorySlug?: string) => void;
  onOpenEnquiry: (productName?: string) => void;
}

const TUBE_SHEET_IMAGES = [
  '/assets/images/tube-sheet/1.webp',
  '/assets/images/tube-sheet/2.webp',
  '/assets/images/tube-sheet/3.webp',
  '/assets/images/tube-sheet/4.webp',
  '/assets/images/tube-sheet/5.webp',
  '/assets/images/tube-sheet/6.webp',
  '/assets/images/tube-sheet/7.webp',
];

const EXPERTISE_CATEGORIES = [
  {
    title: 'HEAT EXCHANGER DRILLING',
    subtitle: 'Precision Drilling for Tube Sheet Applications',
    description: 'Tube sheet drilling demands accuracy, consistency and process reliability. JIAN TOOLS provides modular drilling solutions designed specifically for high-volume and precision hole-making applications in heat exchanger manufacturing. Our solutions are suitable for drilling tube sheets, plates, baffles and related heat exchanger components.',
    features: ['High hole accuracy and consistency', 'Efficient chip evacuation', 'Reduced machining time', 'Replaceable cutting elements', 'Cost-effective tooling', 'Suitable for CNC/VMC/HMC machine', 'Solutions for different hole diameters and depths'],
    footer: 'Heat Exchangers | Condensers | Pressure Vessels | Tube Sheets | Baffles | Industrial Fabrication',
  },
  {
    title: 'STRUCTURAL STEEL DRILLING',
    subtitle: 'Fast & Reliable Drilling for Heavy Fabrication',
    description: 'Structural steel applications require high productivity, tool strength and consistent hole quality. JIAN TOOLS modular drilling systems are designed to deliver reliable performance across a wide range of structural-steel components.',
    features: ['Structural plates', 'Beams & columns', 'Flanges', 'Base plates', 'Tower structures', 'Fabricated steel components', 'Heavy engineering components'],
    footer: null,
  },
  {
    title: 'CUSTOM DRILLING SOLUTIONS',
    subtitle: 'One Tool. Multiple Diameters. Maximum Flexibility.',
    description: 'JIAN TOOLS modular drills are designed to provide a flexible and economical solution for industrial drilling applications. With replaceable cutting components, the system allows users to achieve different hole diameters while reducing tooling inventory and overall machining costs.',
    features: ['Replaceable cutting cartridges', 'Multiple diameter options', 'Reduced tooling cost', 'Reduced inventory', 'Easy maintenance', 'High drilling productivity', 'Suitable for CNC / VMC / HMC machines'],
    footer: null,
  },
];

export const TubeSheetApplication: React.FC<TubeSheetApplicationProps> = ({
  onOpenCatalogue,
  onOpenEnquiry
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeExpertiseIndex, setActiveExpertiseIndex] = useState(0);
  const activeExpertise = EXPERTISE_CATEGORIES[activeExpertiseIndex];

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % TUBE_SHEET_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextExpertise = () => setActiveExpertiseIndex((prev) => (prev + 1) % EXPERTISE_CATEGORIES.length);
  const prevExpertise = () => setActiveExpertiseIndex((prev) => (prev - 1 + EXPERTISE_CATEGORIES.length) % EXPERTISE_CATEGORIES.length);

  return (
    <section className="relative w-full py-24 bg-[#F8F9FA] dark:bg-[#07090B] border-y border-gray-200 dark:border-white/5 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-gray-200 dark:border-white/10">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="w-8 h-px bg-precision-blue" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-slate-500 uppercase">
                OUR STRENGTH // OUR CORE EXPERTISE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight font-display">
              Tube Sheet & Baffle Drilling
            </h2>
          </div>
          <div className="mt-4 md:mt-0 max-w-lg">
            <p className="text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
              At JIAN TOOLS, we specialize in modular drilling solutions for demanding industrial applications.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Auto-scrolling Image Gallery */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg" style={{ minHeight: 420 }}>
            {TUBE_SHEET_IMAGES.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Application slide ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain bg-white dark:bg-[#111] transition-opacity duration-1000 ${
                  idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Gallery Dots */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
              {TUBE_SHEET_IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'w-6 bg-precision-blue' : 'bg-black/30 dark:bg-white/40 hover:bg-black/50 dark:hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Expertise Category Carousel */}
          <div className="lg:col-span-7 flex flex-col">
            
            {/* Carousel Tab Buttons */}
            <div className="flex items-center space-x-1 mb-6 border-b border-gray-200 dark:border-white/10 pb-4">
              {EXPERTISE_CATEGORIES.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveExpertiseIndex(idx)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    idx === activeExpertiseIndex
                      ? 'bg-precision-blue text-white shadow-md'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10'
                  }`}
                >
                  {cat.title.split(' ').slice(0, 2).join(' ')}
                </button>
              ))}
            </div>

            {/* Active Category Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display mb-1">
                  {activeExpertise.title}
                </h3>
                <p className="text-precision-blue font-semibold text-sm mb-4">{activeExpertise.subtitle}</p>
                
                <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-5">
                  {activeExpertise.description}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 mb-5">
                  {activeExpertise.features.map((feat, i) => (
                    <div key={i} className="flex items-start space-x-2 text-sm text-slate-700 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-precision-blue shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {activeExpertise.footer && (
                  <div className="text-xs text-slate-500 bg-slate-100 dark:bg-white/5 p-3 rounded border border-slate-200 dark:border-white/10 mb-5">
                    <span className="font-bold text-slate-700 dark:text-gray-300">Typical Applications:</span><br/>
                    {activeExpertise.footer}
                  </div>
                )}
              </div>

              {/* Navigation + CTA */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-white/10 mt-auto">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevExpertise}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors cursor-pointer"
                    aria-label="Previous category"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 dark:text-gray-500">
                    {activeExpertiseIndex + 1} / {EXPERTISE_CATEGORIES.length}
                  </span>
                  <button
                    onClick={nextExpertise}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors cursor-pointer"
                    aria-label="Next category"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                
                <button
                  onClick={() => onOpenEnquiry('Modular Drilling Solutions')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-precision-blue hover:bg-blue-700 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Request Custom Tooling</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
