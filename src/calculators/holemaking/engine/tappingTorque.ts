import { isValidNumber } from './shared';

export interface TappingTorqueInput {
  unitSystem: 'metric' | 'imperial';
  baseMinTorque: number; // in-lb from table
  baseMaxTorque: number; // in-lb from table
  materialFactor: number;
  rpm: number; // calculated from surface speed and diameter
}

export interface TappingTorqueResult {
  minTorque: number; // in-lb or Nm
  maxTorque: number; // in-lb or Nm
  minPower: number; // hp or kW
  maxPower: number; // hp or kW
}

export function calculateTappingTorque(input: TappingTorqueInput): TappingTorqueResult | null {
  const { unitSystem, baseMinTorque, baseMaxTorque, materialFactor, rpm } = input;

  if (!isValidNumber(baseMinTorque, false)) return null;
  if (!isValidNumber(baseMaxTorque, false)) return null;
  if (!isValidNumber(materialFactor, false)) return null;
  if (!isValidNumber(rpm, false)) return null;

  // Calculate torque in in-lb
  const tMinInLb = baseMinTorque * materialFactor;
  const tMaxInLb = baseMaxTorque * materialFactor;

  let minTorque = 0;
  let maxTorque = 0;
  let minPower = 0;
  let maxPower = 0;

  if (unitSystem === 'metric') {
    // Convert in-lb to Nm
    minTorque = tMinInLb * 0.112984829;
    maxTorque = tMaxInLb * 0.112984829;

    // kW = torque_Nm * RPM / 9549.2966
    minPower = (minTorque * rpm) / 9549.2966;
    maxPower = (maxTorque * rpm) / 9549.2966;
  } else {
    // Imperial
    minTorque = tMinInLb;
    maxTorque = tMaxInLb;

    // HP = torque_in_lb * RPM / 63025
    minPower = (minTorque * rpm) / 63025;
    maxPower = (maxTorque * rpm) / 63025;
  }

  return {
    minTorque,
    maxTorque,
    minPower,
    maxPower
  };
}

// Helper to calculate RPM from surface speed (SFM or m/min)
export function calculateRpm(speed: number, diameter: number, unitSystem: 'metric' | 'imperial'): number {
  if (unitSystem === 'metric') {
    // speed is m/min, diameter is mm
    return (speed * 1000) / (Math.PI * diameter);
  } else {
    // speed is SFM, diameter is inch
    return (speed * 12) / (Math.PI * diameter);
  }
}
