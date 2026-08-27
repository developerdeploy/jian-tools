export interface HeroScene {
  id: number;
  label: string;
  title: string;
  headlineHighlight?: string;
  description: string;
  desktopVideo: string;
  mobileVideo: string;
  poster: string;
  technicalBadge: string;
  specs?: { label: string; value: string }[];
  cameraNote?: string;
}

export interface ProductCategory {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  badge: string;
  features: string[];
  specs: {
    diameterRange: string;
    fluteRange: string;
    coating: string;
    tolerance: string;
    helixAngle?: string;
  };
  applications: string[];
}

export interface ModularDrillSpec {
  depthRatio: string; // e.g. "1D", "2D", "3D" ... "12D"
  depthMultiplier: number;
  diameterRange: string;
  shankDiameter: string;
  maxHoleDepth: string;
  fluteDesign: string;
  recommendedInsert: string;
  cooling: string;
  rigidityIndex: string;
  image: string;
}

export interface IndustryApplication {
  id: string;
  title: string;
  category: string;
  description: string;
  machineTypes: string[];
  keyChallenges: string[];
  jianSolution: string;
  cycleTimeReduction: string;
  iconName: string;
}

export interface WhyPillar {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: { label: string; value: string }[];
  icon: string;
}
