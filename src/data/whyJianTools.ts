import { WhyPillar } from '../types';

export const whyPillars: WhyPillar[] = [
  {
    id: 1,
    number: "01",
    title: "CONSISTENT QUALITY",
    subtitle: "Batch-to-Batch Sub-Micron Repeatability",
    description: "Every cutting tool is produced using premium virgin micro-grain tungsten carbide substrates and precision-ground on advanced CNC tool and cutter grinding centers with 100% optical inspection.",
    metrics: [
      { label: "SUBSTRATE", value: "Virgin Micro-Grain Carbide" },
      { label: "TOLERANCE", value: "Within ± 0.002 mm" },
      { label: "QUALITY AUDIT", value: "100% Optical Metrology" }
    ],
    icon: "ShieldCheck"
  },
  {
    id: 2,
    number: "02",
    title: "COMPETITIVE PRICING",
    subtitle: "Direct Manufacturer Economics",
    description: "By engineering directly from carbide blanks to finished tool profiles with lean in-house tooling processes, we deliver substantial cost-per-hole and cost-per-component savings compared to imported brands.",
    metrics: [
      { label: "COST REDUCTION", value: "Up to 35% Tooling Savings" },
      { label: "INDEXABLE SYSTEM", value: "Reusable Drill Bodies" },
      { label: "RE-SHARPENING", value: "Re-grind & Re-coat Services" }
    ],
    icon: "BadgePercent"
  },
  {
    id: 3,
    number: "03",
    title: "QUICK DELIVERY",
    subtitle: "Rapid Turnaround from Gujarat Industrial Hub",
    description: "Located centrally in Makarpura GIDC, Vadodara, we maintain extensive inventory of standard modular drill bodies, inserts, and endmills, with accelerated dispatch for custom blueprint tooling.",
    metrics: [
      { label: "STANDARD STOCK", value: "Same-Day Dispatch" },
      { label: "CUSTOM TOOLS", value: "Fast Blueprint Turnaround" },
      { label: "LOCATION", value: "Makarpura GIDC, Vadodara" }
    ],
    icon: "Truck"
  },
  {
    id: 4,
    number: "04",
    title: "CUSTOMER SATISFACTION",
    subtitle: "Trusted by Demanding CNC Machine Shops",
    description: "Proven performance across automotive OEMs, tier-1 suppliers, pump and valve manufacturers, and precision engineering workshops that depend on zero unplanned machine downtime.",
    metrics: [
      { label: "REORDER RATE", value: "98% Industrial Client Retention" },
      { label: "TOOL LIFE", value: "Tested Across 500k+ Operations" },
      { label: "PARTNERSHIP", value: "Long-term Tooling Contracts" }
    ],
    icon: "Users"
  },
  {
    id: 5,
    number: "05",
    title: "TECHNICAL SUPPORT",
    subtitle: "Direct Application Engineering Assistance",
    description: "Our dedicated tooling specialists provide hands-on technical guidance for speed & feed optimization, chip formation diagnostics, tool life improvement, and custom tool engineering.",
    metrics: [
      { label: "SPEED & FEED", value: "Custom Cutting Parameter Calculations" },
      { label: "TROUBLESHOOTING", value: "On-site & Remote Diagnostics" },
      { label: "DIRECT CONTACT", value: "+91 79848 76123" }
    ],
    icon: "Headphones"
  }
];

export const companyContactDetails = {
  name: "JIAN TOOLS",
  tagline: "Your solution provider for all your carbide cutting tools need.",
  address: "967 / 7, Ground Floor, Makarpura GIDC, Vadodara – 390 010, Gujarat, India",
  phone: "+91 79848 76123",
  whatsappUrl: "https://wa.me/917984876123?text=Hi%20JIAN%20TOOLS%2C%20I%20would%20like%20to%20enquire%20about%20your%20carbide%20cutting%20tools%20and%20modular%20drilling%20solutions.",
  email: "info@jiantools.com", // standard placeholder format for domain
  operationalHours: "Monday – Saturday: 9:00 AM – 7:00 PM IST"
};
