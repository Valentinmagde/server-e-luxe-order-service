import { Request, Response } from "express";
import i18n from "../../../core/i18n";
import customResponse from "../../utils/custom-response.util";
import statusCode from "../../utils/status-code.util";
import errorNumbers from "../../utils/error-numbers.util";
import validator from "../../utils/validator.util";
import { Errors } from "validatorjs";
import { checkObjectId, generateInvoiceNumber } from "../../utils/helpers.util";
import orderService from "./order.service";
import orderCounterService from "../order-counter/order-counter.service";
import rabbitmqManager from "../../../core/rabbitmq";
import { getTrackingCronState, runTrackingNow } from "./ld-tracking.cron";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-05
 *
 * Class OrderController
 */
class OrderController {
  /**
   * Get order details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getOrderById(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId;
    if (checkObjectId(orderId)) {
      orderService
        .getOrderById(orderId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("order.orderNotFound"),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("order.invalidOrderId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get orders details by user
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-10-04
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getOrdersByUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    if (checkObjectId(userId)) {
      orderService
        .getOrdersByUser(userId)
        .then((result) => {
          const response = {
            status: statusCode.httpOk,
            data: result,
          };

          return customResponse.success(response, res);
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("order.invalidUserId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all orders handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-18
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getOrders(req: Request, res: Response): Promise<void> {
    orderService
      .getOrders(req.query)
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Get dashboard amount handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getDashboardAmount(req: Request, res: Response): Promise<void> {
    orderService
      .getDashboardAmount()
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Get dashboard count handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getDashboardCount(req: Request, res: Response): Promise<void> {
    orderService
      .getDashboardCount()
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Get best seller product chart handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getBestSellerProductChart(
    req: Request,
    res: Response
  ): Promise<void> {
    orderService
      .getBestSellerProductChart()
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Get recent orders handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getRecentOrders(req: Request, res: Response): Promise<void> {
    orderService
      .getRecentOrders(req.query)
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Get dashboard recent orders handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2024-08-02
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getDashboardRecentOrders(
    req: Request,
    res: Response
  ): Promise<void> {
    orderService
      .getDashboardRecentOrders(req.query)
      .then((result) => {
        const response = {
          status: statusCode.httpOk,
          data: result,
        };

        return customResponse.success(response, res);
      })
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Create an order
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    const validationRule = {
      order_items: "required",
      shipping_address: "required",
      payment_method: "required",
      items_price: "required",
      total_price: "required",
      user: "required",
    };
    const reqBody = req.body;

    await validator
      .validator(
        reqBody,
        validationRule,
        {},
        (err: Errors, status: boolean) => {
          if (!status) {
            const response = {
              status: statusCode.httpPreconditionFailed,
              errNo: errorNumbers.validator,
              errMsg: err.errors,
            };

            return customResponse.error(response, res);
          } else {
            (async () => {
              const createdOrder: any = await orderService.store(reqBody);

              const countNumber: any =
                await orderCounterService.getSequenceNextValue("orderId");

              await orderService.patch(createdOrder._id, [
                { op: "add", path: "/order_number", value: countNumber },
                {
                  op: "add",
                  path: "/invoice",
                  value: generateInvoiceNumber(countNumber),
                },
              ]);

              await rabbitmqManager.publishMessage(
                "eluxe.order.createOrderNotification",
                "createOrderNotification",
                {
                  order_id: createdOrder._id,
                  message: createdOrder.payment_description,
                  user_id: createdOrder.user,
                  type: "order",
                }
              );

              await rabbitmqManager.publishMessage(
                "eluxe.order.processOrderCommission",
                "processOrderCommission",
                {
                  order_id: createdOrder._id,
                  profit_grids: reqBody.profit_grids,
                  order_items: reqBody.order_items,
                  user_id: createdOrder.user,
                }
              );

              await rabbitmqManager.publishMessage(
                "eluxe.order.updateProductStock",
                "updateProductStock",
                {
                  productItems: reqBody.order_items.map((e: any) => ({
                    _id: e._id,
                    qty: e.qty,
                  })),
                }
              );

              await rabbitmqManager.publishMessage(
                "eluxe.order.confirmPayment",
                "confirmPayment",
                {
                  name: reqBody.shipping_address.full_name,
                  email: reqBody.shipping_address.email,
                  phone: reqBody.shipping_address.phone,
                  payment_method: reqBody.payment_method,
                  payment_data: reqBody?.payment_data,
                  order: createdOrder._id,
                  amount: reqBody.total,
                  currency: reqBody.currency,
                  confirm: true,
                  description: reqBody.payment_description || "",
                  user: reqBody.user,
                }
              );

              createdOrder.order_number = countNumber;

              return customResponse.success(
                {
                  status: statusCode.httpCreated,
                  data: createdOrder,
                },
                res
              );
            })();
          }
        }
      )
      .catch((error) => {
        const response = {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      });
  }

  /**
   * Patch an order
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async patch(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId;

    // check if user id is valid
    if (checkObjectId(orderId)) {
      const body = req.body;

      orderService
        .patch(orderId, body)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("order.orderNotFound"),
            };

            return customResponse.error(response, res);
          } else {
            if (
              body.some(
                (e: any) =>
                  e.op === "replace" &&
                  e.path === "/status" &&
                  e.value === "Delivered"
              )
            ) {
              (async () => {
                await rabbitmqManager.publishMessage(
                  "eluxe.order.paidOrderCommission",
                  "paidOrderCommission",
                  {
                    order_id: orderId,
                  }
                );
              })();
            }

            const response = {
              status: statusCode.httpOk,
              data: result,
            };

            return customResponse.success(response, res);
          }
        })
        .catch((error) => {
          const response = {
            status: error?.status || statusCode.httpInternalServerError,
            errNo: errorNumbers.genericError,
            errMsg: error?.message || error,
          };

          return customResponse.error(response, res);
        });
    } else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("order.invalidOrderId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Delete an order by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getCronStatus(_req: Request, res: Response): Promise<void> {
    const response = { status: statusCode.httpOk, data: [getTrackingCronState()] };
    return customResponse.success(response, res);
  }

  /**
   * Manually resubmit an order to Luxury Distribution.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2026-06-20
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async resubmitToLd(req: Request, res: Response): Promise<void> {
    const orderId = req.params.orderId;
    if (!checkObjectId(orderId)) {
      return customResponse.error(
        {
          status: statusCode.httpBadRequest,
          errNo: errorNumbers.validator,
          errMsg: i18n.__("order.orderNotFound"),
        },
        res
      );
    }

    try {
      const result = await orderService.resubmitToLd(orderId);
      if (!result) {
        return customResponse.error(
          {
            status: statusCode.httpBadRequest,
            errNo: errorNumbers.genericError,
            errMsg: "Resubmission failed: no LD item on this order, or Luxury Distribution rejected the request (see server logs).",
          },
          res
        );
      }
      return customResponse.success({ status: statusCode.httpOk, data: result }, res);
    } catch (error: any) {
      return customResponse.error(
        {
          status: error?.status || statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        },
        res
      );
    }
  }

  public async runCronNow(req: Request, res: Response): Promise<void> {
    const { cronId } = req.params;
    if (cronId !== "ld-tracking") {
      return customResponse.error({ status: statusCode.httpNotFound, errNo: errorNumbers.resourceNotFound, errMsg: "Unknown cron" }, res);
    }
    runTrackingNow().catch((err) => console.error("[CronController] runTrackingNow error:", err));
    return customResponse.success({ status: statusCode.httpOk, data: { message: "Cron triggered" } }, res);
  }

  // public async delete(req: Request, res: Response): Promise<void> {
  //   const userid = req.params.userId;

  //   if (helpers.checkObjectId(userid)) {
  //     userService
  //       .delete(userid)
  //       .then((result) => {
  //         if (result === null || result === undefined) {
  //           const response = {
  //             status: statusCode.httpNotFound,
  //             errNo: errorNumbers.resourceNotFound,
  //             errMsg: i18n.__("user.profile.userNotFound"),
  //           };

  //           return customResponse.error(response, res);
  //         } else if (result == "isAdmin") {
  //           const response = {
  //             status: statusCode.httpBadRequest,
  //             errNo: errorNumbers.requiredPermission,
  //             errMsg: i18n.__("user.delete.cannotDeleteAdmin"),
  //           };

  //           return customResponse.error(response, res);
  //         } else {
  //           const response = {
  //             status: statusCode.httpNoContent,
  //             data: result,
  //           };

  //           return customResponse.success(response, res);
  //         }
  //       })
  //       .catch((error) => {
  //         const response = {
  //           status: error?.status || statusCode.httpInternalServerError,
  //           errNo: errorNumbers.genericError,
  //           errMsg: error?.message || error,
  //         };

  //         return customResponse.error(response, res);
  //       });
  //   } else {
  //     const response = {
  //       status: statusCode.httpBadRequest,
  //       errNo: errorNumbers.ivalidResource,
  //       errMsg: i18n.__("user.others.invalidUserId"),
  //     };

  //     return customResponse.error(response, res);
  //   }
  // }
}

const orderController = new OrderController();
export default orderController;
