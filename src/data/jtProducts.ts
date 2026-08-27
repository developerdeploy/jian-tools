export interface JTProduct {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  fullDescription: string;
  images: {
    original: string;
    w1200: string;
    w600: string;
    w300: string;
    transparent?: string;
  }[];
  grades?: string[];
  models?: string[];
  types?: string[];
  features: string[];
  applications: string[];
  technicalSpecs: {
    label: string;
    value: string;
  }[];
}

export interface JTCategory {
  id: string;
  slug: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  primaryImage: string;
  productCount: number;
  products: JTProduct[];
}

export const jtProductsData: JTProduct[] = [
  // 01: MODULAR DRILL / CROWN DRILL
  {
    id: 'modular-drill-crown-drill',
    slug: 'modular-drill-crown-drill',
    name: 'Modular Drill / Crown Drill',
    category: 'Modular Drill / Crown Drill',
    categorySlug: 'modular-drill-crown-drill',
    shortDescription: 'Modular crown drills with replaceable cutting heads, rigid bodies, and optimized flute geometry for stable hole production.',
    fullDescription: 'Modular crown drills engineered for efficient, high-rigidity holemaking with replaceable carbide cutting heads. Their rigid bodies, optimized flute geometry and precision cam-lock cutting interface support stable machining, effective chip evacuation and significantly reduced tooling replacement costs across steel, stainless, and cast iron.',
    images: [
      {
        original: '/assets/products/original/10-modular-crown-drill-twin-set.webp',
        w1200: '/assets/products/1200w/10-modular-crown-drill-twin-set.webp',
        w600: '/assets/products/600w/10-modular-crown-drill-twin-set.webp',
        w300: '/assets/products/300w/10-modular-crown-drill-twin-set.webp',
        transparent: '/assets/products/transparent/10-modular-crown-drill-twin-set.webp',
      },
      {
        original: '/assets/products/original/11-modular-crown-drill-upright.webp',
        w1200: '/assets/products/1200w/11-modular-crown-drill-upright.webp',
        w600: '/assets/products/600w/11-modular-crown-drill-upright.webp',
        w300: '/assets/products/300w/11-modular-crown-drill-upright.webp',
        transparent: '/assets/products/transparent/11-modular-crown-drill-upright.webp',
      }
    ],
    features: [
      'Rapid head replacement in under 30 seconds directly in the machine spindle',
      '140° self-centering point geometry eliminating spot drilling',
      'Dual through-body coolant channels delivering 40–70 bar direct pressure',
      'High-aspect depth reach: 1D to 12D parametric depth ratios'
    ],
    applications: [
      'Heat Exchanger Tube Sheet Array Drilling',
      'Automotive Powertrain & Transmission Shafts',
      'High-Feed CNC Machining Centers'
    ],
    technicalSpecs: [
      { label: 'Depth Range', value: '1D — 12D Multiplier' },
      { label: 'Head Locking', value: 'High-Torque Cam Lock' },
      { label: 'Coolant Supply', value: 'Dual Internal Helical Ports' },
      { label: 'Shank Standard', value: 'DIN 6535 Form HE (h6)' }
    ]
  },

  // 02: Deep hole drilling - BTA (BRAZED Type & INDEXABLE Type)
  {
    id: 'deep-hole-drilling-bta',
    slug: 'deep-hole-drilling-bta',
    name: 'Deep Hole Drilling — BTA (Brazed & Indexable)',
    category: 'Deep Hole Drilling — BTA',
    categorySlug: 'deep-hole-drilling-bta',
    shortDescription: 'BTA deep-hole drilling heads for large-diameter and high-depth machining with internal chip evacuation.',
    fullDescription: 'BTA deep-hole drilling tools developed for productive machining of large-diameter, high-depth holes with effective internal chip evacuation. The range includes brazed and indexable constructions, featuring divided, undivided and trepanning configurations for stable cutting, accurate bore geometry and reliable performance in demanding industrial applications.',
    types: ['Brazed Type', 'Indexable Type', 'Divided', 'Undivided', 'Trepanning'],
    images: [
      {
        original: '/assets/products/original/07-deep-hole-drilling-bta-indexable-undivided.webp',
        w1200: '/assets/products/1200w/07-deep-hole-drilling-bta-indexable-undivided.webp',
        w600: '/assets/products/600w/07-deep-hole-drilling-bta-indexable-undivided.webp',
        w300: '/assets/products/300w/07-deep-hole-drilling-bta-indexable-undivided.webp',
        transparent: '/assets/products/transparent/07-deep-hole-drilling-bta-indexable-undivided.webp',
      },
      {
        original: '/assets/products/original/08-deep-hole-drilling-bta-indexable-divided.webp',
        w1200: '/assets/products/1200w/08-deep-hole-drilling-bta-indexable-divided.webp',
        w600: '/assets/products/600w/08-deep-hole-drilling-bta-indexable-divided.webp',
        w300: '/assets/products/300w/08-deep-hole-drilling-bta-indexable-divided.webp',
        transparent: '/assets/products/transparent/08-deep-hole-drilling-bta-indexable-divided.webp',
      },
      {
        original: '/assets/products/original/06-deep-hole-drilling-bta-trepanning.webp',
        w1200: '/assets/products/1200w/06-deep-hole-drilling-bta-trepanning.webp',
        w600: '/assets/products/600w/06-deep-hole-drilling-bta-trepanning.webp',
        w300: '/assets/products/300w/06-deep-hole-drilling-bta-trepanning.webp',
        transparent: '/assets/products/transparent/06-deep-hole-drilling-bta-trepanning.webp',
      }
    ],
    features: [
      'Available in Brazed, Indexable Divided, Indexable Undivided, and Trepanning types',
      'Internal chip evacuation through central tube preventing bore scoring',
      'Precision carbide guide pads ensuring bore straightness and roundness',
      'Trepanning options for core recovery and massive energy savings on large bores'
    ],
    applications: [
      'Oil & Gas Drill Collars & Downhole Tools',
      'Turbine Rotor Centerline Bores',
      'Hydraulic Cylinder Barrels & Heavy Shafts'
    ],
    technicalSpecs: [
      { label: 'Drill System', value: 'Single-Tube (STS) / BTA System' },
      { label: 'Available Heads', value: 'Brazed & Indexable (Divided/Undivided)' },
      { label: 'Depth Capability', value: 'Up to 100× Diameter' },
      { label: 'Guide System', value: 'Precision Carbide Guide Pads' }
    ]
  },

  // 03: GUN DRILLS (BRAZED Type & INDEXABLE Type)
  {
    id: 'gun-drills',
    slug: 'gun-drills',
    name: 'Gun Drills (Brazed Type & Indexable Type)',
    category: 'Gun Drills',
    categorySlug: 'gun-drills',
    shortDescription: 'Precision gun-drilling tools for accurate, straight and high-quality deep small-to-medium holes.',
    fullDescription: 'Precision gun-drilling tools designed for accurate, straight and high-quality deep holes. Brazed types provide a robust cutting solution for consistent production in smaller diameters, while indexable types use replaceable carbide inserts for easier maintenance, reduced downtime and flexible machining across different diameters and materials.',
    types: ['Brazed Type', 'Indexable Type'],
    images: [
      {
        original: '/assets/products/original/05-gun-drill-brazed-and-indexable-types.webp',
        w1200: '/assets/products/1200w/05-gun-drill-brazed-and-indexable-types.webp',
        w600: '/assets/products/600w/05-gun-drill-brazed-and-indexable-types.webp',
        w300: '/assets/products/300w/05-gun-drill-brazed-and-indexable-types.webp',
        transparent: '/assets/products/transparent/05-gun-drill-brazed-and-indexable-types.webp',
      }
    ],
    features: [
      'Straight single-flute profile with kidney-shaped internal coolant channel',
      'Brazed solid carbide tips for small diameters down to micro-bores',
      'Indexable insert configurations for rapid edge indexing without tool regrinding',
      'Strict hole straightness and surface finish Ra < 0.4 µm as-drilled'
    ],
    applications: [
      'Automotive Fuel Injection Bores & Crankshaft Oil Holes',
      'Medical Bone Screws & Cannulated Instruments',
      'Die & Mold Waterline Cooling Passages'
    ],
    technicalSpecs: [
      { label: 'Constructions', value: 'Brazed Carbide Tip & Indexable Insert' },
      { label: 'Coolant Flow', value: 'Internal Pressurized High-Pressure Coolant' },
      { label: 'Hole Tolerance', value: 'IT7 to IT9 Accuracy' },
      { label: 'Depth Reach', value: 'Up to 50× to 80× Diameter' }
    ]
  },

  // 04: Bar Peeling Inserts
  {
    id: 'bar-peeling-inserts',
    slug: 'bar-peeling-inserts',
    name: 'Bar Peeling Inserts (RCMX / TNMX / LNKN)',
    category: 'Bar Peeling Inserts',
    categorySlug: 'bar-peeling-inserts',
    shortDescription: 'High-performance carbide inserts engineered for stable and efficient bar-peeling operations.',
    fullDescription: 'High-performance carbide inserts engineered for stable and efficient bar-peeling operations. The range includes RCMX round inserts, TNMX triangular inserts and LNKN tangential inserts, offering strong cutting edges, controlled chip formation and reliable surface finishing across demanding production environments. Available in gold and dark wear-resistant coatings.',
    models: ['RCMX', 'TNMX', 'LNKN'],
    images: [
      {
        original: '/assets/products/original/01-bar-peeling-inserts-assortment.webp',
        w1200: '/assets/products/1200w/01-bar-peeling-inserts-assortment.webp',
        w600: '/assets/products/600w/01-bar-peeling-inserts-assortment.webp',
        w300: '/assets/products/300w/01-bar-peeling-inserts-assortment.webp',
        transparent: '/assets/products/transparent/01-bar-peeling-inserts-assortment.webp',
      },
      {
        original: '/assets/products/original/02-bar-peeling-inserts-rcmx-tnmx-lnkn.webp',
        w1200: '/assets/products/1200w/02-bar-peeling-inserts-rcmx-tnmx-lnkn.webp',
        w600: '/assets/products/600w/02-bar-peeling-inserts-rcmx-tnmx-lnkn.webp',
        w300: '/assets/products/300w/02-bar-peeling-inserts-rcmx-tnmx-lnkn.webp',
        transparent: '/assets/products/transparent/02-bar-peeling-inserts-rcmx-tnmx-lnkn.webp',
      },
      {
        original: '/assets/products/original/03-bar-peeling-tool-head-assembly.webp',
        w1200: '/assets/products/1200w/03-bar-peeling-tool-head-assembly.webp',
        w600: '/assets/products/600w/03-bar-peeling-tool-head-assembly.webp',
        w300: '/assets/products/300w/03-bar-peeling-tool-head-assembly.webp',
        transparent: '/assets/products/transparent/03-bar-peeling-tool-head-assembly.webp',
      },
      {
        original: '/assets/products/original/04-bar-peeling-inserts-full-range.webp',
        w1200: '/assets/products/1200w/04-bar-peeling-inserts-full-range.webp',
        w600: '/assets/products/600w/04-bar-peeling-inserts-full-range.webp',
        w300: '/assets/products/300w/04-bar-peeling-inserts-full-range.webp',
        transparent: '/assets/products/transparent/04-bar-peeling-inserts-full-range.webp',
      }
    ],
    features: [
      'Heavy-duty RCMX round, TNMX triangular, and LNKN tangential insert profiles',
      'Engineered for continuous high-speed black bar skin removal',
      'Advanced CVD/PVD coatings preventing built-up edge and notch wear',
      'High edge toughness resisting scale, seam imperfections, and ovality'
    ],
    applications: [
      'Bright Bar Manufacturing Plants',
      'Stainless Steel & Alloy Steel Rolling Mills',
      'Continuous Bar Peeling Machines (Kieserling, Hetran, Danieli)'
    ],
    technicalSpecs: [
      { label: 'Insert Geometries', value: 'RCMX, TNMX, LNKN Standards' },
      { label: 'Coating Options', value: 'Multi-layer Gold CVD & Dark PVD' },
      { label: 'Feed Capacity', value: 'High Feed Rates up to 10–25 m/min' },
      { label: 'Material Suitability', value: 'Carbon Steel, Stainless, Titanium Alloys' }
    ]
  },

  // 05: Tube Scarfing (O.D. & I.D. Systems)
  {
    id: 'tube-scarfing-od-inserts',
    slug: 'tube-scarfing',
    name: 'Tube Scarfing Tooling (O.D. & I.D.)',
    category: 'Tube Scarfing',
    categorySlug: 'tube-scarfing',
    shortDescription: 'Precision carbide inserts, tool holders, and mandrels for clean external and internal weld bead removal.',
    fullDescription: 'Complete tube scarfing tooling system for ERW tube mills. Precision O.D. scarfing inserts and rigid tool holders ensure clean external weld-bead removal, while specialized I.D. scarfing inserts and internal mandrels provide stable internal bead shearing, controlled chip flow and smooth tube bore finishes at demanding mill speeds.',
    images: [
      {
        original: '/assets/products/original/01-tube-scarfing-od-inserts.webp',
        w1200: '/assets/products/1200w/01-tube-scarfing-od-inserts.webp',
        w600: '/assets/products/600w/01-tube-scarfing-od-inserts.webp',
        w300: '/assets/products/300w/01-tube-scarfing-od-inserts.webp',
        transparent: '/assets/products/transparent/01-tube-scarfing-od-inserts.webp',
      },
      {
        original: '/assets/products/original/02-od-scarfing-tool-holder.webp',
        w1200: '/assets/products/1200w/02-od-scarfing-tool-holder.webp',
        w600: '/assets/products/600w/02-od-scarfing-tool-holder.webp',
        w300: '/assets/products/300w/02-od-scarfing-tool-holder.webp',
        transparent: '/assets/products/transparent/02-od-scarfing-tool-holder.webp',
      },
      {
        original: '/assets/products/original/03-tube-scarfing-id-inserts.webp',
        w1200: '/assets/products/1200w/03-tube-scarfing-id-inserts.webp',
        w600: '/assets/products/600w/03-tube-scarfing-id-inserts.webp',
        w300: '/assets/products/300w/03-tube-scarfing-id-inserts.webp',
        transparent: '/assets/products/transparent/03-tube-scarfing-id-inserts.webp',
      },
      {
        original: '/assets/products/original/04-id-scarfing-mandrel.webp',
        w1200: '/assets/products/1200w/04-id-scarfing-mandrel.webp',
        w600: '/assets/products/600w/04-id-scarfing-mandrel.webp',
        w300: '/assets/products/300w/04-id-scarfing-mandrel.webp',
        transparent: '/assets/products/transparent/04-id-scarfing-mandrel.webp',
      }
    ],
    features: [
      'Stable cutting action at continuous high-speed tube-mill production',
      'Optimized chipbreaker geometry for controlled external & internal bead flow',
      'Rigid external scarfing tool holder with precise insert pocket seating',
      'Precision I.D. mandrel assembly with smooth internal bore tracking'
    ],
    applications: [
      'ERW Tube Mills & Pipe Manufacturing',
      'Automotive Exhaust & Hydraulic Tubing Lines',
      'Precision Drawn Tubing (DOM)'
    ],
    technicalSpecs: [
      { label: 'Operations', value: 'External (O.D.) & Internal (I.D.) Scarfing' },
      { label: 'Tooling Range', value: 'Inserts, Holders, Mandrels, Rollers' },
      { label: 'Substrate', value: 'High-Toughness Cemented Carbide' },
      { label: 'Compatibility', value: 'Continuous High-Speed Tube Mills' }
    ]
  },

  // 06: BTA Tube & Accessories
  {
    id: 'bta-tubes-accessories',
    slug: 'bta-tube-accessories',
    name: 'BTA Tube & Accessories',
    category: 'BTA Tube & Accessories',
    categorySlug: 'bta-tube-accessories',
    shortDescription: 'Precision BTA drill tubes and accessories for deep-hole drilling systems with internal chip evacuation.',
    fullDescription: 'Precision BTA tubes and accessories for deep-hole drilling systems requiring efficient internal chip evacuation and dependable coolant delivery. Manufactured for dimensional accuracy and secure multi-start threaded connection, the range supports stable high-depth drilling across multiple diameters and demanding industrial applications.',
    images: [
      {
        original: '/assets/products/original/05-bta-tubes-threaded.webp',
        w1200: '/assets/products/1200w/05-bta-tubes-threaded.webp',
        w600: '/assets/products/600w/05-bta-tubes-threaded.webp',
        w300: '/assets/products/300w/05-bta-tubes-threaded.webp',
        transparent: '/assets/products/transparent/05-bta-tubes-threaded.webp',
      },
      {
        original: '/assets/products/original/06-bta-tubes-multiple-diameters.webp',
        w1200: '/assets/products/1200w/06-bta-tubes-multiple-diameters.webp',
        w600: '/assets/products/600w/06-bta-tubes-multiple-diameters.webp',
        w300: '/assets/products/300w/06-bta-tubes-multiple-diameters.webp',
        transparent: '/assets/products/transparent/06-bta-tubes-multiple-diameters.webp',
      },
      {
        original: '/assets/products/original/07-bta-tubes-and-accessories.webp',
        w1200: '/assets/products/1200w/07-bta-tubes-and-accessories.webp',
        w600: '/assets/products/600w/07-bta-tubes-and-accessories.webp',
        w300: '/assets/products/300w/07-bta-tubes-and-accessories.webp',
        transparent: '/assets/products/transparent/07-bta-tubes-and-accessories.webp',
      }
    ],
    features: [
      'High-precision multi-start threaded drill tube connection',
      'Internal chip exhaust system preventing hole wall scoring',
      'High torsional stiffness for deep hole L/D ratios up to 100xD',
      'Complete accessories: sealing bushes, guide bushes, tube adapters'
    ],
    applications: [
      'Oil & Gas Drilling Drill Collars',
      'Hydraulic Cylinder Barrels',
      'Power Generation Turbine Rotor Bores'
    ],
    technicalSpecs: [
      { label: 'Drilling System', value: 'Single-Tube BTA / STS System' },
      { label: 'Connection', value: 'Precision Four-Start Threaded Coupling' },
      { label: 'Straightness', value: '< 0.1 mm per meter runout' },
      { label: 'Accessories', value: 'Bushes, Adapters, Connectors' }
    ]
  },

  // 07: Solid Carbide End Mills
  {
    id: 'solid-carbide-end-mills',
    slug: 'solid-carbide-end-mills',
    name: 'Solid Carbide End Mills',
    category: 'Solid Carbide End Mills',
    categorySlug: 'solid-carbide-end-mills',
    shortDescription: 'High-performance solid carbide end mills for precise milling, profiling, slotting and finishing.',
    fullDescription: 'High-performance solid carbide end mills engineered for precise milling, profiling, slotting and finishing. Their optimized flute geometry, rigid carbide construction and wear-resistant coatings provide accurate cutting, efficient chip evacuation, improved surface finish and extended tool life across steel, stainless steel and other engineering materials.',
    images: [
      {
        original: '/assets/products/original/08-solid-carbide-end-mills-set-1.webp',
        w1200: '/assets/products/1200w/08-solid-carbide-end-mills-set-1.webp',
        w600: '/assets/products/600w/08-solid-carbide-end-mills-set-1.webp',
        w300: '/assets/products/300w/08-solid-carbide-end-mills-set-1.webp',
        transparent: '/assets/products/transparent/08-solid-carbide-end-mills-set-1.webp',
      },
      {
        original: '/assets/products/original/09-solid-carbide-end-mills-set-2.webp',
        w1200: '/assets/products/1200w/09-solid-carbide-end-mills-set-2.webp',
        w600: '/assets/products/600w/09-solid-carbide-end-mills-set-2.webp',
        w300: '/assets/products/300w/09-solid-carbide-end-mills-set-2.webp',
        transparent: '/assets/products/transparent/09-solid-carbide-end-mills-set-2.webp',
      }
    ],
    features: [
      'Variable helix and unequal flute spacing to eliminate chatter',
      'Nano-composite AlTiN / TiSiN coating for extreme heat resistance',
      'Sub-micron solid carbide substrate for rigid edge retention',
      'Mirror-polished flutes for smooth chip flow and high feeds'
    ],
    applications: [
      'High-Speed CNC Milling Centers (VMC/HMC)',
      'Die & Mold 3D Profiling and Finishing',
      'Automotive & Aerospace Component Machining'
    ],
    technicalSpecs: [
      { label: 'Flute Configurations', value: '2, 3, 4 & 6 Flutes' },
      { label: 'Helix Angle', value: '35° / 38° Variable Helix' },
      { label: 'Shank Tolerance', value: 'h6 Precision Ground' },
      { label: 'Hardness Capability', value: 'Up to HRC 65' }
    ]
  },

  // 08: Solid Carbide Drills
  {
    id: 'solid-carbide-drills',
    slug: 'solid-carbide-drills',
    name: 'Solid Carbide Drills',
    category: 'Solid Carbide Drills',
    categorySlug: 'solid-carbide-drills',
    shortDescription: 'Precision carbide drills with optimized points and flute geometries for accurate hole making.',
    fullDescription: 'Precision solid carbide drills designed for accurate hole making, excellent positional stability and long tool life. Advanced point and flute geometries support efficient chip evacuation, reduced cutting forces and consistent bore quality across high-speed machining applications and a wide range of workpiece materials.',
    images: [
      {
        original: '/assets/products/original/10-solid-carbide-drills-set-1.webp',
        w1200: '/assets/products/1200w/10-solid-carbide-drills-set-1.webp',
        w600: '/assets/products/600w/10-solid-carbide-drills-set-1.webp',
        w300: '/assets/products/300w/10-solid-carbide-drills-set-1.webp',
        transparent: '/assets/products/transparent/10-solid-carbide-drills-set-1.webp',
      },
      {
        original: '/assets/products/original/11-solid-carbide-drills-set-2.webp',
        w1200: '/assets/products/1200w/11-solid-carbide-drills-set-2.webp',
        w600: '/assets/products/600w/11-solid-carbide-drills-set-2.webp',
        w300: '/assets/products/300w/11-solid-carbide-drills-set-2.webp',
        transparent: '/assets/products/transparent/11-solid-carbide-drills-set-2.webp',
      },
      {
        original: '/assets/products/original/12-solid-carbide-drills-set-3-ai.webp',
        w1200: '/assets/products/1200w/12-solid-carbide-drills-set-3-ai.webp',
        w600: '/assets/products/600w/12-solid-carbide-drills-set-3-ai.webp',
        w300: '/assets/products/300w/12-solid-carbide-drills-set-3-ai.webp',
        transparent: '/assets/products/transparent/12-solid-carbide-drills-set-3-ai.webp',
      },
      {
        original: '/assets/products/original/13-solid-carbide-drills-set-4-ai.webp',
        w1200: '/assets/products/1200w/13-solid-carbide-drills-set-4-ai.webp',
        w600: '/assets/products/600w/13-solid-carbide-drills-set-4-ai.webp',
        w300: '/assets/products/300w/13-solid-carbide-drills-set-4-ai.webp',
        transparent: '/assets/products/transparent/13-solid-carbide-drills-set-4-ai.webp',
      }
    ],
    features: [
      'Self-centering 140° split point eliminates spot drilling',
      'Dual internal through-coolant holes for direct cutting zone cooling',
      'Special curved cutting lip reducing thrust forces and power consumption',
      'High-aspect depth reach: 3D, 5D, 8D, 12D solid drilling'
    ],
    applications: [
      'Deep Hole Drilling in Alloy & Stainless Steels',
      'Heat Exchanger Tube Sheet Hole Arrays',
      'Mass Production Automotive Powertrain Lines'
    ],
    technicalSpecs: [
      { label: 'Point Angle', value: '140° Self-Centering Split Point' },
      { label: 'Coolant Supply', value: 'Internal Dual Helical Channels' },
      { label: 'Hole Tolerance', value: 'IT8 to IT9 Accuracy' },
      { label: 'Coating', value: 'Multi-layer TiAlN / AlTiCrN' }
    ]
  },

  // 09: Carbide Rods
  {
    id: 'carbide-rods',
    slug: 'carbide-rods',
    name: 'Carbide Rods',
    category: 'Carbide Rods',
    categorySlug: 'carbide-rods',
    shortDescription: 'High-performance cemented carbide rods offering toughness, wear resistance and dimensional reliability.',
    fullDescription: 'High-performance cemented carbide rods designed for manufacturing cutting tools and precision wear parts. Fine, ultra-fine, super-fine and sub-micron grades combine durability, toughness and wear resistance for demanding operating conditions. Available in solid ground blanks and internal coolant-hole configurations.',
    grades: ['Fine', 'Ultra Fine', 'Super Fine', 'Sub-Micron'],
    images: [
      {
        original: '/assets/products/original/14-carbide-rods-solid.webp',
        w1200: '/assets/products/1200w/14-carbide-rods-solid.webp',
        w600: '/assets/products/600w/14-carbide-rods-solid.webp',
        w300: '/assets/products/300w/14-carbide-rods-solid.webp',
        transparent: '/assets/products/transparent/14-carbide-rods-solid.webp',
      },
      {
        original: '/assets/products/original/15-carbide-rods-coolant-hole.webp',
        w1200: '/assets/products/1200w/15-carbide-rods-coolant-hole.webp',
        w600: '/assets/products/600w/15-carbide-rods-coolant-hole.webp',
        w300: '/assets/products/300w/15-carbide-rods-coolant-hole.webp',
        transparent: '/assets/products/transparent/15-carbide-rods-coolant-hole.webp',
      },
      {
        original: '/assets/products/original/16-carbide-rods-assortment.webp',
        w1200: '/assets/products/1200w/16-carbide-rods-assortment.webp',
        w600: '/assets/products/600w/16-carbide-rods-assortment.webp',
        w300: '/assets/products/300w/16-carbide-rods-assortment.webp',
        transparent: '/assets/products/transparent/16-carbide-rods-assortment.webp',
      }
    ],
    features: [
      'Sub-micron grain size (0.4–0.8 µm) for optimal hardness/toughness balance',
      'Solid ground blanks and internal helical/straight coolant hole options',
      'Strict h6 grinding tolerance on outside diameter',
      'Consistent cobalt binder distribution with zero internal porosity'
    ],
    applications: [
      'Tool Manufacturing: Endmills, Drills, Step Cutters, Reamers',
      'Wear Parts & Precision Bushings',
      'Punches & Die Tooling'
    ],
    technicalSpecs: [
      { label: 'Available Grades', value: 'Fine, Ultra Fine, Super Fine, Sub-Micron' },
      { label: 'Grain Size', value: '0.4 µm – 0.8 µm' },
      { label: 'Cobalt Content', value: '6% – 12% Co' },
      { label: 'Configurations', value: 'Solid, Single Straight Hole, Twin Helical Holes' }
    ]
  },

  // 10: Reamers
  {
    id: 'reamers',
    slug: 'reamers',
    name: 'Reamers (Cermet / Carbide Brazed)',
    category: 'Reamers',
    categorySlug: 'reamers',
    shortDescription: 'Precision cermet and carbide-brazed reamers for close hole tolerances, improved roundness and superior finishing.',
    fullDescription: 'Precision cermet and carbide-brazed reamers engineered for accurate hole sizing and superior surface finishing. Their rigid bodies and wear-resistant brazed cutting edges support close dimensional tolerances, improved roundness and dependable performance in production reaming applications. Multiple sizes are available for ferrous and non-ferrous machining.',
    images: [
      {
        original: '/assets/products/original/17-reamer-cermet-carbide-brazed.webp',
        w1200: '/assets/products/1200w/17-reamer-cermet-carbide-brazed.webp',
        w600: '/assets/products/600w/17-reamer-cermet-carbide-brazed.webp',
        w300: '/assets/products/300w/17-reamer-cermet-carbide-brazed.webp',
        transparent: '/assets/products/transparent/17-reamer-cermet-carbide-brazed.webp',
      },
      {
        original: '/assets/products/original/17b-reamer-cermet-carbide-brazed-ai.webp',
        w1200: '/assets/products/1200w/17b-reamer-cermet-carbide-brazed-ai.webp',
        w600: '/assets/products/600w/17b-reamer-cermet-carbide-brazed-ai.webp',
        w300: '/assets/products/300w/17b-reamer-cermet-carbide-brazed-ai.webp',
        transparent: '/assets/products/transparent/17b-reamer-cermet-carbide-brazed-ai.webp',
      }
    ],
    features: [
      'Cermet brazed cutting tips for mirror surface finishing without built-up edge',
      'Unequal pitch flutes preventing roundness errors and chatter',
      'Achieves IT6 / IT7 bore tolerance in single pass',
      'High thermal stability for continuous production reaming'
    ],
    applications: [
      'Automotive Valve Guide & Cylinder Head Bores',
      'Hydraulic Valve Bodies & Spool Bores',
      'Precision Bearing Seats'
    ],
    technicalSpecs: [
      { label: 'Cutting Material', value: 'Brazed Cermet / Solid Carbide Tips' },
      { label: 'Hole Tolerance', value: 'H7 / H6 Achievable' },
      { label: 'Surface Finish', value: 'Ra < 0.2 µm' },
      { label: 'Shank Standard', value: 'DIN 6535 HA / HE' }
    ]
  },

  // 11: ISO Turning and Milling Inserts
  {
    id: 'iso-turning-milling-inserts',
    slug: 'iso-turning-milling-inserts',
    name: 'ISO Turning and Milling Inserts',
    category: 'ISO Turning and Milling Inserts',
    categorySlug: 'iso-turning-milling-inserts',
    shortDescription: 'ISO-standard indexable inserts in multiple geometries, grades and coatings for reliable turning and milling.',
    fullDescription: 'Versatile ISO-standard indexable inserts for turning, facing, profiling and milling operations. Offered in multiple geometries, grades and coatings, these inserts deliver reliable edge strength, controlled chip formation, consistent surface quality and economical indexing across a broad range of materials and machining conditions.',
    images: [
      {
        original: '/assets/products/original/18-iso-turning-milling-inserts-assortment.webp',
        w1200: '/assets/products/1200w/18-iso-turning-milling-inserts-assortment.webp',
        w600: '/assets/products/600w/18-iso-turning-milling-inserts-assortment.webp',
        w300: '/assets/products/300w/18-iso-turning-milling-inserts-assortment.webp',
        transparent: '/assets/products/transparent/18-iso-turning-milling-inserts-assortment.webp',
      },
      {
        original: '/assets/products/original/19-iso-turning-milling-insert.webp',
        w1200: '/assets/products/1200w/19-iso-turning-milling-insert.webp',
        w600: '/assets/products/600w/19-iso-turning-milling-insert.webp',
        w300: '/assets/products/300w/19-iso-turning-milling-insert.webp',
        transparent: '/assets/products/transparent/19-iso-turning-milling-insert.webp',
      }
    ],
    features: [
      'Full range of standard ISO geometries: CNMG, WNMG, TNMG, DNMG, APKT, SEKT',
      'Advanced multi-layer CVD / PVD coatings (TiCN + Al2O3 + TiN)',
      'Engineered chipbreaker grooves for roughing, semi-finishing and finishing',
      'Predictable tool life and edge wear across ISO P, M, K, S, H workpiece materials'
    ],
    applications: [
      'CNC Lathes & Turning Centers (Roughing to Super-Finishing)',
      'Face Milling Cutters & Shoulder Mills',
      'Heavy Duty Industrial Turning'
    ],
    technicalSpecs: [
      { label: 'ISO Standards', value: 'CNMG, WNMG, TNMG, DNMG, CCMT, APKT' },
      { label: 'Coating Technology', value: 'Multi-layer CVD & PVD Nano-Coating' },
      { label: 'Workpiece Compatibility', value: 'Steel (P), Stainless (M), Cast Iron (K), Superalloys (S)' },
      { label: 'Edge Prep', value: 'T-Land & Honed Precision Edges' }
    ]
  }
];

