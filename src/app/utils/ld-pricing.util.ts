/**
 * Shipping/tax rules for Luxury Distribution (LD) order items only.
 * Manual (non-LD) items always contribute 0 to shipping/tax.
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2026-06-27
 */

export const DEFAULT_SHIPPING_RATE = 100;

export const EU_COUNTRY_CODES = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR",
  "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK",
  "SI", "ES", "SE",
];

export const EU_VAT_RATE = 0.22;

export const LD_SHIPPING_RATES: Record<string, number> = {
  AL: 18, AD: 18, AE: 36, AR: 40, AU: 75, AT: 18, BE: 12, BG: 12, BH: 35,
  BA: 18, BY: 40, BR: 40, CA: 35, CH: 18, CL: 40, CN: 35, CO: 40, CR: 40,
  CU: 40, CY: 15, CZ: 15, DE: 12, DK: 20, DZ: 50, EG: 40, ES: 15, EE: 15,
  FI: 15, FR: 12, GB: 14, GE: 50, GH: 50, GR: 15, HK: 40, HR: 12, HU: 15,
  ID: 27, IN: 35, IE: 15, IS: 18, IT: 10, JM: 50, JP: 30, KZ: 50, KH: 45,
  KR: 30, KW: 45, LI: 18, LT: 15, LU: 12, LV: 15, MO: 45, MA: 40, MC: 15,
  MD: 20, MX: 35, MK: 18, MT: 15, ME: 18, MY: 50, NG: 50, NL: 12, NO: 18,
  NP: 50, NZ: 40, OM: 50, PH: 28, PL: 15, PT: 15, QA: 40, RO: 15, SA: 40,
  SG: 35, SM: 10, RS: 18, SK: 15, SI: 12, SE: 15, TH: 35, TN: 40, TR: 35,
  TW: 35, UY: 50, US: 30, VN: 40, YE: 40, ZA: 50, LY: 100,
};

export type LdPricingItem = {
  qty: number;
  price: number;
  ld_external_id?: string | null;
};

export type LdPricingResult = {
  ldSubtotal: number;
  ldQty: number;
  shippingCost: number;
  shippingPrice: number;
  taxPrice: number;
};

/**
 * Computes shipping cost/price and VAT for the Luxury Distribution items
 * of an order, based on their destination country.
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2026-06-27
 *
 * @param {LdPricingItem[]} items the order/cart items
 * @param {string} countryIso2 the delivery country ISO2 code
 * @returns {LdPricingResult} the computed pricing
 */
export function calculateLdOrderPricing(
  items: LdPricingItem[],
  countryIso2?: string | null
): LdPricingResult {
  const ldItems = (items || []).filter((item) => !!item.ld_external_id);

  const ldSubtotal = ldItems.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const ldQty = ldItems.reduce((sum, item) => sum + item.qty, 0);

  if (ldQty === 0) {
    return { ldSubtotal: 0, ldQty: 0, shippingCost: 0, shippingPrice: 0, taxPrice: 0 };
  }

  const country = (countryIso2 || "").toUpperCase();
  const rate = LD_SHIPPING_RATES[country] ?? DEFAULT_SHIPPING_RATE;
  const shippingCost = rate * Math.ceil(ldQty / 2);
  const supplement = ldSubtotal < 200 ? 20 : 0;
  const shippingPrice = shippingCost + supplement;
  const taxPrice = EU_COUNTRY_CODES.includes(country)
    ? ldSubtotal * EU_VAT_RATE
    : 0;

  return { ldSubtotal, ldQty, shippingCost, shippingPrice, taxPrice };
}
