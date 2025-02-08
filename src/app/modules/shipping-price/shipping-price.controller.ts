import { Request, Response } from "express";
import i18n from "../../../core/i18n";
import customResponse from "../../utils/custom-response.util";
import statusCode from "../../utils/status-code.util";
import errorNumbers from "../../utils/error-numbers.util";
import validator from "../../utils/validator.util";
import { Errors } from "validatorjs";
import { checkObjectId } from "../../utils/helpers.util";
import shippingPriceService from "./shipping-price.service";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class ShippingPriceController
 */
class ShippingPriceController {
  /**
   * Get shipping price details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getShippingPriceById(
    req: Request,
    res: Response
  ): Promise<void> {
    const shippingPriceId = req.params.shippingPriceId;
    if (checkObjectId(shippingPriceId)) {
      shippingPriceService
        .getShippingPriceById(shippingPriceId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("shippingPrice.shippingPriceNotFound"),
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
        errMsg: i18n.__("shippingPrice.invalidShippingPriceId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get shipping price by departure and arrival details handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-22
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getShippingPriceByDepartureArrival(
    req: Request,
    res: Response
  ): Promise<void> {
    const departure = req.params.departure;
    const arrival = req.params.arrival;

    if (
        checkObjectId(departure) &&
        checkObjectId(arrival)
      ) {
      shippingPriceService
        .getShippingPriceByDepartureArrival(departure, arrival)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("shippingPrice.shippingPriceNotFound"),
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
    } else if(!checkObjectId(departure)) {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("shippingPrice.invalidDepartureId"),
      };

      return customResponse.error(response, res);
    }
    else {
      const response = {
        status: statusCode.httpBadRequest,
        errNo: errorNumbers.ivalidResource,
        errMsg: i18n.__("shippingPrice.invalidArrivalId"),
      };

      return customResponse.error(response, res);
    }
  }

  /**
   * Get all shipping prices handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async getShippingPrices(req: Request, res: Response): Promise<void> {
    shippingPriceService
      .getShippingPrices()
      .then((result) => {
        if (result === null || result === undefined) {
          const response = {
            status: statusCode.httpNotFound,
            errNo: errorNumbers.resourceNotFound,
            errMsg: i18n.__("shippingPrice.shippingPriceNotFound"),
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
  }

  /**
   * Add new shipping price handler
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async store(req: Request, res: Response): Promise<void> {
    const validationRule = {
      departure: "required|string",
      arrival: "required|string",
      price: "required",
      tax: "required"
    };

    await validator
      .validator(
        req.body,
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
            shippingPriceService
              .store(req.body)
              .then((result) => {
                const response = {
                  status: statusCode.httpCreated,
                  data: result,
                };

                return customResponse.success(response, res);
              })
              .catch((error) => {
                const response = {
                  status:
                    error?.status || statusCode.httpInternalServerError,
                  errNo: errorNumbers.genericError,
                  errMsg: error?.message || error,
                };

                return customResponse.error(response, res);
              });
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
   * Update a shipping price
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async update(req: Request, res: Response): Promise<void> {
    const validationRule = {
      departure: "required|string",
      arrival: "required|string",
      price: "required",
      tax: "required"
    };

    await validator
      .validator(
        req.body,
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
            const shippingPriceId = req.params.shippingPriceId;
            // check if role id is valid
            if (checkObjectId(shippingPriceId)) {
              shippingPriceService
                .update(shippingPriceId, req.body)
                .then((result) => {
                  if (result === null || result === undefined) {
                    const response = {
                      status: statusCode.httpNotFound,
                      errNo: errorNumbers.resourceNotFound,
                      errMsg: i18n.__("shippingPrice.shippingPriceNotFound"),
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
                    status:
                      error?.status || statusCode.httpInternalServerError,
                    errNo: errorNumbers.genericError,
                    errMsg: error?.message || error,
                  };

                  return customResponse.error(response, res);
                });
            } else {
              const response = {
                status: statusCode.httpBadRequest,
                errNo: errorNumbers.ivalidResource,
                errMsg: i18n.__("shippingPrice.invalidShippingPriceId"),
              };

              return customResponse.error(response, res);
            }
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
   * Delete a shipping price by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async delete(req: Request, res: Response): Promise<void> {
    const shippingPriceId = req.params.shippingPriceId;

    if (checkObjectId(shippingPriceId)) {
      shippingPriceService
        .delete(shippingPriceId)
        .then((result) => {
          if (result === null || result === undefined) {
            const response = {
              status: statusCode.httpNotFound,
              errNo: errorNumbers.resourceNotFound,
              errMsg: i18n.__("shippingPrice.shippingPriceNotFound"),
            };

            return customResponse.error(response, res);
          } else {
            const response = {
              status: statusCode.httpNoContent,
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
        errMsg: i18n.__("shippingPrice.invalidShippingPriceId"),
      };

      return customResponse.error(response, res);
    }
  }
}

const shippingPriceController = new ShippingPriceController();
export default shippingPriceController;
