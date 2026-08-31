import React, { useEffect } from 'react';
import { ArrowRight, ChevronRight, Settings, Wrench, ShieldCheck, Factory, Layers } from 'lucide-react';

interface ApplicationsPageProps {
  onBackToHome: () => void;
  onOpenEnquiry: (productName?: string) => void;
  initialSectionSlug?: string | null;
}

const APPLICATIONS = [
  {
    id: 'heat-exchanger',
    title: 'Heat Exchanger Drilling',
    subtitle: 'Precision Holemaking for Tube Sheets',
    description: 'Heat exchanger manufacturing demands high-volume, deep-hole precision drilling. JIAN TOOLS provides engineered solutions for drilling tube sheets, baffle plates, and condenser components. Our modular and solid carbide tools ensure accurate hole tolerances, excellent surface finish, and maximized tool life even in tough materials like duplex stainless steel and titanium.',
    icon: <Settings className="w-6 h-6" />,
    image: '/assets/images/applications/app_heat_exchanger_1787990207568.webp',
    features: ['High penetration rates', 'Superior chip evacuation', 'Tight tolerance control (IT8-IT9)', 'Special geometries for stacked plates']
  },
  {
    id: 'structural-steel',
    title: 'Structural Steel Drilling',
    subtitle: 'Heavy-Duty Holemaking for Beams & Columns',
    description: 'Structural steel fabrication requires robust tooling that can withstand interrupted cuts, hard spots, and varying material conditions. JIAN TOOLS modular crown drills are designed for fast, reliable drilling of I-beams, H-beams, and heavy structural plates. The rigid design prevents deflection and ensures stable machining even on portable magnetic drills or large CNC beam drill lines.',
    icon: <Factory className="w-6 h-6" />,
    image: '/assets/images/applications/app_structural_steel_1787990219933.webp',
    features: ['Vibration-resistant design', 'Quick-change replaceable heads', 'Optimized for low-power machines', 'Excellent performance in structural grade steel']
  },
  {
    id: 'plate',
    title: 'Plate Drilling',
    subtitle: 'Efficient Multi-Layer & Thick Plate Drilling',
    description: 'Drilling thick plates or stacked multi-layer plates requires specific tool geometries to manage chip breaking and prevent chip packing. Our tooling solutions feature optimized flute designs and internal coolant holes to efficiently clear chips and dissipate heat, enabling high-speed drilling of boiler plates, base plates, and heavy fabrication components.',
    icon: <Layers className="w-6 h-6" />,
    image: '/assets/images/applications/app_plate_drilling_1787990239256.webp',
    features: ['No chip packing in deep holes', 'Consistent hole size in stacked drilling', 'High feed rate capability', 'Longer tool life in hard plates']
  },
  {
    id: 'flange',
    title: 'Flange Drilling',
    subtitle: 'Accurate Bolt-Hole Circles for Pipelines',
    description: 'Flange manufacturing relies heavily on the accuracy and speed of producing bolt hole circles. JIAN TOOLS delivers carbide drills and modular systems that provide exact positioning, roundness, and surface finish. Suitable for forged steel flanges, wind tower flanges, and large valve bodies, our tools reduce cycle times while maintaining strict industry standards.',
    icon: <ShieldCheck className="w-6 h-6" />,
    image: '/assets/images/applications/app_flange_drilling_1787990263694.webp',
    features: ['Exceptional hole positioning accuracy', 'Reduced burr formation on exit', 'Self-centering geometries', 'Ideal for forged and cast materials']
  },
  {
    id: 'heavy-engineering',
    title: 'Heavy Engineering',
    subtitle: 'Versatile Tooling for Large-Scale Fabrication',
    description: 'In heavy engineering, machining large components like gearboxes, earthmoving equipment frames, and energy sector parts presents unique challenges. We provide a comprehensive range of large diameter modular drills, deep hole drills, and custom combination tools to reduce tooling inventory and maximize productivity on large boring mills and gantry machines.',
    icon: <Wrench className="w-6 h-6" />,
    image: '/assets/images/applications/app_heavy_engineering_1787990279767.webp',
    features: ['Diameters up to 200mm available', 'Custom combination step drills', 'Rigid interfaces for heavy feeds', 'Complete technical support for complex setups']
  }
];

export const ApplicationsPage: React.FC<ApplicationsPageProps> = ({
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
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [initialSectionSlug]);

  return (
    <div className="min-h-screen bg-[#F5F5F3] dark:bg-[#07090B] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 mb-8 pt-4">
          <button onClick={onBackToHome} className="hover:text-precision-blue transition-colors">HOME</button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 dark:text-white font-bold">APPLICATIONS</span>
        </div>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-display mb-4 uppercase">
            Industrial Applications
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-2xl">
            From precision tube sheets to heavy structural steel, JIAN TOOLS provides engineered holemaking solutions that drive productivity and reliability across diverse industrial sectors.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-24">
          {APPLICATIONS.map((app, index) => (
            <div 
              key={app.id} 
              id={`section-${app.id}`} 
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-16 items-center scroll-mt-32`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] bg-slate-200 dark:bg-black group">
                <img 
                  src={app.image} 
                  alt={app.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-sm p-3 rounded-xl text-precision-blue shadow-lg">
                  {app.icon}
                </div>
              </div>

              {/* Text */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-display mb-2 uppercase">
                  {app.title}
                </h2>
                <h3 className="text-lg font-bold text-precision-blue mb-6">
                  {app.subtitle}
                </h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-8 text-lg">
                  {app.description}
                </p>
                
                <div className="bg-white dark:bg-[#111417] border border-slate-200 dark:border-white/10 rounded-xl p-6 mb-8 shadow-sm">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider font-mono">
                    Key Advantages
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                    {app.features.map((feature, i) => (
                      <li key={i} className="flex items-start space-x-2 text-sm text-slate-700 dark:text-gray-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-precision-blue mt-1.5 shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <button 
                    onClick={() => onOpenEnquiry(app.title)}
                    className="inline-flex items-center space-x-2 bg-slate-900 dark:bg-white text-white dark:text-black px-6 py-3 rounded-lg font-bold hover:bg-precision-blue dark:hover:bg-precision-blue hover:text-white transition-colors group cursor-pointer"
                  >
                    <span>Request Application Tooling</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

