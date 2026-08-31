import { isValidNumber } from './shared';
import { getClosestStandardDrill } from './drills'; // We'll create this helper

export interface TapDrillInput {
  unitSystem: 'metric' | 'imperial';
  tapType: 'cutting' | 'forming' | 'machine_screw';
  majorDiameter: number; // mm or inch
  pitch: number; // mm (if metric) or TPI (if imperial)
  threadPercent: number; // 1-100 (for cutting, default 70), 55-75 (for forming)
  machineScrewNumber?: string; // e.g. '#8'
}

export interface TapDrillResult {
  holeDiameter: number;
  closestStandardDrill?: { name: string; diameter: number };
  actualPercent?: number;
  dimensionalDifference?: number;
  formingMinHole?: number;
  formingMaxHole?: number;
}

export function calculateTapDrill(input: TapDrillInput): TapDrillResult | null {
  const { unitSystem, tapType, majorDiameter, pitch, threadPercent } = input;

  if (tapType === 'machine_screw') {
    // We will handle machine screw lookup separately or before passing here
    return null; // Will implement via lookup
  }

  if (!isValidNumber(majorDiameter, false) || majorDiameter <= 0) return null;
  if (!isValidNumber(pitch, false) || pitch <= 0) return null;
  if (!isValidNumber(threadPercent, false) || threadPercent <= 0 || threadPercent > 100) return null;

  if (tapType === 'forming' && (threadPercent < 55 || threadPercent > 75)) {
     // Forming taps must be between 55% and 75%
     // The PRD says "show warning, do not extrapolate by default", so we can return null or clamp
     return null; 
  }

  let holeDiameter = 0;
  let formingMinHole = 0;
  let formingMaxHole = 0;

  if (tapType === 'cutting') {
    if (unitSystem === 'metric') {
      // hole_mm = D_mm - ((thread_percent * pitch_mm) / 76.98)
      holeDiameter = majorDiameter - ((threadPercent * pitch) / 76.98);
    } else {
      // hole_in = D_in - (thread_percent / (76.98 * TPI))
      holeDiameter = majorDiameter - (threadPercent / (76.98 * pitch));
    }
  } else if (tapType === 'forming') {
    if (unitSystem === 'metric') {
      const k = 0.375 + ((threadPercent - 55) / 20) * 0.125;
      holeDiameter = majorDiameter - (k * pitch);
      formingMinHole = majorDiameter - (0.5 * pitch);
      formingMaxHole = majorDiameter - (0.375 * pitch);
    } else {
      // P = 1/TPI
      const p = 1 / pitch;
      const k = 0.375 + ((threadPercent - 55) / 20) * 0.125;
      holeDiameter = majorDiameter - (k * p);
      formingMinHole = majorDiameter - (0.5 * p); // D - 1/(2N)
      formingMaxHole = majorDiameter - (0.375 * p); // D - 3/(8N)
    }
  }

  const closestDrill = getClosestStandardDrill(holeDiameter, unitSystem);
  
  let actualPercent = 0;
  if (closestDrill) {
    if (tapType === 'cutting') {
      if (unitSystem === 'metric') {
        actualPercent = (76.98 / pitch) * (majorDiameter - closestDrill.diameter);
      } else {
        actualPercent = 76.98 * pitch * (majorDiameter - closestDrill.diameter);
      }
    } else if (tapType === 'forming') {
       // Reverse interpolation for forming tap
       let p = unitSystem === 'metric' ? pitch : 1 / pitch;
       let k = (majorDiameter - closestDrill.diameter) / p;
       // k = 0.375 + ((threadPercent - 55) / 20) * 0.125
       // (k - 0.375) / 0.125 = (threadPercent - 55) / 20
       actualPercent = 55 + ((k - 0.375) / 0.125) * 20;
    }
  }

  return {
    holeDiameter,
    closestStandardDrill: closestDrill,
    actualPercent: closestDrill ? actualPercent : undefined,
    dimensionalDifference: closestDrill ? Math.abs(holeDiameter - closestDrill.diameter) : undefined,
    formingMinHole: tapType === 'forming' ? formingMinHole : undefined,
    formingMaxHole: tapType === 'forming' ? formingMaxHole : undefined,
  };
}
