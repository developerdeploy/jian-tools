export const MM_PER_INCH = 25.4;
export const INCH_PER_MM = 1 / 25.4;

export const BAR_PER_PSI = 0.0689475729;
export const PSI_PER_BAR = 14.5037738;

export const LPM_PER_GPM = 3.785411784;
export const GPM_PER_LPM = 0.264172052;

export const M_PER_FOOT = 0.3048;

export const KW_PER_HP = 0.745699872;
export const HP_PER_KW = 1.34102209;

export const NM_PER_IN_LB = 0.112984829;
export const IN_LB_PER_NM = 8.85074579;

export const NM_PER_FT_LB = 1.355817948;
export const FT_LB_PER_NM = 1 / 1.355817948;

export const N_PER_LBF = 4.4482216153;

export const M_MIN_PER_SFM = 0.3048;
export const SFM_PER_M_MIN = 1 / 0.3048;

export type UnitSystem = 'metric' | 'imperial';

// Helper function to validate number inputs (prevents NaN and negative values where inappropriate)
export function isValidNumber(val: number, allowZero: boolean = true, allowNegative: boolean = false): boolean {
  if (isNaN(val) || !isFinite(val)) return false;
  if (!allowNegative && val < 0) return false;
  if (!allowZero && val === 0) return false;
  return true;
}
