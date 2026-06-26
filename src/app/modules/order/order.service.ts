import Order from "./order.model";
import * as jsonpatch from "fast-json-patch";
import ldOrderService, { LdSubmitResult } from "./ld-order.service";
import { calculateLdOrderPricing } from "../../utils/ld-pricing.util";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-05
 *
 * Class OrderService
 */
class OrderService {
  /**
   * Get order details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @param {string} orderId the user id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getOrderById(orderId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const order = await Order.findById(orderId).populate(
            "shipping_method"
          );

          resolve(order);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Resubmit an order to Luxury Distribution (manual retry).
   * Used when the automatic fire-and-forget submission at order creation
   * failed or was sent to the wrong LD environment.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2026-06-20
   *
   * @param {string} orderId the order id
   * @return {Promise<LdSubmitResult | null>} the LD submission result, or null if the order doesn't exist
   */
  public resubmitToLd(orderId: string): Promise<LdSubmitResult | null> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const order = await Order.findById(orderId);
          if (!order) return resolve(null);

          const result = await ldOrderService.submitOrder(order);
          if (result.ok && result.order_id) {
            await Order.updateOne(
              { _id: order._id },
              { $set: { ld_order_id: result.order_id } }
            );
          }

          resolve(result);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get orders details by user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-10-04
   *
   * @param {string} userId the user id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getOrdersByUser(userId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const order = await Order.find({ user: userId })
            .sort({ updated_at: -1 })
            .sort({ updated_at: -1 })
            .populate("shipping_method");

          resolve(order);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all orders
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-18
   *
   * @param {any} query - The query object
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getOrders(query: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const {
            day,
            status,
            page,
            limit,
            method,
            endDate,
            isPaid,
            // download,
            // sellFrom,
            startDate,
            customerName,
          } = query;

          //  day count
          const date = new Date();
          const today = date.toString();
          date.setDate(date.getDate() - Number(day));
          const dateTime = date.toString();

          const beforeToday = new Date();
          beforeToday.setDate(beforeToday.getDate() - 1);
          // const before_today = beforeToday.toString();

          const startDateData = new Date(startDate);
          startDateData.setDate(startDateData.getDate());
          const start_date = startDateData.toString();

          // console.log(" start_date", start_date, endDate);

          const queryObject: any = {};

          if (!status) {
            queryObject.$or = [
              { status: { $regex: `Pending`, $options: "i" } },
              { status: { $regex: `Processing`, $options: "i" } },
              { status: { $regex: `Delivered`, $options: "i" } },
              { status: { $regex: `Cancel`, $options: "i" } },
            ];
          }

          if (customerName) {
            queryObject.$or = [
              {
                "shipping_address.full_name": {
                  $regex: `${customerName}`,
                  $options: "i",
                },
              },
              { order_number: { $regex: `${customerName}`, $options: "i" } },
            ];
          }

          if (day) {
            queryObject.created_at = { $gte: dateTime, $lte: today };
          }

          if (status) {
            queryObject.status = { $regex: `${status}`, $options: "i" };
          }

          if (startDate && endDate) {
            queryObject.updated_at = {
              $gt: start_date,
              $lt: endDate,
            };
          }

          if (isPaid == "true" || isPaid == "false") {
            queryObject.is_paid = isPaid;
          }

          if (method) {
            queryObject.payment_method = { $regex: `${method}`, $options: "i" };
          }

          const pages = Number(page) || 1;
          const limits = Number(limit);
          const skip = (pages - 1) * limits;

          // total orders count
          const totalDoc = await Order.countDocuments(queryObject);
          const orders = await Order.find(queryObject)
            .select(
              `_id invoice order_number payment_method sub_total total shipping_address user_info discount
              shipping_cost status track_number is_paid created_at updated_at`
            )
            .sort({ updated_at: -1 })
            .skip(skip)
            .limit(limits);

          const methodTotals: any = [];
          if (startDate && endDate) {
            // console.log("filter method total");
            const filteredOrders: any = await Order.find(queryObject, {
              _id: 1,
              // subTotal: 1,
              total_price: 1,

              payment_method: 1,
              // createdAt: 1,
              updated_at: 1,
            }).sort({ updatedAt: -1 });
            for (const order of filteredOrders) {
              const { payment_method, total_price } = order;
              const existPayment = methodTotals.find(
                (item: any) => item.method === payment_method
              );

              if (existPayment) {
                existPayment.total += total_price;
              } else {
                methodTotals.push({
                  method: payment_method,
                  total: total_price,
                });
              }
            }
          }

          resolve({
            orders,
            limits,
            pages,
            totalDoc,
            methodTotals,
            // orderOverview,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get dashboard amount
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getDashboardAmount(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // console.log('total')
          const week = new Date();
          week.setDate(week.getDate() - 10);

          const currentDate = new Date();
          currentDate.setDate(1); // Set the date to the first day of the current month
          currentDate.setHours(0, 0, 0, 0); // Set the time to midnight

          const lastMonthStartDate = new Date(currentDate); // Copy the current date
          lastMonthStartDate.setMonth(currentDate.getMonth() - 1); // Subtract one month

          const lastMonthEndDate = new Date(currentDate); // Copy the current date
          lastMonthEndDate.setDate(0); // Set the date to the last day of the previous month
          lastMonthEndDate.setHours(23, 59, 59, 999); // Set the time to the end of the day

          // total order amount
          const totalAmount = await Order.aggregate([
            {
              $group: {
                _id: null,
                tAmount: {
                  $sum: "$total",
                },
              },
            },
          ]);
          // console.log('totalAmount',totalAmount)
          const thisMonthOrderAmount = await Order.aggregate([
            {
              $project: {
                year: { $year: "$updated_at" },
                month: { $month: "$updated_at" },
                total: 1,
                sub_total: 1,
                discount: 1,
                updated_at: 1,
                created_at: 1,
                status: 1,
              },
            },
            {
              $match: {
                is_paid: true,
                year: { $eq: new Date().getFullYear() },
                month: { $eq: new Date().getMonth() + 1 },
              },
            },
            {
              $group: {
                _id: {
                  month: {
                    $month: "$updated_at",
                  },
                },
                total: {
                  $sum: "$total",
                },
                sub_total: {
                  $sum: "$sub_total",
                },

                discount: {
                  $sum: "$discount",
                },
              },
            },
            {
              $sort: { _id: -1 },
            },
            {
              $limit: 1,
            },
          ]);

          const lastMonthOrderAmount = await Order.aggregate([
            {
              $project: {
                year: { $year: "$updated_at" },
                month: { $month: "$updated_at" },
                total: 1,
                sub_total: 1,
                discount: 1,
                updated_at: 1,
                created_at: 1,
                status: 1,
              },
            },
            {
              $match: {
                is_paid: true,
                updated_at: { $gt: lastMonthStartDate, $lt: lastMonthEndDate },
              },
            },
            {
              $group: {
                _id: {
                  month: {
                    $month: "$updated_at",
                  },
                },
                total: {
                  $sum: "$total",
                },
                sub_total: {
                  $sum: "$sub_total",
                },

                discount: {
                  $sum: "$discount",
                },
              },
            },
            {
              $sort: { _id: -1 },
            },
            {
              $limit: 1,
            },
          ]);

          // console.log("thisMonthlyOrderAmount ===>", thisMonthlyOrderAmount);

          // order list last 10 days
          const orderFilteringData = await Order.find(
            {
              is_paid: true,
              updated_at: {
                $gte: week,
              },
            },

            {
              payment_method: 1,
              // paymentDetails: 1,
              total: 1,
              created_at: 1,
              updated_at: 1,
            }
          );

          resolve({
            totalAmount:
              totalAmount.length === 0
                ? 0
                : parseFloat(totalAmount[0].tAmount).toFixed(2),
            thisMonthlyOrderAmount: thisMonthOrderAmount[0]?.total,
            lastMonthOrderAmount: lastMonthOrderAmount[0]?.total,
            ordersData: orderFilteringData,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get best seller product chart
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getBestSellerProductChart(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const totalDoc = await Order.countDocuments({});
          const bestSellingProduct = await Order.aggregate([
            {
              $unwind: "$cart",
            },
            {
              $group: {
                _id: "$cart.title",

                count: {
                  $sum: "$cart.quantity",
                },
              },
            },
            {
              $sort: {
                count: -1,
              },
            },
            {
              $limit: 4,
            },
          ]);

          resolve({
            totalDoc,
            bestSellingProduct,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get dashboard count
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getDashboardCount(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const totalDoc = await Order.countDocuments();

          // total padding order count
          const totalPendingOrder = await Order.aggregate([
            {
              $match: {
                status: "Pending",
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$total" },
                count: {
                  $sum: 1,
                },
              },
            },
          ]);

          // total processing order count
          const totalProcessingOrder = await Order.aggregate([
            {
              $match: {
                status: "Processing",
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$total" },
                count: {
                  $sum: 1,
                },
              },
            },
          ]);

          // total delivered order count
          const totalDeliveredOrder = await Order.aggregate([
            {
              $match: {
                status: "Delivered",
              },
            },
            {
              $group: {
                _id: null,
                total: { $sum: "$total" },
                count: {
                  $sum: 1,
                },
              },
            },
          ]);

          resolve({
            totalOrder: totalDoc,
            totalPendingOrder: totalPendingOrder[0] || 0,
            totalProcessingOrder: totalProcessingOrder[0] || 0,
            totalDeliveredOrder: totalDeliveredOrder[0] || 0,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get recent orders
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {any} query - The query object
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getRecentOrders(query: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const { page, limit } = query;

          const pages = Number(page) || 1;
          const limits = Number(limit) || 8;
          const skip = (pages - 1) * limits;

          const queryObject: any = {};

          queryObject.$or = [
            { status: { $regex: `Pending`, $options: "i" } },
            { status: { $regex: `Processing`, $options: "i" } },
            { status: { $regex: `Delivered`, $options: "i" } },
            { status: { $regex: `Cancel`, $options: "i" } },
          ];

          const totalDoc = await Order.countDocuments(queryObject);

          // query for orders
          const orders = await Order.find(queryObject)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limits);

          // console.log('order------------<', orders);

          resolve({
            orders: orders,
            page: page,
            limit: limit,
            totalOrder: totalDoc,
            // orderOverview,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get dashboard recent orders
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {any} query - The query object
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getDashboardRecentOrders(query: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const { page, limit } = query;

          const pages = Number(page) || 1;
          const limits = Number(limit) || 8;
          const skip = (pages - 1) * limits;

          const queryObject: any = {};

          queryObject.$or = [
            { status: { $regex: `Pending`, $options: "i" } },
            { status: { $regex: `Processing`, $options: "i" } },
            { status: { $regex: `Delivered`, $options: "i" } },
            { status: { $regex: `Cancel`, $options: "i" } },
          ];

          const totalDoc = await Order.countDocuments(queryObject);

          // query for orders
          const orders = await Order.find(queryObject)
            .sort({ updatedAt: -1 })
            .skip(skip)
            .limit(limits);

          // console.log('order------------<', orders);

          resolve({
            orders: orders,
            page: page,
            limit: limit,
            totalOrder: totalDoc,
            // orderOverview,
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create an order
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @param {any} data the request body
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          // La remise affichee sur la facture doit refleter la promo reelle
          // (souvent definie au niveau variant), pas seulement un eventuel
          // discount de coupon deja present dans data.discount.
          const itemsDiscount = (data.order_items || []).reduce(
            (sum: number, item: any) => {
              const original = Number(item.original_price || 0);
              const price = Number(item.price || 0);
              const qty = Number(item.qty || 1);
              return original > price ? sum + (original - price) * qty : sum;
            },
            0
          );
          data.discount = Number(data.discount || 0) + itemsDiscount;

          // Tax/shipping for Luxury Distribution items are recomputed
          // server-side from the country + items, never trusted from the
          // client (the client-side calculation is what actually gets
          // charged at payment time, but the stored order must reflect the
          // same authoritative rule rather than whatever was sent).
          const ldPricing = calculateLdOrderPricing(
            data.order_items,
            data.shipping_address?.country
          );
          data.shipping_cost = ldPricing.shippingCost;
          data.shipping_price = ldPricing.shippingPrice;
          data.tax_price = ldPricing.taxPrice;

          const recomputedTotal =
            Number(data.items_price || 0) -
            Number(data.discount || 0) +
            ldPricing.shippingPrice +
            ldPricing.taxPrice;
          data.total_price = recomputedTotal;
          data.total = recomputedTotal;

          const order = new Order(data);

          const createdOrder = await order.save();

          // Fire-and-forget: submit LD items to Luxury Distribution
          ldOrderService.submitOrder(createdOrder).then(async (result) => {
            if (result.ok && result.order_id) {
              await Order.updateOne(
                { _id: createdOrder._id },
                { $set: { ld_order_id: result.order_id } }
              );
            } else if (!result.ok) {
              console.error(`[OrderService] LD order submission failed (${result.reason}): ${result.detail || ""}`);
            }
          }).catch((err) => {
            console.error("[OrderService] LD order submission error:", err);
          });

          resolve(createdOrder);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Patch an order
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @param {string} orderId the order id
   * @param {any} data the update object
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async patch(orderId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const order = await Order.findById(orderId);

          if (order) {
            const updateObject = jsonpatch.applyPatch(
              order.toObject(),
              data,
              false,
              true
            ).newDocument;

            await Order.updateOne({ _id: orderId }, { $set: updateObject });

            resolve(updateObject);
          } else {
            resolve(order);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete an order by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @param {string} orderId the order id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async delete(orderId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const order = await Order.findById(orderId);

          if (order) {
            const deletedOrder = await order.deleteOne();

            resolve(deletedOrder);
          } else {
            resolve(order);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const orderService = new OrderService();
export default orderService;
