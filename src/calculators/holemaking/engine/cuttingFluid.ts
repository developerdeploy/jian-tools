import { isValidNumber } from './shared';

export interface CuttingFluidInput {
  unitSystem: 'metric' | 'imperial';
  pressure: number; // bar (metric) or psi (imperial)
  mode: 'flow' | 'orifice';
  orificeDiameter?: number; // mm (metric) or inch (imperial)
  flow?: number; // L/min (metric) or GPM (imperial)
  impellerEfficiency: number; // 1-100
  motorEfficiency: number; // 1-100
}

export interface CuttingFluidResult {
  velocity: number; // m/min or ft/min
  hydraulicPower: number; // kW or hp
  flow: number; // L/min or GPM
  orificeDiameter: number; // mm or inch
  totalEfficiency: number; // 0-1
  motorPower: number; // kW or hp
}

export function calculateCuttingFluid(input: CuttingFluidInput): CuttingFluidResult | null {
  const { unitSystem, pressure, mode, orificeDiameter, flow, impellerEfficiency, motorEfficiency } = input;

  if (!isValidNumber(pressure, false) || pressure <= 0) return null;
  if (!isValidNumber(impellerEfficiency, false) || impellerEfficiency <= 0 || impellerEfficiency > 100) return null;
  if (!isValidNumber(motorEfficiency, false) || motorEfficiency <= 0 || motorEfficiency > 100) return null;

  if (mode === 'flow' && (!isValidNumber(flow!) || flow! <= 0)) return null;
  if (mode === 'orifice' && (!isValidNumber(orificeDiameter!) || orificeDiameter! <= 0)) return null;

  let velocity = 0;
  let computedFlow = flow || 0;
  let computedOrifice = orificeDiameter || 0;
  let hydraulicPower = 0;

  const etaTotal = (impellerEfficiency / 100) * (motorEfficiency / 100);

  if (unitSystem === 'metric') {
    // Metric: P_pa = pressure_bar * 100000
    // rho = 1000 kg/m^3
    const pPa = pressure * 100000;
    const v_m_s = Math.sqrt((2 * pPa) / 1000);
    velocity = v_m_s * 60; // m/min

    if (mode === 'orifice') {
      const d_m = computedOrifice / 1000;
      const area = (Math.PI * Math.pow(d_m, 2)) / 4;
      const q_m3_s = area * v_m_s;
      computedFlow = q_m3_s * 60000; // L/min
    } else {
      const q_m3_s = computedFlow / 60000;
      const area = q_m3_s / v_m_s;
      const d_m = Math.sqrt((4 * area) / Math.PI);
      computedOrifice = d_m * 1000; // mm
    }

    hydraulicPower = (pressure * computedFlow) / 600; // kW

  } else {
    // Imperial
    const v_ft_s = 12.15 * Math.sqrt(pressure);
    velocity = v_ft_s * 60; // ft/min

    if (mode === 'orifice') {
      const area_in2 = (Math.PI * Math.pow(computedOrifice, 2)) / 4;
      computedFlow = v_ft_s * area_in2 * 3.11688; // GPM
    } else {
      const area_in2 = computedFlow / (v_ft_s * 3.11688);
      computedOrifice = Math.sqrt((4 * area_in2) / Math.PI);
    }

    hydraulicPower = (pressure * computedFlow) / 1714; // HP
  }

  const motorPower = hydraulicPower / etaTotal;

  return {
    velocity,
    hydraulicPower,
    flow: computedFlow,
    orificeDiameter: computedOrifice,
    totalEfficiency: etaTotal,
    motorPower
  };
}
