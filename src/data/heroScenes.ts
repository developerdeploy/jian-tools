import { HeroScene } from '../types';

export const heroScenes: HeroScene[] = [
  {
    id: 1,
    label: "01 / MATERIAL",
    title: "CARBIDE",
    headlineHighlight: "FOUNDATION",
    description: "Precision begins with the right foundation. Ultra-fine micro-grain carbide engineered for extreme hardness, compressive strength, and thermal resistance.",
    desktopVideo: "/assets/video/desktop/scene-01-material.mp4",
    mobileVideo: "/assets/video/mobile/scene-01-material.mp4",
    poster: "/assets/video/posters/scene-01-material.webp",
    technicalBadge: "SUBSTRATE : MICRO-GRAIN TUNGSTEN CARBIDE",
    specs: [
      { label: "GRAIN SIZE", value: "0.4 – 0.6 µm" },
      { label: "HARDNESS", value: "92.5 – 94.0 HRA" },
      { label: "TRS (BENDING STRENGTH)", value: "3800 – 4200 MPa" },
      { label: "DENSITY", value: "14.45 g/cm³" }
    ],
    cameraNote: "Slow macro rotation across raw cylindrical substrate in dark graphite environment."
  },
  {
    id: 2,
    label: "02 / GEOMETRY",
    title: "PRECISION FORM",
    headlineHighlight: "CONTROLLED",
    description: "Engineered around controlled geometry. The raw cylindrical blank evolves into a high-rigidity structural body with balanced mass distribution.",
    desktopVideo: "/assets/video/desktop/scene-02-geometry.mp4",
    mobileVideo: "/assets/video/mobile/scene-02-geometry.mp4",
    poster: "/assets/video/posters/scene-02-geometry.webp",
    technicalBadge: "TOLERANCE : h6 SHANK CONCENTRICITY",
    specs: [
      { label: "BODY RUNOUT", value: "< 0.003 mm" },
      { label: "SHANK STANDARD", value: "DIN 6535 HA / HB" },
      { label: "CORE RIGIDITY", value: "Optimized Web Taper" },
      { label: "CENTER DRIFT", value: "Sub-Micron Zero Datum" }
    ],
    cameraNote: "Tracking shot along evolving precision cylindrical profile with CAD datum lines."
  },
  {
    id: 3,
    label: "03 / FLUTE FORMATION",
    title: "CONTROLLED CHIP FLOW",
    headlineHighlight: "CHIP DYNAMICS",
    description: "Engineered for efficient chip control. Variable helical flutes with high-polish flute valleys ensure seamless chip evacuation under heavy cutting loads.",
    desktopVideo: "/assets/video/desktop/scene-03-flutes.mp4",
    mobileVideo: "/assets/video/mobile/scene-03-flutes.mp4",
    poster: "/assets/video/posters/scene-03-flutes.webp",
    technicalBadge: "HELIX : 30° / 38° VARIABLE EVACUATION",
    specs: [
      { label: "HELIX ANGLE", value: "30° – 45° Variable" },
      { label: "FLUTE FINISH", value: "Ra < 0.1 µm Mirror" },
      { label: "CHIP CONTROL", value: "Continuous Curl & Ejection" },
      { label: "VIBRATION DAMPING", value: "Unequal Indexing" }
    ],
    cameraNote: "Cinematic macro camera tracking along the progressive helical flute curves."
  },
  {
    id: 4,
    label: "04 / CUTTING GEOMETRY",
    title: "BUILT FOR PERFORMANCE",
    headlineHighlight: "REPEATABILITY",
    description: "Accuracy. Repeatability. Control. Multi-facet cutting tip geometry precisely ground to eliminate center deflection and reduce machining thrust force.",
    desktopVideo: "/assets/video/desktop/scene-04-cutting-edge.mp4",
    mobileVideo: "/assets/video/mobile/scene-04-cutting-edge.mp4",
    poster: "/assets/video/posters/scene-04-cutting-edge.webp",
    technicalBadge: "POINT ANGLE : 140° SPLIT POINT",
    specs: [
      { label: "POINT ANGLE", value: "140° Multi-Facet" },
      { label: "CHISEL EDGE", value: "Self-Centering Split" },
      { label: "EDGE HONING", value: "Controlled K-Factor" },
      { label: "THRUST REDUCTION", value: "-35% Cutting Resistance" }
    ],
    cameraNote: "Extreme macro focus zooming into the 4-facet cutting tip and honed cutting edges."
  },
  {
    id: 5,
    label: "05 / FINISHING",
    title: "PRECISION IN EVERY SURFACE",
    headlineHighlight: "SURFACE INTEGRITY",
    description: "Engineered for consistent performance. Advanced surface treatment and ultra-smooth finishes deliver extended tool life and exceptional workpiece finish.",
    desktopVideo: "/assets/video/desktop/scene-05-finishing.mp4",
    mobileVideo: "/assets/video/mobile/scene-05-finishing.mp4",
    poster: "/assets/video/posters/scene-05-finishing.webp",
    technicalBadge: "COATING : NANO-STRUCTURED MULTI-LAYER",
    specs: [
      { label: "NANO-COATING", value: "AlTiN / TiAlSiN Multi-layer" },
      { label: "THERMAL THRESHOLD", value: "Up to 1100°C" },
      { label: "FRICTION COEFFICIENT", value: "0.25 (Dry/Wet)" },
      { label: "TOOL LIFE GAIN", value: "+240% vs Uncoated" }
    ],
    cameraNote: "Slow cinematic specular highlight sweeping across the finished metallic flutes."
  },
  {
    id: 6,
    label: "06 / VALIDATION",
    title: "PRECISION VERIFIED",
    headlineHighlight: "METROLOGY",
    description: "A cinematic representation of engineering validation. Strict optical and dimensional verification ensuring unyielding batch-to-batch repeatability.",
    desktopVideo: "/assets/video/desktop/scene-06-validation.mp4",
    mobileVideo: "/assets/video/mobile/scene-06-validation.mp4",
    poster: "/assets/video/posters/scene-06-validation.webp",
    technicalBadge: "METROLOGY : 100% CONTACTLESS OPTICAL INSPECTION",
    specs: [
      { label: "OPTICAL RESOLUTION", value: "0.001 mm (1 µm)" },
      { label: "PROFILE DEVIATION", value: "< ±0.002 mm" },
      { label: "CONCENTRICITY CHECK", value: "360° Dynamic Scan" },
      { label: "BATCH REPEATABILITY", value: "Cpk > 1.67" }
    ],
    cameraNote: "Subtle laser scanline traveling across the finished precision tool in 3D space."
  },
  {
    id: 7,
    label: "07 / RESULT",
    title: "JIAN TOOLS",
    headlineHighlight: "CARBIDE SOLUTION",
    description: "Your solution provider for all your carbide cutting tools need. Engineered for high-speed CNC machining, maximum metal removal, and predictable tool life.",
    desktopVideo: "/assets/video/desktop/scene-07-final-tool.mp4",
    mobileVideo: "/assets/video/mobile/scene-07-final-tool.mp4",
    poster: "/assets/video/posters/scene-07-final-tool.webp",
    technicalBadge: "RESULT : PRODUCTION-READY PRECISION TOOLING",
    specs: [
      { label: "DRILL DEPTH RANGE", value: "1D through 12D" },
      { label: "APPLICATIONS", value: "Automotive, Die & Mold, CNC" },
      { label: "DELIVERY SPEED", value: "Express Engineering Dispatch" },
      { label: "SUPPORT", value: "Dedicated Application Engineers" }
    ],
    cameraNote: "Camera pulls back into dramatic dark studio hero product shot."
  }
];
