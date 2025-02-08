import { Application, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import customResponse from "../app/utils/custom-response.util";
import errorNumbers from "../app/utils/error-numbers.util";
import statusCode from "../app/utils/status-code.util";
import config from "../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 *
 * Class DBManager
 */
class DBManager {
  private app?: Application;
  /**
   * Create a newDBManager instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @param {Application} app express application
   */
  constructor(app?: Application) {
    this.app = app;
  }

  /**
   * Connect to database.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @param {Request} req the http request
   * @param {Response} res the http response
   * @param {NextFunction} next the callback
   *
   * @return {void}
   */
  public onConnect(req: Request, res: Response, next: NextFunction): void {
    const swaggerBaseUrl = config.swaggerBaseUrl;

    // Except documentation route for authentication
    if (req.path.indexOf(swaggerBaseUrl) > -1) return next();
    else {
      mongoose
        .connect(
          `mongodb://${config.mongoDbHost}:${
            config.mongoDbPort
          }/${config.mongoDbName}`
        )
        .then(() => {
          next();
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
  }

  /**
   * Connect to database.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-28
   *
   * @return {Promise<any>} the eventual completion or failure
   */
  public asyncOnConnect(): Promise<any> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          mongoose
          .connect(
            `mongodb://${config.mongoDbHost}:${
              config.mongoDbPort
            }/${config.mongoDbName}`
          )
          .then((dBConnection) => {
            resolve(dBConnection);
          })
          .catch((error) => {
            reject(error);
          });
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Set db connection
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-23
   *
   * @returns {void}
   */
  public setDBConnection(): void {
    this.app?.use(this.onConnect); // General middleware
  }
}

export default DBManager;