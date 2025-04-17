import { Application, NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import i18n from "../../core/i18n";
import customResponse from "../utils/custom-response.util";
import errorNumbers from "../utils/error-numbers.util";
import statusCode from "../utils/status-code.util";
import cacheManager from "../../core/cache";
import config from "../../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-03-26
 *
 * Class Authorization
 */
class Authorization {
  private app?: Application;

  /**
   * Create a new Authorization instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param {Application} app express application
   */
  constructor(app?: Application) {
    this.app = app;
  }

  /**
   * Check if user is authenticated
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   * @param {NextFunction} next the callback
   * @returns {void}
   */
  public isAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.originalUrl.indexOf(config.swaggerBaseUrl) > -1) return next();
    else {
      const publicKey = config.nodeServerPublicKey as string;
      const authorization = req.headers.authorization;

      // Bearer XXXXXX
      const token =
        authorization && authorization.slice(7, authorization.length);

      // token provided?
      if (token) {
        cacheManager
          .connectToRedis()
          .then(async (redisClient) => {
            const inDenyList: string | null = await redisClient.get(
              `bl_${token}`
            );

            // token in deny list?
            if (inDenyList) {
              // Close connection after token verification to avoid exhausting available connections
              await redisClient.disconnect();

              const response = {
                status: statusCode.httpUnauthorized,
                errNo: errorNumbers.invalidToken,
                errMsg: i18n.__("user.unauthorize.invalidToken"),
              };

              return customResponse.error(response, res);
            } else {
              // token valid?
              jwt.verify(token, publicKey, async(err, decode) => {
                // Close connection after token verification to avoid exhausting available connections
                await redisClient.disconnect();

                if (err) {
                  const response = {
                    status: statusCode.httpUnauthorized,
                    errNo: errorNumbers.invalidToken,
                    errMsg: i18n.__("user.unauthorize.invalidToken"),
                  };

                  return customResponse.error(response, res);
                } else {
                  req.user = decode;
                  next();
                }
              });
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
          status: statusCode.httpUnauthorized,
          errNo: errorNumbers.tokenNotFound,
          errMsg: i18n.__("user.unauthorize.noToken"),
        };

        return customResponse.error(response, res);
      }
    }
  };
}

const authorization = new Authorization();
export default authorization;
