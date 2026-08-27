export interface HeroSceneData {
  id: number;
  stageCode: string;
  stageLabel: string;
  headline: string;
  tagline: string;
  technicalBadge: string;
  description: string;
  videoDesktop: string;
  videoMobile: string;
  poster: string;
  specs: {
    label: string;
    value: string;
  }[];
}

export const heroTubeSheetScenes: HeroSceneData[] = [
  {
    id: 1,
    stageCode: '01 / ALIGN',
    stageLabel: 'TUBE SHEET ESTABLISHING',
    headline: 'PRECISION IN MOTION.',
    tagline: 'HIGH-PRESSURE TUBE SHEET DRILLING',
    technicalBadge: 'WORKPIECE DATUM // ASTM A516 GR.70',
    description: 'An industrial heat exchanger tube sheet enters the machining envelope. Sub-micron coordinate alignment established.',
    videoDesktop: '/assets/video/desktop/scene-01-material.mp4',
    videoMobile: '/assets/video/mobile/scene-01-material.mp4',
    poster: '/assets/video/posters/scene-01-material.webp',
    specs: [
      { label: 'WORKPIECE', value: 'Tube Sheet Plate' },
      { label: 'ALIGNMENT', value: '±0.002 mm Datum' },
      { label: 'STATION', value: 'CNC Deep Hole VMC' },
      { label: 'PATTERN', value: 'Triangular Pitch Array' }
    ]
  },
  {
    id: 2,
    stageCode: '02 / ENGAGE',
    stageLabel: 'MODULAR CROWN HEAD MOUNT',
    headline: 'MODULAR DRILLING.',
    tagline: 'FOR DEMANDING APPLICATIONS',
    technicalBadge: 'SYSTEM // RIGID INDEXABLE COUPLING',
    description: 'High-rigidity modular drill body with self-centering crown head approaches the workpiece. Dual through-coolant channels primed.',
    videoDesktop: '/assets/video/desktop/scene-02-geometry.mp4',
    videoMobile: '/assets/video/mobile/scene-02-geometry.mp4',
    poster: '/assets/video/posters/scene-02-geometry.webp',
    specs: [
      { label: 'TOOL SYSTEM', value: 'Modular Crown Drill' },
      { label: 'DEPTH REACH', value: '1D — 12D Parametric' },
      { label: 'HEAD LOCKING', value: 'High-Torque Cam Lock' },
      { label: 'SHANK', value: 'DIN 6535 Form HE (h6)' }
    ]
  },
  {
    id: 3,
    stageCode: '03 / CUT',
    stageLabel: 'CUTTING ENGAGEMENT & CHIP EVACUATION',
    headline: 'ENGINEERED TO CUT WITH CONTROL.',
    tagline: 'CONTROLLED CHIP FORMATION',
    technicalBadge: 'DYNAMICS // 140° SPLIT POINT',
    description: '140° crown cutting edge engages at high feed. Helical flutes shear and exhaust compact chips through internal high-pressure coolant.',
    videoDesktop: '/assets/video/desktop/scene-03-flutes.mp4',
    videoMobile: '/assets/video/mobile/scene-03-flutes.mp4',
    poster: '/assets/video/posters/scene-03-flutes.webp',
    specs: [
      { label: 'POINT GEOMETRY', value: '140° Self-Centering' },
      { label: 'COOLANT PRESSURE', value: '40–70 Bar Internal' },
      { label: 'CHIP FLOW', value: 'Continuous Evacuation' },
      { label: 'THRUST REDUCTION', value: '-35% vs Standard' }
    ]
  },
  {
    id: 4,
    stageCode: '04 / REPEAT',
    stageLabel: 'HIGH-SPEED INDEXING & REPEATABILITY',
    headline: 'REPEATABLE PERFORMANCE.',
    tagline: 'CYCLE TIME OPTIMIZATION',
    technicalBadge: 'TOLERANCE // IT8 BORE ACCURACY',
    description: 'The drill retracts, the machine indexes, and the next hole is generated with identical cylindrical concentricity and zero tool deflection.',
    videoDesktop: '/assets/video/desktop/scene-04-cutting-edge.mp4',
    videoMobile: '/assets/video/mobile/scene-04-cutting-edge.mp4',
    poster: '/assets/video/posters/scene-04-cutting-edge.webp',
    specs: [
      { label: 'REPEATABILITY', value: '±0.005 mm Hole-to-Hole' },
      { label: 'BORE QUALITY', value: 'Ra < 0.8 µm As-Drilled' },
      { label: 'TOOL LIFE', value: '+45% Extended' },
      { label: 'INDEX TIME', value: '< 1.2s Fast Cycle' }
    ]
  },
  {
    id: 5,
    stageCode: '05 / PRECISION',
    stageLabel: 'COMPLETED TUBE SHEET ARRAY',
    headline: 'PRECISION IN EVERY CUT.',
    tagline: '100% UNIFORM HOLE DENSITY',
    technicalBadge: 'METROLOGY // 100% OPTICAL VERIFIED',
    description: 'The camera pulls back across hundreds of precision bores. Uniform pitch, flawless surface finish, and exact concentricity achieved.',
    videoDesktop: '/assets/video/desktop/scene-06-validation.mp4',
    videoMobile: '/assets/video/mobile/scene-06-validation.mp4',
    poster: '/assets/video/posters/scene-06-validation.webp',
    specs: [
      { label: 'TOTAL HOLES', value: '480 Precision Bores' },
      { label: 'CYLINDRICITY', value: '< 0.008 mm' },
      { label: 'INSPECTION', value: 'Optical CMM Verified' },
      { label: 'APPLICATION', value: 'Boiler / Heat Exchanger' }
    ]
  },
  {
    id: 6,
    stageCode: '06 / JIAN TOOLS',
    stageLabel: 'PRECISION TOOLING REVEAL',
    headline: 'JIAN TOOLS',
    tagline: 'PRECISION TOOLING FOR INDUSTRIAL PERFORMANCE',
    technicalBadge: 'ENGINEERING // VADODARA, INDIA',
    description: 'Engineered for the demands of modern CNC production. From modular crown drills to solid carbide endmills and custom tooling.',
    videoDesktop: '/assets/video/desktop/scene-07-final-tool.mp4',
    videoMobile: '/assets/video/mobile/scene-07-final-tool.mp4',
    poster: '/assets/video/posters/scene-07-final-tool.webp',
    specs: [
      { label: 'MANUFACTURING', value: 'Makarpura GIDC Hub' },
      { label: 'STANDARDS', value: 'DIN 6535 / ISO Standard' },
      { label: 'STOCK AVAILABILITY', value: 'Ready Express Dispatch' },
      { label: 'CUSTOM TOOLING', value: 'Tailored to CAD Drawings' }
    ]
  }
];
