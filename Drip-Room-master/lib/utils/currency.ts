export const DEFAULT_CURRENCY = process.env.STORE_CURRENCY || 'GBP';

/**
 * Format integer minor units (pence/cents) to human display string.
 * Example: 3499 in GBP -> £34.99
 */
export function formatMoney(amountMinorUnits: number, currency = DEFAULT_CURRENCY): string {
  const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });
  return formatter.format(amountMinorUnits / 100);
}

/**
 * Convert major units to minor units (e.g. £34.99 -> 3499)
 */
export function toMinorUnits(amountMajorUnits: number): number {
  return Math.round(amountMajorUnits * 100);
}

/**
 * Convert minor units to major units (e.g. 3499 -> 34.99)
 */
export function toMajorUnits(amountMinorUnits: number): number {
  return amountMinorUnits / 100;
}
