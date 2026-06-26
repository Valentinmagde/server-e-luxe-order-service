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
          `mongodb://${config.mongoDbUser}:${config.mongoDbPassword}@${config.mongoDbHost}:${
            config.mongoDbPort}/${config.mongoDbName}?authSource=admin`
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
   * Connect to database, retrying with backoff instead of giving up on the
   * first failure (e.g. MongoDB still starting up, or a transient network blip).
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-28
   *
   * @param {number} initialDelayMs delay between retries, capped at 30s
   * @return {Promise<any>} the eventual completion (never rejects — retries forever)
   */
  public asyncOnConnect(initialDelayMs = 3000): Promise<any> {
    const uri = `mongodb://${config.mongoDbUser}:${config.mongoDbPassword}@${config.mongoDbHost}:${config.mongoDbPort}/${config.mongoDbName}?authSource=admin`;
    let delayMs = initialDelayMs;

    return new Promise((resolve) => {
      const attempt = () => {
        mongoose
          .connect(uri)
          .then((dBConnection) => {
            mongoose.connection.on("disconnected", () => {
              console.warn("[DBManager] MongoDB disconnected — driver will attempt to reconnect automatically");
            });
            mongoose.connection.on("reconnected", () => {
              console.log("[DBManager] MongoDB reconnected");
            });
            resolve(dBConnection);
          })
          .catch((error) => {
            console.error(
              `[DBManager] MongoDB connection failed, retrying in ${delayMs / 1000}s:`,
              error?.message || error
            );
            setTimeout(attempt, delayMs);
            delayMs = Math.min(delayMs * 1.5, 30000);
          });
      };
      attempt();
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