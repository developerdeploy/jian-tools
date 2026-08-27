import { IndustryApplication } from '../types';

export const industryApplications: IndustryApplication[] = [
  {
    id: "automotive",
    title: "Automotive Manufacturing",
    category: "HIGH-VOLUME COMPONENTS",
    description: "Machining critical powertrain components, cast iron engine blocks, aluminum transmission casings, forged steel steering knuckles, and brake components with unyielding cycle time precision.",
    machineTypes: ["Horizontal Machining Centers (HMC)", "Dedicated Rotary Transfer Lines", "Multi-Spindle CNC Units"],
    keyChallenges: ["Stringent CPK > 1.67 quality demands", "Abrasive cast iron wear", "High-speed cycle time requirements"],
    jianSolution: "Dedicated custom multi-step drills and high-silicon coating endmills that combine hole drilling, chamfering, and face milling into a single pass.",
    cycleTimeReduction: "-28% Cycle Time",
    iconName: "Car"
  },
  {
    id: "cnc-machining",
    title: "Precision CNC Job Shops & VMCs",
    category: "FLEXIBLE PRODUCTION",
    description: "Handling diverse job work across alloy steels (EN8, EN24, EN31), stainless steel (SS304/316), and aerospace titanium with versatile, chatter-free carbide tooling.",
    machineTypes: ["Vertical Machining Centers (VMC)", "CNC Lathes with Live Tooling", "5-Axis Machining Centers"],
    keyChallenges: ["Frequent workpiece material changeovers", "Vibration in long overhang setups", "Tool wear predictability"],
    jianSolution: "Universal variable-pitch endmills and modular drill bodies (1D–12D) with interchangeable inserts for rapid changeovers.",
    cycleTimeReduction: "+45% Tool Life",
    iconName: "Cpu"
  },
  {
    id: "heavy-engineering",
    title: "Heavy Engineering & Energy",
    category: "STRUCTURAL & LARGE BORE",
    description: "Deep hole drilling in tube sheets, large flange bolt circles, hydraulic manifolds, turbine components, and high-pressure valve bodies requiring extreme rigidity and through-coolant performance.",
    machineTypes: ["Floor-Type Boring Machines", "Heavy-Duty CNC Drilling Centers", "Large Bed VMCs"],
    keyChallenges: ["Deep hole chip evacuation beyond 8D", "Severe thermal buildup in thick alloy plates", "High cost of scrapped large workpieces"],
    jianSolution: "High-pressure internal coolant modular drills (8D–12D) with micro-ground polished flute gullets to prevent chip clogging.",
    cycleTimeReduction: "-35% Downtime",
    iconName: "ShieldAlert"
  },
  {
    id: "die-mold",
    title: "Die & Mold Manufacturing",
    category: "HARDENED STEELS",
    description: "High-speed 3D surface profile finishing in pre-hardened and hardened tool steels (HRC 45–60) with sub-micron surface finish and zero spark EDM dependency.",
    machineTypes: ["High-Speed 5-Axis Milling Centers", "Graphite & Hard Milling VMCs"],
    keyChallenges: ["Severe abrasive tool wear in hardened tool steel", "Micro-chipping along cutting edges", "Surface roughness limits"],
    jianSolution: "Nano-composite coated ball nose and corner radius solid carbide endmills engineered for high-feed dry/wet hard milling.",
    cycleTimeReduction: "Ra < 0.15 µm Finish",
    iconName: "Boxes"
  }
];

export const machineCapabilities = [
  {
    name: "CNC Turning Centers",
    role: "Precision turning, boring, facing & grooving",
    spec: "Rigid ISO carbide inserts & internal through-coolant boring bars"
  },
  {
    name: "Vertical Machining Centers (VMC)",
    role: "High-feed pocket milling, profiling & deep drilling",
    spec: "Variable helix endmills & 1D–12D modular indexable drills"
  },
  {
    name: "Heavy-Duty Deep Drilling",
    role: "High L/D ratio drilling up to 12D depth in single pass",
    spec: "40 bar through-coolant delivery & self-centering geometries"
  },
  {
    name: "Mass Production Transfer Lines",
    role: "Continuous 24/7 high-volume automated manufacturing",
    spec: "Custom step drills eliminating secondary operations"
  }
];
