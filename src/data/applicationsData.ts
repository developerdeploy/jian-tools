export interface ApplicationProfile {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  environmentImage: string;
  description: string;
  challenges: string[];
  jianSolution: string;
  cycleTimeGain: string;
  toolingUsed: string[];
  machines: string[];
}

export const applicationProfiles: ApplicationProfile[] = [
  {
    id: 'tube-and-pipe-mills',
    category: '01 // CONTINUOUS TUBE PRODUCTION',
    title: 'Tube & Pipe Scarfing Lines',
    subtitle: 'High-Frequency Welded (ERW) Tubing Mills',
    environmentImage: '/assets/products/600w/01-tube-scarfing-od-inserts.webp',
    description: 'High-speed continuous tube welding lines require uninterrupted outside and inside weld-seam removal. Tool deflection or thermal micro-chipping can cause surface defects and shut down 24/7 high-tonnage mill production.',
    challenges: [
      'Severe thermal shock and continuous friction against molten/hot weld flash',
      'High-speed vibration causing edge chipping on external scarfing stations',
      'Restricted inside tube bore clearance for I.D. scarfing mandrels'
    ],
    jianSolution: 'JIAN TOOLS custom-grade carbide scarfing inserts and rigid mandrels provide superior thermal fatigue resistance, smooth chip curling, and stable insert pocket clamping under extreme line tensions.',
    cycleTimeGain: '24/7 Continuous Mill Uptime',
    toolingUsed: [
      'Tube Scarfing O.D. Inserts',
      'O.D. Scarfing Tool Holder',
      'Tube Scarfing I.D. Inserts',
      'I.D. Scarfing Mandrel'
    ],
    machines: [
      'ERW Tube Welding Mills',
      'Continuous Pipe Profiling Lines',
      'Cold Drawn Tube (DOM) Facilities'
    ]
  },
  {
    id: 'heavy-engineering-energy',
    category: '02 // DEEP HOLE & PRESSURE VESSELS',
    title: 'Heavy Engineering & Tube Sheets',
    subtitle: 'Heat Exchangers, Boilers & Pressure Vessels',
    environmentImage: '/assets/products/600w/05-bta-tubes-threaded.webp',
    description: 'Boiler tube sheets, nuclear heat exchangers, and hydraulic cylinder tubes require drilling hundreds of deep, high-precision bores across high-tensile alloy steels without center drift or tool breakdown.',
    challenges: [
      'Drilling high L/D aspect ratios (3D to 12D solid, up to 100xD BTA) without deviation',
      'Internal chip jamming causing catastrophic tool body fracture',
      'Maintaining exact cylindrical concentricity across thick boiler plates'
    ],
    jianSolution: 'Our modular crown drills and BTA deep-hole drill tubes deliver high-pressure internal coolant, 140° self-centering geometry, and rigid threaded couplings that eliminate hole runout and reduce drilling cycle times.',
    cycleTimeGain: '38% Faster Tube Sheet Boring',
    toolingUsed: [
      'Modular Crown Drills (1D–12D)',
      'BTA Drill Tubes & Accessories',
      'Through-Coolant Solid Carbide Drills'
    ],
    machines: [
      'Deep Hole Drilling Machines (BTA/STS)',
      'Large Gantry CNC Machining Centers',
      'Horizontal Boring & Milling Machines'
    ]
  },
  {
    id: 'automotive-powertrain',
    category: '03 // MASS PRODUCTION PRECISION',
    title: 'Automotive Powertrain & Components',
    subtitle: 'Engine Blocks, Crankshafts & Transmission Systems',
    environmentImage: '/assets/products/600w/08-solid-carbide-end-mills-set-1.webp',
    description: 'High-volume automotive manufacturing demands micron-level dimensional repeatability across millions of cycles with zero tolerance for burrs, chatter, or tool wear downtime.',
    challenges: [
      'Stringent H7/H6 bore tolerances on valve guides and cylinder heads',
      'High-speed profiling on hardened alloy steels and forged components',
      'Strict cost-per-part targets requiring maximum tool life and regrinding consistency'
    ],
    jianSolution: 'Precision cermet-brazed reamers and variable-helix solid carbide end mills ensure mirror surface finish (Ra < 0.2 µm), chatter-free milling, and predictable tool life across thousands of components.',
    cycleTimeGain: '28% Cycle Time Reduction',
    toolingUsed: [
      'Precision Cermet / Carbide Brazed Reamers',
      'Solid Carbide End Mills',
      'ISO Turning & Milling Inserts'
    ],
    machines: [
      'Twin-Spindle CNC Machining Centers',
      'Automated Transfer Lines',
      'High-Speed Turning Centers'
    ]
  },
  {
    id: 'precision-cnc-machining',
    category: '04 // HIGH-SPEED CNC MACHINING',
    title: 'Precision CNC Machining & Toolmaking',
    subtitle: 'Die & Mold, Tool Manufacture & General Engineering',
    environmentImage: '/assets/products/600w/14-carbide-rods-solid.webp',
    description: 'Job shops and tool manufacturers need versatile, dependable carbide blanks, drills, and endmills to tackle hard-to-machine alloys, complex 3D profiles, and custom cutting geometries.',
    challenges: [
      'Machining hardened steels up to HRC 65 without thermal tool failure',
      'Manufacturing custom step-tools and form cutters with dependable carbide blanks',
      'Eliminating chatter marks on deep cavity die and mold contours'
    ],
    jianSolution: 'Sub-micron ground cemented carbide rods, high-performance solid carbide milling cutters, and indexable turning inserts provide the ultimate foundation for precision manufacturing and toolmaking.',
    cycleTimeGain: '45% Extended Edge Life',
    toolingUsed: [
      'Carbide Rods (Fine to Sub-Micron)',
      'Solid Carbide End Mills',
      'ISO Indexable Inserts'
    ],
    machines: [
      '5-Axis CNC Machining Centers',
      'CNC Tool & Cutter Grinders',
      'High-Precision VMCs'
    ]
  }
];
