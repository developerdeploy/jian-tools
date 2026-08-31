import { isValidNumber } from './shared';

export interface DrillingForcesInput {
  unitSystem: 'metric' | 'imperial';
  diameter: number; // mm or inch
  cuttingSpeed: number; // m/min or sfm
  depth: number; // mm or inch
  feed: number; // mm/rev or in/rev
  // Empirical properties:
  torqueNm?: number;
  thrustN?: number;
}

export interface DrillingForcesResult {
  spindleSpeed: number; // RPM
  feedPerMinute: number; // mm/min or in/min
  timeInCutSec: number; // seconds
  mrr: number; // cm3/min or in3/min
  torque?: number; // Nm or in-lb
  thrust?: number; // N or lbf
  power?: number; // kW or hp
}

export function calculateDrillingForces(input: DrillingForcesInput): DrillingForcesResult | null {
  const { unitSystem, diameter, cuttingSpeed, depth, feed, torqueNm, thrustN } = input;

  if (!isValidNumber(diameter, false) || diameter <= 0) return null;
  if (!isValidNumber(cuttingSpeed, false) || cuttingSpeed <= 0) return null;
  if (!isValidNumber(depth, false) || depth <= 0) return null;
  if (!isValidNumber(feed, false) || feed <= 0) return null;

  let spindleSpeed = 0;
  let mrr = 0;

  if (unitSystem === 'metric') {
    spindleSpeed = (1000 * cuttingSpeed) / (Math.PI * diameter);
  } else {
    spindleSpeed = (12 * cuttingSpeed) / (Math.PI * diameter);
  }

  const feedPerMinute = feed * spindleSpeed;
  const timeInCutMin = depth / feedPerMinute;
  const timeInCutSec = timeInCutMin * 60;

  if (unitSystem === 'metric') {
    // mm^3/min
    const q_mm3_min = (Math.PI * Math.pow(diameter, 2) / 4) * feedPerMinute;
    mrr = q_mm3_min / 1000; // cm^3/min
  } else {
    mrr = (Math.PI * Math.pow(diameter, 2) / 4) * feedPerMinute; // in^3/min
  }

  let result: DrillingForcesResult = {
    spindleSpeed,
    feedPerMinute,
    timeInCutSec,
    mrr
  };

  if (torqueNm !== undefined && thrustN !== undefined) {
    if (unitSystem === 'metric') {
      result.torque = torqueNm;
      result.thrust = thrustN;
      result.power = (torqueNm * spindleSpeed) / 9549.2966;
    } else {
      // Convert Nm to in-lb
      result.torque = torqueNm * 8.85074579;
      // Convert N to lbf
      result.thrust = thrustN / 4.4482216153;
      // HP
      result.power = (result.torque * spindleSpeed) / 63025;
    }
  }

  return result;
}
