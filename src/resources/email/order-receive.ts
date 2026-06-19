import OrderType from "../../app/modules/order/order.type";

/**
 * Omit specific properties from an object
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-02
 *
 * @param {OrderType} order The order data.
 * @returns {any} of the email template.
 */
export const payOrderEmailTemplate = (order: OrderType): string => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f6f9fc; padding:40px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; 
      box-shadow:0 2px 6px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background:#ca8a04; padding:20px; text-align:center; color:white;">
        <h1 style="margin:0; font-size:24px; letter-spacing:0.5px;">Order Confirmation</h1>
        <p style="margin:5px 0 0; font-size:14px;">Thanks for shopping with us!</p>
      </div>

      <!-- Greeting -->
      <div style="padding:20px;">
        <p style="font-size:16px; margin:0 0 20px;">Hi <b>${order.shipping_address.full_name.split(" ")[0]}</b>,</p>
        <p style="font-size:14px; margin:0 0 15px;">
          Your order <b>#${order.invoice}</b> placed on <b>${order.created_at.toString().substring(0,10)}</b> 
          has been successfully confirmed.
        </p>
      </div>

      <!-- Order Items -->
      <div style="padding:0 20px;">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:1px solid #eee;">
              <th align="left" style="padding:10px 0; font-size:14px;">Product</th>
              <th align="center" style="padding:10px 0; font-size:14px;">Qty</th>
              <th align="right" style="padding:10px 0; font-size:14px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.order_items.map(item => `
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0; font-size:14px;">${item.title["en"]}</td>
                <td align="center" style="font-size:14px;">${item.qty}</td>
                <td align="right" style="font-size:14px;">$${item.price.toFixed(2)}</td>
              </tr>
            `).join("")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding:10px 0; font-size:14px;">Items:</td>
              <td align="right" style="font-size:14px;">$${order.items_price.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding:10px 0; font-size:14px;">Tax:</td>
              <td align="right" style="font-size:14px;">$${order.tax_price.toFixed(2)}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding:10px 0; font-size:14px;">Shipping:</td>
              <td align="right" style="font-size:14px;">$${order.shipping_price.toFixed(2)}</td>
            </tr>
            <tr style="font-weight:bold; background:#fafafa;">
              <td colspan="2" style="padding:12px 0; font-size:16px;">Total:</td>
              <td align="right" style="font-size:16px; color:#ca8a04;">
                $${order.total_price.toFixed(2)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Shipping Info -->
      <div style="padding:20px;">
        <h3 style="margin:0 0 10px; color:#ca8a04;">Shipping Address</h3>
        <p style="font-size:14px; margin:0; line-height:1.5;">
          ${order.shipping_address.full_name}<br/>
          ${order.shipping_address.address.street}, ${order.shipping_address.address.apartment || ""}<br/>
          ${order.shipping_address.city}, ${order.shipping_address.country}, ${order.shipping_address.postal_code}
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center; padding:20px;">
        <a href="${process.env.WEB_CLIENT_URL}/checkout/success/${order?._id}" 
          style="display:inline-block; background:#ca8a04; color:white; padding:12px 24px; 
          border-radius:5px; text-decoration:none; font-size:14px; font-weight:bold;">
          View your order
        </a>
      </div>

      <!-- Footer -->
      <div style="background:#f6f9fc; padding:15px; text-align:center; font-size:12px; color:#888;">
        Thank you for shopping with us. We hope to see you again soon!
      </div>
    </div>
  </div>
  `;
};

/**
 * Internal notification email template, sent to the store's support/staff
 * address whenever a customer order is paid.
 *
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2026-06-21
 *
 * @param {OrderType} order The order data.
 * @returns {string} the email template.
 */
export const newOrderNotificationEmailTemplate = (order: OrderType): string => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f6f9fc; padding:40px;">
    <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden;
      box-shadow:0 2px 6px rgba(0,0,0,0.05);">

      <!-- Header -->
      <div style="background:#1a1a1a; padding:20px; text-align:center; color:white;">
        <h1 style="margin:0; font-size:22px; letter-spacing:0.5px;">New Paid Order</h1>
        <p style="margin:5px 0 0; font-size:14px;">#${order.invoice}</p>
      </div>

      <!-- Customer -->
      <div style="padding:20px;">
        <p style="font-size:14px; margin:0 0 10px;">
          <b>${order.shipping_address.full_name}</b><br/>
          ${order.shipping_address.email}<br/>
          ${order.shipping_address.phone}
        </p>
        <p style="font-size:14px; margin:0;">
          Payment method: <b>${order.payment_method}</b><br/>
          Total: <b>$${order.total_price.toFixed(2)}</b>
        </p>
      </div>

      <!-- Order Items -->
      <div style="padding:0 20px;">
        <table style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="border-bottom:1px solid #eee;">
              <th align="left" style="padding:10px 0; font-size:14px;">Product</th>
              <th align="center" style="padding:10px 0; font-size:14px;">Qty</th>
              <th align="right" style="padding:10px 0; font-size:14px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.order_items.map(item => `
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 0; font-size:14px;">${item.title["en"]}</td>
                <td align="center" style="font-size:14px;">${item.qty}</td>
                <td align="right" style="font-size:14px;">$${item.price.toFixed(2)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Shipping Info -->
      <div style="padding:20px;">
        <h3 style="margin:0 0 10px; color:#1a1a1a;">Shipping Address</h3>
        <p style="font-size:14px; margin:0; line-height:1.5;">
          ${order.shipping_address.address.street}, ${order.shipping_address.address.apartment || ""}<br/>
          ${order.shipping_address.city}, ${order.shipping_address.country}, ${order.shipping_address.postal_code}
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center; padding:20px;">
        <a href="${process.env.WEB_BACKOFFICE_URL}/order/${order?._id}"
          style="display:inline-block; background:#1a1a1a; color:white; padding:12px 24px;
          border-radius:5px; text-decoration:none; font-size:14px; font-weight:bold;">
          View in backoffice
        </a>
      </div>
    </div>
  </div>
  `;
};
