const LD_API_URL =
  process.env.LD_API_URL || "https://api.luxury-distribution.com/api";
const LD_PUBLIC_KEY = process.env.LD_PUBLIC_KEY || "";
const LD_USERNAME = process.env.LD_USERNAME || "";
const LD_IDENTIFIER = process.env.LD_IDENTIFIER || "";

const ORDER_ENDPOINT =
  process.env.NODE_ENV === "production" ? "/v1/order" : "/v1/test-order";

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

class LdOrderService {
  private async getToken(): Promise<string> {
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return cachedToken;
    }

    const res = await fetch(`${LD_API_URL}/v1/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        key: LD_PUBLIC_KEY,
      },
      body: JSON.stringify({
        credentials: { username: LD_USERNAME, identifier: LD_IDENTIFIER },
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`LD auth failed: ${res.status} - ${body}`);
    }

    const data = (await res.json()) as any;
    cachedToken = data.data.token;
    tokenExpiry = Date.now() + 55 * 60 * 1000; // 55 min
    return cachedToken!;
  }

  /**
   * Submit an e-luxe order to Luxury Distribution.
   * Returns the LD order_id on success, or null if no LD items or on failure.
   */
  public async submitOrder(order: any): Promise<number | null> {
    const ldItems = (order.order_items || []).filter(
      (item: any) => item.ld_external_id && item.ld_size
    );

    if (ldItems.length === 0) return null;

    const addr = order.shipping_address;
    const payload = {
      order: {
        address: {
          region_code: `${addr.country || "FR"}-XX`,
          country_id: addr.country,
          street: [
            typeof addr.address === "object"
              ? `${addr.address?.street || ""} ${addr.address?.apartment || ""}`.trim()
              : addr.address || "",
          ],
          postcode: addr.postal_code || "",
          city: addr.city,
          firstname: (addr.full_name || "").split(" ")[0] || addr.full_name,
          lastname: (addr.full_name || "").split(" ").slice(1).join(" ") || "-",
          email: addr.email,
          telephone: addr.phone,
        },
        products: ldItems.map((item: any) => ({
          stock_id: String(item.ld_external_id),
          qty: item.qty,
          size: item.ld_size,
        })),
      },
    };

    try {
      const token = await this.getToken();
      const res = await fetch(`${LD_API_URL}${ORDER_ENDPOINT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const rawBody = await res.text();

      if (!res.ok) {
        console.error(`[LdOrderService] submitOrder failed (${res.status}): ${rawBody}`);
        return null;
      }

      // Defensive guard: an empty 200 body shouldn't happen per LD's docs, but avoid
      // crashing on JSON.parse("") if it ever does.
      if (!rawBody) {
        console.log(`[LdOrderService] submitOrder accepted (${res.status}) but response body was empty`);
        return null;
      }

      let data: any = null;
      try {
        data = JSON.parse(rawBody);
      } catch {
        console.error("[LdOrderService] submitOrder: invalid JSON response:", rawBody);
        return null;
      }
      return data?.data?.order_id ?? null;
    } catch (err) {
      console.error("[LdOrderService] submitOrder error:", err);
      return null;
    }
  }

  /**
   * Fetch tracking number for a LD order.
   */
  public async getTracking(ldOrderId: number): Promise<string | null> {
    try {
      const token = await this.getToken();
      const res = await fetch(
        `${LD_API_URL}/v1/order-tracking-number/${ldOrderId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) return null;

      const data = (await res.json()) as any;
      const tracking = data?.data?.tracking;
      if (!Array.isArray(tracking) || tracking.length === 0) return null;
      return String(tracking[0].tracking_number) || null;
    } catch (err) {
      console.error("[LdOrderService] getTracking error:", err);
      return null;
    }
  }
}

const ldOrderService = new LdOrderService();
export default ldOrderService;
