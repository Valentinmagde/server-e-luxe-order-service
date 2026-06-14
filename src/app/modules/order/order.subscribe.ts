import { payOrderEmailTemplate } from "../../../resources/email/order-receive";
import { generateInvoicePdf } from "../../../resources/pdf/invoice.generator";
import DBManager from "../../../core/db";
import rabbitmqManager from "../../../core/rabbitmq";
import orderService from "./order.service";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-16
 *
 * Class OrderSubscribe
 */
class OrderSubscribe {
  /**
   * Update order payment status
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-10
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async updateOrderPaymentStatus(): Promise<void> {
    try {
      const { channel, queue } = await rabbitmqManager.setupQueue(
        "eluxe.payment.updateOrderPaymentStatus",
        "updateOrderPaymentStatusQueue",
        "updateOrderPaymentStatus"
      );

      channel.consume(queue, async (msg: any) => {
        try {
          const data = JSON.parse(msg.content);
          const dbManager = new DBManager();

          // Connect to the database
          const dbConnection = await dbManager.asyncOnConnect();

          await this.handleUpdateOrderPaymentStatus(data, dbConnection);
        } catch (error) {
          console.error("Message processing failed:", error);
        } finally {
          channel.ack(msg); // Always acknowledge the message
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Handles the update of an order's payment status.
   *
   * @param {any} data - The data containing the payment update information, including
   *                     the order ID, payment status, and payment date.
   * @param {any} dbConnection - The active database connection object to perform operations.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   *
   * @throws {Error} - Logs errors to the console if order retrieval, payment update,
   * or email sending fails.
   */
  private async handleUpdateOrderPaymentStatus(
    data: any,
    dbConnection: any
  ): Promise<void> {
    try {
      const order: any = await orderService.getOrderById(data.message.order);
      if (!order) {
        console.error("Order does not exist.");
        return;
      }

      const payload: any[] = [];

      if (data.message.is_paid) {
        payload.push({
          op: "replace",
          path: "/is_paid",
          value: data.message.is_paid,
        });
      }

      if (data.message.paid_at) {
        payload.push({
          op: "replace",
          path: "/paid_at",
          value: data.message.paid_at,
        });
      }

      if (payload.length) {
        await orderService.patch(order._id, payload);
      }

      let attachments: any[] = [];
      try {
        const pdfBuffer = await generateInvoicePdf(order);
        attachments = [{
          filename: `facture-${order.invoice || order._id}.pdf`,
          content: pdfBuffer.toString("base64"),
          encoding: "base64",
          contentType: "application/pdf",
        }];
      } catch (pdfErr) {
        console.error("[OrderSubscribe] PDF generation failed:", pdfErr);
      }

      await rabbitmqManager.publishMessage("eluxe.email.sendMail", "sendMail", {
        receivers: order.shipping_address.email,
        subject: `Order Confirmation – e-luxe.fr - #${order.invoice}`,
        body: payOrderEmailTemplate(order),
        attachments,
      });
    } catch (error) {
      console.error("Error handling Update Order Payment Status:", error);
    } finally {
      dbConnection.disconnect();
    }
  }
}

const orderSubscribe = new OrderSubscribe();
export default orderSubscribe;