export const jtCategories: JTCategory[] = [
  {
    id: 'modular-drill-crown-drill',
    slug: 'modular-drill-crown-drill',
    index: '01',
    name: 'MODULAR DRILL / CROWN DRILL',
    tagline: 'Replaceable Cutting Heads & 1D–12D Depth Ratio',
    description: 'High-rigidity modular drill bodies with quick-change crown heads for stable holemaking and minimized spindle downtime.',
    primaryImage: '/assets/products/600w/10-modular-crown-drill-twin-set.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'modular-drill-crown-drill')
  },
  {
    id: 'deep-hole-drilling-bta',
    slug: 'deep-hole-drilling-bta',
    index: '02',
    name: 'Deep hole drilling - BTA (BRAZED & INDEXABLE)',
    tagline: 'Brazed, Indexable Divided/Undivided & Trepanning',
    description: 'BTA deep-hole boring heads engineered for large-diameter and high-depth machining with pressurized internal chip evacuation.',
    primaryImage: '/assets/products/600w/07-deep-hole-drilling-bta-indexable-undivided.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'deep-hole-drilling-bta')
  },
  {
    id: 'gun-drills',
    slug: 'gun-drills',
    index: '03',
    name: 'GUN DRILLS (BRAZED & INDEXABLE)',
    tagline: 'Precision Deep Holemaking up to 80xD',
    description: 'Single-flute gun drills for high straightness and tight bore tolerances in small to medium deep-hole drilling operations.',
    primaryImage: '/assets/products/600w/05-gun-drill-brazed-and-indexable-types.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'gun-drills')
  },
  {
    id: 'bar-peeling-inserts',
    slug: 'bar-peeling-inserts',
    index: '04',
    name: 'Bar Peeling Inserts',
    tagline: 'RCMX, TNMX, LNKN Carbide Inserts for Peeling Heads',
    description: 'Heavy-duty bar peeling inserts and tool head assemblies engineered for efficient outer skin removal on hot-rolled and continuous bars.',
    primaryImage: '/assets/products/600w/01-bar-peeling-inserts-assortment.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'bar-peeling-inserts')
  },
  {
    id: 'tube-scarfing',
    slug: 'tube-scarfing',
    index: '05',
    name: 'Tube Scarfing',
    tagline: 'O.D. & I.D. Inserts, Holders & Mandrels',
    description: 'Specialized external and internal scarfing inserts, mandrels, and rigid holders engineered for continuous ERW tube mills.',
    primaryImage: '/assets/products/600w/01-tube-scarfing-od-inserts.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'tube-scarfing')
  },
  {
    id: 'bta-tube-accessories',
    slug: 'bta-tube-accessories',
    index: '06',
    name: 'BTA Tube & Accessories',
    tagline: 'Threaded Drill Tubes & Coupling Accessories',
    description: 'Precision BTA drill tubes, multi-start threaded couplings, and sealing accessories for STS deep-hole drilling systems.',
    primaryImage: '/assets/products/600w/05-bta-tubes-threaded.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'bta-tube-accessories')
  },
  {
    id: 'solid-carbide-end-mills',
    slug: 'solid-carbide-end-mills',
    index: '07',
    name: 'Solid Carbide End Mills',
    tagline: 'Variable Helix & Unequal Pitch High-Performance Cutters',
    description: 'Micro-grain solid carbide milling cutters engineered for high-feed profiling, slotting, and finishing with vibration damping.',
    primaryImage: '/assets/products/600w/08-solid-carbide-end-mills-set-1.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'solid-carbide-end-mills')
  },
  {
    id: 'solid-carbide-drills',
    slug: 'solid-carbide-drills',
    index: '08',
    name: 'Solid Carbide Drills',
    tagline: 'Through-Coolant 140° Self-Centering Holemaking',
    description: 'High-rigidity solid carbide drills featuring internal coolant channels and optimized point geometries for high-speed CNC machining.',
    primaryImage: '/assets/products/600w/10-solid-carbide-drills-set-1.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'solid-carbide-drills')
  },
  {
    id: 'carbide-rods',
    slug: 'carbide-rods',
    index: '09',
    name: 'Carbide Rods',
    tagline: 'Fine to Sub-Micron Ground Blanks & Coolant Hole Rods',
    description: 'Premium cemented tungsten carbide rods offering superior toughness, wear resistance, and strict h6 tolerance for tool manufacturing.',
    primaryImage: '/assets/products/600w/14-carbide-rods-solid.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'carbide-rods')
  },
  {
    id: 'reamers',
    slug: 'reamers',
    index: '10',
    name: 'Reamers',
    tagline: 'Cermet & Carbide Brazed Sub-Micron Sizing',
    description: 'High-accuracy cermet and carbide-brazed reamers engineered for tight bore tolerances, roundness correction, and mirror finishing.',
    primaryImage: '/assets/products/600w/17-reamer-cermet-carbide-brazed.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'reamers')
  },
  {
    id: 'iso-turning-milling-inserts',
    slug: 'iso-turning-milling-inserts',
    index: '11',
    name: 'ISO Turning and Milling Inserts',
    tagline: 'Indexable Carbide Inserts in CVD & PVD Grades',
    description: 'Standard ISO turning and milling inserts in multiple geometries and nano-coatings for predictable chip control and extended edge life.',
    primaryImage: '/assets/products/600w/18-iso-turning-milling-inserts-assortment.webp',
    productCount: 1,
    products: jtProductsData.filter(p => p.categorySlug === 'iso-turning-milling-inserts')
  }
];
