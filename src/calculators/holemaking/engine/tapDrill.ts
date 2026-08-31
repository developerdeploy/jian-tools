import { isValidNumber } from './shared';
import { getClosestStandardDrill, StandardDrill } from './drills';

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
  closestStandardDrill?: StandardDrill;
  actualPercent?: number;
  dimensionalDifference?: number;
  formingMinHole?: number;
  formingMaxHole?: number;
}

export function calculateTapDrill(input: TapDrillInput): TapDrillResult | null {
  const { unitSystem, tapType, majorDiameter, pitch, threadPercent } = input;

  if (tapType === 'machine_screw') {
    return null;
  }

  if (!isValidNumber(majorDiameter, false) || majorDiameter <= 0) return null;
  if (!isValidNumber(pitch, false) || pitch <= 0) return null;
  if (!isValidNumber(threadPercent, false) || threadPercent <= 0 || threadPercent > 100) return null;

  if (tapType === 'forming' && (threadPercent < 55 || threadPercent > 75)) {
     return null; 
  }

  let holeDiameter = 0;
  let formingMinHole = 0;
  let formingMaxHole = 0;

  if (tapType === 'cutting') {
    if (unitSystem === 'metric') {
      holeDiameter = majorDiameter - ((threadPercent * pitch) / 76.98);
    } else {
      holeDiameter = majorDiameter - (threadPercent / (76.98 * pitch));
    }
  } else if (tapType === 'forming') {
    if (unitSystem === 'metric') {
      const k = 0.375 + ((threadPercent - 55) / 20) * 0.125;
      holeDiameter = majorDiameter - (k * pitch);
      formingMinHole = majorDiameter - (0.5 * pitch);
      formingMaxHole = majorDiameter - (0.375 * pitch);
    } else {
      const p = 1 / pitch;
      const k = 0.375 + ((threadPercent - 55) / 20) * 0.125;
      holeDiameter = majorDiameter - (k * p);
      formingMinHole = majorDiameter - (0.5 * p); 
      formingMaxHole = majorDiameter - (0.375 * p); 
    }
  }

  const closestDrill = getClosestStandardDrill(holeDiameter, unitSystem);
  
  let actualPercent = 0;
  if (closestDrill) {
    const drillDia = unitSystem === 'metric' ? closestDrill.diameterMm : closestDrill.diameterIn;
    if (tapType === 'cutting') {
      if (unitSystem === 'metric') {
        actualPercent = (76.98 / pitch) * (majorDiameter - drillDia);
      } else {
        actualPercent = 76.98 * pitch * (majorDiameter - drillDia);
      }
    } else if (tapType === 'forming') {
       let p = unitSystem === 'metric' ? pitch : 1 / pitch;
       let k = (majorDiameter - drillDia) / p;
       actualPercent = 55 + ((k - 0.375) / 0.125) * 20;
    }
  }

  return {
    holeDiameter,
    closestStandardDrill: closestDrill,
    actualPercent: closestDrill ? actualPercent : undefined,
    dimensionalDifference: closestDrill ? Math.abs(holeDiameter - (unitSystem === 'metric' ? closestDrill.diameterMm : closestDrill.diameterIn)) : undefined,
    formingMinHole: tapType === 'forming' ? formingMinHole : undefined,
    formingMaxHole: tapType === 'forming' ? formingMaxHole : undefined,
  };
}
