import { isValidNumber } from './shared';

export interface TapLimitsInput {
  threadSystem: 'unified' | 'metric';
  majorDiameter: number; // in or mm
  pitch: number; // TPI or mm
  toleranceClass: string; // 'H2', 'D4', etc.
}

export interface TapLimitsResult {
  basicPitchDiameter: number;
  minLimit?: number;
  maxLimit?: number;
}

export function calculateTapLimits(input: TapLimitsInput, lookupData: any): TapLimitsResult | null {
  const { threadSystem, majorDiameter, pitch, toleranceClass } = input;

  if (!isValidNumber(majorDiameter, false) || majorDiameter <= 0) return null;
  if (!isValidNumber(pitch, false) || pitch <= 0) return null;

  let basicPitchDiameter = 0;

  if (threadSystem === 'unified') {
    // E_basic = D - 0.6495190528 * P (where P = 1/TPI)
    basicPitchDiameter = majorDiameter - (0.6495190528 * (1 / pitch));
  } else {
    // E_basic = D - 0.6495190528 * P (where P is pitch in mm)
    basicPitchDiameter = majorDiameter - (0.6495190528 * pitch);
  }

  let minLimit = undefined;
  let maxLimit = undefined;

  // Simple lookup logic against provided JSON dataset
  if (lookupData && lookupData.limits && lookupData.limits[toleranceClass]) {
     minLimit = lookupData.limits[toleranceClass].min;
     maxLimit = lookupData.limits[toleranceClass].max;
  }

  return {
    basicPitchDiameter,
    minLimit,
    maxLimit,
  };
}
