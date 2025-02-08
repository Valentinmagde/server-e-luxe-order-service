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
export const payOrderEmailTemplate = (order: OrderType): any => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;
      background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 20px; border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
        <h1 style="color: #d51243; text-align: center;">Thank You for Your Purchase!</h1>
        <p style="font-size: 16px;">
          Hi ${order.shipping_address.full_name.split(" ")[0]},<br/>
          We are thrilled to inform you that your order has been successfully processed.
        </p>
        <h2 style="background-color: #f8f8f8; padding: 10px; border-radius: 5px; text-align: center;">
          Order #${
            order.invoice
          } <span style="font-size: 14px; color: #555;">(${order.created_at
          .toString()
          .substring(0, 10)})</span>
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f8f8f8; border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 10px;">Product</th>
              <th style="text-align: center; padding: 10px;">Quantity</th>
              <th style="text-align: right; padding: 10px;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${order.order_items
              .map(
                (item) => `
                  <tr style="border-bottom: 1px solid #ddd;">
                    <td style="padding: 10px;">${item.title["en"]}</td>
                    <td style="text-align: center; padding: 10px;">${
                      item.qty
                    }</td>
                    <td style="text-align: right; padding: 10px;">$${item.price.toFixed(
                      2
                    )}</td>
                  </tr>
                `
              )
              .join("\n")}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: left;">Items Price:</td>
              <td style="padding: 10px; text-align: right;">$${order.items_price.toFixed(
                2
              )}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: left;">Tax Price:</td>
              <td style="padding: 10px; text-align: right;">$${order.tax_price.toFixed(
                2
              )}</td>
            </tr>
            <tr>
              <td colspan="2" style="padding: 10px; text-align: left;">Shipping Price:</td>
              <td style="padding: 10px; text-align: right;">$${order.shipping_price.toFixed(
                2
              )}</td>
            </tr>
            <tr style="font-weight: bold; background-color: #f8f8f8;">
              <td colspan="2" style="padding: 10px; text-align: left;">Total Price:</td>
              <td style="padding: 10px; text-align: right;">$${order.total_price.toFixed(
                2
              )}</td>
            </tr>
            <!--<tr>
              <td colspan="2" style="padding: 10px; text-align: left;">Payment Method:</td>
              <td style="padding: 10px; text-align: right;">${
                order.payment_method
              }</td>
            </tr>-->
          </tfoot>
        </table>
        <h2 style="margin-top: 20px; color: #d51243;">Shipping Address</h2>
        <p style="line-height: 1.5; font-size: 16px;">
          ${order.shipping_address.full_name}<br/>
          ${order.shipping_address.address.street}, ${
            order.shipping_address.address.apartment || "N/A"
          }<br/>
          ${order.shipping_address.city},<br/>
          ${order.shipping_address.country}, ${
            order.shipping_address.postal_code
          }
        </p>
        <hr style="margin: 30px 0;"/>
        <p style="text-align: center; font-size: 14px; color: #777;">
          Thank you for choosing us. We look forward to serving you again!
        </p>
      </div>
    </div>
  `;
};
