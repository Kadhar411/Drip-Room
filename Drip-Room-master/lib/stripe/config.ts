export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  amount: number; // in integer minor units (pence)
  currency: string;
  estimatedDays: string;
  freeThreshold?: number; // free if order subtotal exceeds this
}

export const SHIPPING_RATES: Record<string, ShippingOption> = {
  standard: {
    id: 'standard',
    name: 'UK Standard Tracked',
    description: 'Royal Mail 48 Tracked Delivery in biodegradable packaging',
    amount: 450, // £4.50
    currency: 'GBP',
    estimatedDays: '2-3 working days',
    freeThreshold: 6000, // Free on orders over £60.00
  },
  express: {
    id: 'express',
    name: 'UK Express Next-Day',
    description: 'Guaranteed DPD Next-Day Tracked Delivery with signature',
    amount: 850, // £8.50
    currency: 'GBP',
    estimatedDays: '1 working day',
  },
  international: {
    id: 'international',
    name: 'International Air Courier',
    description: 'DHL Express worldwide tracked & insured',
    amount: 2200, // £22.00
    currency: 'GBP',
    estimatedDays: '4-7 working days',
  },
};

export function getShippingRate(tier = 'standard', subtotalMinorUnits = 0): ShippingOption {
  const rate = SHIPPING_RATES[tier] || SHIPPING_RATES.standard;
  if (rate.freeThreshold && subtotalMinorUnits >= rate.freeThreshold) {
    return {
      ...rate,
      amount: 0,
    };
  }
  return rate;
}
