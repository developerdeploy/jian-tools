import React, { useEffect } from 'react';
import { ArrowRight, ChevronRight, FileText, Download, Crosshair, BarChart, HardDrive, Cpu } from 'lucide-react';

interface TechnicalPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: (productName?: string) => void;
  initialSectionSlug?: string | null;
}

const TECHNICAL_SECTIONS = [
  {
    id: 'tool-selection',
    title: 'Tool Selection Guide',
    icon: <Crosshair className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-gray-400">Selecting the correct modular drill body and insert is critical for optimal performance. Consider the following factors:</p>
        <ul className="list-disc list-inside text-slate-700 dark:text-gray-300 space-y-2">
          <li><strong>Material Hardness:</strong> Determines the required carbide grade and coating (e.g., TiAlN vs TiN).</li>
          <li><strong>Hole Depth (L/D Ratio):</strong> Choose between 3xD, 5xD, 8xD, or custom deep-hole bodies.</li>
          <li><strong>Machine Rigidity:</strong> Crown drills require stable setups; ensure your spindle and fixture can handle the thrust force.</li>
          <li><strong>Coolant Delivery:</strong> Through-coolant is mandatory for depths over 3xD to ensure chip evacuation.</li>
        </ul>
      </div>
    )
  },
  {
    id: 'cutting-parameters',
    title: 'Cutting Parameters (Speed & Feed)',
    icon: <BarChart className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-gray-400">Baseline parameters for JIAN TOOLS premium modular drills. <em>Note: Adjust based on machine condition and coolant pressure.</em></p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-slate-200 dark:border-white/10">
            <thead className="bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white uppercase font-mono">
              <tr>
                <th className="px-4 py-3 border-b border-slate-200 dark:border-white/10">Material</th>
                <th className="px-4 py-3 border-b border-slate-200 dark:border-white/10">Cutting Speed (Vc) m/min</th>
                <th className="px-4 py-3 border-b border-slate-200 dark:border-white/10">Feed (fn) mm/rev (Ø20mm)</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-gray-300">
              <tr className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium">Low Carbon Steel</td>
                <td className="px-4 py-3">80 - 120</td>
                <td className="px-4 py-3">0.25 - 0.35</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium">Alloy Steel</td>
                <td className="px-4 py-3">60 - 90</td>
                <td className="px-4 py-3">0.20 - 0.30</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium">Stainless Steel</td>
                <td className="px-4 py-3">40 - 70</td>
                <td className="px-4 py-3">0.15 - 0.25</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium">Cast Iron</td>
                <td className="px-4 py-3">90 - 130</td>
                <td className="px-4 py-3">0.30 - 0.45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  },
  {
    id: 'diameter-range',
    title: 'Hole Diameter Range',
    icon: <Cpu className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-gray-400">Our modular tooling systems cover a wide spectrum of hole diameters, reducing the need for solid carbide drills at large sizes.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
            <h5 className="font-bold text-precision-blue mb-1">Small Series</h5>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-display">Ø 8.00 - 15.99mm</p>
            <p className="text-xs text-slate-500 mt-2">Crown Drills / High Speed</p>
          </div>
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
            <h5 className="font-bold text-precision-blue mb-1">Medium Series</h5>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-display">Ø 16.00 - 32.00mm</p>
            <p className="text-xs text-slate-500 mt-2">Modular Drills / Inserts</p>
          </div>
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl border border-slate-200 dark:border-white/10">
            <h5 className="font-bold text-precision-blue mb-1">Large Series</h5>
            <p className="text-2xl font-black text-slate-900 dark:text-white font-display">Ø 32.01 - 52.00mm</p>
            <p className="text-xs text-slate-500 mt-2">Cartridge Drills / Custom</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'materials',
    title: 'Materials Guide',
    icon: <HardDrive className="w-5 h-5" />,
    content: (
      <div className="space-y-4">
        <p className="text-slate-600 dark:text-gray-400">We offer specialized substrate grades and PVD/CVD coatings tailored for ISO material groups:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-white dark:bg-[#111] rounded-lg shadow-sm border border-slate-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold mb-2">P</div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Steel</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-[#111] rounded-lg shadow-sm border border-slate-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold mb-2">M</div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Stainless</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-[#111] rounded-lg shadow-sm border border-slate-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold mb-2">K</div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Cast Iron</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white dark:bg-[#111] rounded-lg shadow-sm border border-slate-200 dark:border-white/10">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold mb-2">S</div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Superalloys</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'downloads',
    title: 'Downloads & Catalogue',
    icon: <FileText className="w-5 h-5" />,
    content: (
      <div className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-1">Official JIAN TOOLS Catalogue</h4>
          <p className="text-sm text-slate-600 dark:text-gray-400">Complete specifications, dimensions, and ordering codes for our entire tooling range. (PDF, 14.2 MB)</p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-precision-blue hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold transition-colors shadow-lg shadow-blue-500/20 cursor-pointer">
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </button>
      </div>
    )
  }
];

export const TechnicalPage: React.FC<TechnicalPageProps> = ({
  onBackToHome,
  onOpenEnquiry,
  initialSectionSlug
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialSectionSlug) {
      setTimeout(() => {
        const element = document.getElementById(`section-${initialSectionSlug}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 100);
    }
  }, [initialSectionSlug]);

  return (
    <div className="min-h-screen bg-[#F5F5F3] dark:bg-[#07090B] pt-24 pb-20">
      
      {/* Hero Banner */}
      <div className="relative w-full h-[300px] bg-slate-900 dark:bg-black overflow-hidden mb-12">
        <img 
          src="/assets/images/technical/tech_banner_1787990294502.jpg" 
          alt="Technical Engineering Data" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090B]/90 via-[#07090B]/60 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex items-center space-x-2 text-xs font-mono text-gray-400 mb-4">
            <button onClick={onBackToHome} className="hover:text-white transition-colors cursor-pointer">HOME</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-bold">TECHNICAL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white font-display mb-2 uppercase">
            Technical Resources
          </h1>
          <p className="text-gray-300 max-w-xl">
            Engineering data, cutting parameters, and technical specifications to maximize the performance of your JIAN TOOLS.
          </p>
        </div>
      </div>

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 space-y-16">
        {TECHNICAL_SECTIONS.map((section) => (
          <div key={section.id} id={`section-${section.id}`} className="scroll-mt-32">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="p-2 bg-precision-blue/10 text-precision-blue rounded-lg">
                {section.icon}
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white font-display uppercase tracking-tight">
                {section.title}
              </h2>
            </div>
            <div className="pl-0 sm:pl-14">
              {section.content}
            </div>
          </div>
        ))}

        {/* Technical Support CTA */}
        <div className="mt-20 bg-slate-900 dark:bg-white rounded-2xl p-8 sm:p-12 text-center shadow-xl">
          <h3 className="text-2xl font-black text-white dark:text-slate-900 font-display uppercase tracking-tight mb-4">
            Need Expert Technical Support?
          </h3>
          <p className="text-slate-400 dark:text-slate-600 mb-8 max-w-2xl mx-auto">
            Our application engineers are ready to assist with tool selection, custom geometry design, and process optimization for your specific machine and material.
          </p>
          <button 
            onClick={() => onOpenEnquiry('Technical Support Request')}
            className="inline-flex items-center space-x-2 bg-precision-blue hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold transition-colors cursor-pointer"
          >
            <span>Contact Application Engineering</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
