import { ProductCategory } from '../types';

export const productCategories: ProductCategory[] = [
  {
    id: "endmills",
    index: "01",
    name: "ENDMILLS",
    subtitle: "High-Performance Milling Solutions",
    description: "For controlled material removal, slotting, shoulder milling, and repeatable high-precision finishing across steels, alloys, and hardened materials.",
    image: "/assets/images/products/endmills.webp",
    badge: "SOLID CARBIDE • MULTI-FLUTE",
    features: [
      "Variable helix design eliminates harmonic vibrations",
      "Unequal pitch flutes for superior surface finish (Ra < 0.2 µm)",
      "High-adhesion nano-composite coatings (AlTiN / SiN)",
      "Corner radius and ball nose geometry options available"
    ],
    specs: {
      diameterRange: "Ø 1.0 mm – Ø 32.0 mm",
      fluteRange: "2, 3, 4, 6, 8 Flutes",
      coating: "AlTiN / TiSiN / DLC",
      tolerance: "h6 / e8 Diameter Tolerance",
      helixAngle: "35° / 38° / 45° Variable"
    },
    applications: ["VMC Machining", "Mold & Die", "Automotive Parts", "Profile Milling"]
  },
  {
    id: "drills",
    index: "02",
    name: "DRILLS",
    subtitle: "Modular & Solid Carbide Drilling",
    description: "Modular indexable drill bodies (1D to 12D) and solid carbide drills engineered for high hole accuracy, straightness, and efficient chip evacuation.",
    image: "/assets/images/products/drills.webp",
    badge: "MODULAR 1D–12D • SOLID CARBIDE",
    features: [
      "1D to 12D length-to-diameter depth variations",
      "Self-centering 140° split point eliminates spot drilling",
      "Through-coolant channels for high-pressure chip flushing",
      "Interchangeable coated carbide indexable cutting heads"
    ],
    specs: {
      diameterRange: "Ø 3.0 mm – Ø 45.0 mm",
      fluteRange: "2 Spiral Flutes with Internal Coolant",
      coating: "TiN / TiAlN Multi-Layer",
      tolerance: "IT8 – IT9 Hole Tolerance",
      helixAngle: "30° Polished Flute Valley"
    },
    applications: ["Deep Hole Drilling", "Automotive Engine Blocks", "Flanges & Valves", "Structural Components"]
  },
  {
    id: "reamers",
    index: "03",
    name: "REAMERS",
    subtitle: "Precision Bore Finishing",
    description: "A measured final pass for demanding bore tolerance, superior roundness, and mirror-grade surface finish with zero chatter.",
    image: "/assets/images/products/reamers.webp",
    badge: "SUB-MICRON BORE FINISH",
    features: [
      "Uneven flute spacing eliminates lobing and chatter marks",
      "Tight bore tolerance control down to IT6 / H7 standards",
      "Left-hand helical / right-hand cut for push chip disposal",
      "Solid carbide body with rigid DIN shank mounting"
    ],
    specs: {
      diameterRange: "Ø 2.0 mm – Ø 25.0 mm",
      fluteRange: "4, 6, 8 Straight / Spiral Flutes",
      coating: "Uncoated / TiAlN PVD",
      tolerance: "H7 / DIN 212 / Custom Tolerance",
      helixAngle: "7° – 12° Left Spiral"
    },
    applications: ["Hydraulic Cylinders", "Bearing Housings", "Valve Guides", "Aerospace Bushings"]
  },
  {
    id: "threadmills",
    index: "04",
    name: "THREADMILLS",
    subtitle: "Reliable Thread Production",
    description: "High-precision helical thread milling with minimal tool pressure, full thread depth control, and zero broken tap extraction downtime.",
    image: "/assets/images/products/threadmills.webp",
    badge: "ISO METRIC • UN • NPT • G THREADS",
    features: [
      "Single tool can cut both right-hand and left-hand threads",
      "Thread right to the absolute bottom of blind holes",
      "Drastically reduces machine spindle load compared to tapping",
      "Excellent thread quality in difficult exotic materials"
    ],
    specs: {
      diameterRange: "M2 – M36 (Standard & Fine Pitch)",
      fluteRange: "3 – 5 Helical Flutes",
      coating: "TiAlN / AlCrN PVD",
      tolerance: "6H / 2B Thread Class",
      helixAngle: "15° – 27° Helical Flute"
    },
    applications: ["Exotic Alloys", "Blind Hole Threading", "Thin-Walled Components", "Large Diameter Threads"]
  },
  {
    id: "custom",
    index: "05",
    name: "SPECIAL CUSTOMISED TOOLS",
    subtitle: "Engineered to Your Component Blueprint",
    description: "Custom step drills, multi-diameter form cutters, profiled endmills, and dedicated combined-operation tooling designed to slash cycle time.",
    image: "/assets/images/products/custom-tools.webp",
    badge: "TAILORED TO DRAWING • CYCLE TIME OPTIMIZATION",
    features: [
      "Combines drilling, chamfering, and counterboring in 1 shot",
      "Reduces tool changes and eliminates cumulative setup errors",
      "Rapid CAD design, simulation, and manufacturing lead time",
      "Custom profile tolerances ground on 5-axis CNC grinding centers"
    ],
    specs: {
      diameterRange: "Custom engineered to drawing",
      fluteRange: "Application-specific geometry",
      coating: "Application-optimized coating selection",
      tolerance: "Down to ± 0.002 mm",
      helixAngle: "Optimized for target material"
    },
    applications: ["High-Volume Mass Production", "Automotive Transmissions", "Specialty Pump Casings", "Complex Housings"]
  },
  {
    id: "turning",
    index: "06",
    name: "TURNING TOOLS",
    subtitle: "Rigid Inserts & Toolholders",
    description: "Carbide inserts, boring bars, and precision turning holders for high-rigidity external and internal CNC turning operations.",
    image: "/assets/images/products/turning-tools.webp",
    badge: "ISO TURNING • GROOVING • PARTING",
    features: [
      "Engineered chipbreaker geometry for uninterrupted chip control",
      "Multi-grade carbide substrates for continuous and interrupted cuts",
      "Internal high-pressure coolant nozzles direct at the cutting edge",
      "Maximum clamping stability to prevent insert movement under load"
    ],
    specs: {
      diameterRange: "Standard ISO insert shapes (CNMG, WNMG, TNMG, DNMG)",
      fluteRange: "Internal / External Toolholders",
      coating: "CVD / PVD Thick Nano-Coating",
      tolerance: "ISO Class M / Class G",
      helixAngle: "Optimized Rake & Clearance Angles"
    },
    applications: ["CNC Lathes", "Turning Centers", "Heavy Shaft Machining", "Internal Boring"]
  }
];
