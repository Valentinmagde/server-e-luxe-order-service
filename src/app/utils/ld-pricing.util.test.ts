import { calculateLdOrderPricing } from "./ld-pricing.util";

const ldItem = (qty: number, price: number) => ({
  qty,
  price,
  ld_external_id: "stock-1",
});

describe("calculateLdOrderPricing", () => {
  it("returns zeros when there are no LD items", () => {
    const result = calculateLdOrderPricing(
      [{ qty: 2, price: 50, ld_external_id: null }],
      "FR"
    );

    expect(result).toEqual({
      ldSubtotal: 0,
      ldQty: 0,
      shippingCost: 0,
      shippingPrice: 0,
      taxPrice: 0,
    });
  });

  it("applies the France rate (12) at 1x for a single item, no supplement, no tax under 200", () => {
    const result = calculateLdOrderPricing([ldItem(1, 50)], "FR");

    expect(result.ldSubtotal).toBe(50);
    expect(result.shippingCost).toBe(12);
    expect(result.shippingPrice).toBe(12 + 20); // < 200 => +20 supplement
    expect(result.taxPrice).toBeCloseTo(50 * 0.22);
  });

  it("applies the 2x multiplier for 4 items and skips the supplement above 200", () => {
    const result = calculateLdOrderPricing([ldItem(4, 60)], "FR");

    expect(result.ldQty).toBe(4);
    expect(result.ldSubtotal).toBe(240);
    expect(result.shippingCost).toBe(12 * 2);
    expect(result.shippingPrice).toBe(12 * 2);
    expect(result.taxPrice).toBeCloseTo(240 * 0.22);
  });

  it("applies the 5x multiplier for 9 items using the US rate (30)", () => {
    const result = calculateLdOrderPricing([ldItem(9, 100)], "US");

    expect(result.shippingCost).toBe(30 * 5);
    expect(result.taxPrice).toBe(0); // US is not in the EU
  });

  it("falls back to the default rate (100) for an unlisted country", () => {
    const result = calculateLdOrderPricing([ldItem(1, 500)], "ZZ");

    expect(result.shippingCost).toBe(100);
    expect(result.shippingPrice).toBe(100); // >= 200, no supplement
    expect(result.taxPrice).toBe(0);
  });

  it("does not apply tax for non-EU European countries (UK, Switzerland)", () => {
    expect(calculateLdOrderPricing([ldItem(1, 500)], "GB").taxPrice).toBe(0);
    expect(calculateLdOrderPricing([ldItem(1, 500)], "CH").taxPrice).toBe(0);
  });

  it("ignores manual items when computing LD-only totals", () => {
    const result = calculateLdOrderPricing(
      [ldItem(2, 100), { qty: 3, price: 1000, ld_external_id: undefined }],
      "DE"
    );

    expect(result.ldQty).toBe(2);
    expect(result.ldSubtotal).toBe(200);
  });
});
