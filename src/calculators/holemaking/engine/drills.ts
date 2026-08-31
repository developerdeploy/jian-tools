import standardDrillsData from '../data/standardDrills.json';
import { UnitSystem } from './shared';

export interface StandardDrill {
  id: string;
  system: string;
  label: string;
  diameterIn: number;
  diameterMm: number;
}

export function getClosestStandardDrill(targetDiameter: number, unit: UnitSystem): StandardDrill | undefined {
  const drills = standardDrillsData as StandardDrill[];
  if (!drills || drills.length === 0) return undefined;

  let closest: StandardDrill | undefined = undefined;
  let minDiff = Infinity;

  for (const drill of drills) {
    const drillDia = unit === 'metric' ? drill.diameterMm : drill.diameterIn;
    const diff = Math.abs(drillDia - targetDiameter);

    if (diff < minDiff) {
      minDiff = diff;
      closest = drill;
    } else if (diff === minDiff && closest) {
      // Tie rule: prefer the slightly larger hole diameter to reduce tapping load.
      const currentClosestDia = unit === 'metric' ? closest.diameterMm : closest.diameterIn;
      if (drillDia > currentClosestDia) {
        closest = drill;
      }
    }
  }

  return closest;
}
