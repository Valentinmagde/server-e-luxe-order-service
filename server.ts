/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import customResponse from "./src/app/utils/custom-response.util";
import Routes from "./src/app/routes/routes";
import statusCode from "./src/app/utils/status-code.util";
import errorNumbers from "./src/app/utils/error-numbers.util";
import config from "./src/config";
import AppConfig from "./src/core/app";
import Subscribes from "./src/app/subscribes/subscribes";
import DBManager from "./src/core/db";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-23-03
 *
 * Class Server
 */
class Server {
  private app;
  private http;

  /**
   * Create a new Server instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-23
   *
   */
  constructor() {
    this.app = express();
    this.http = new http.Server(this.app);
  }

  /**
   * Include config
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-23-03
   *
   * @returns {void}
   */
  public appConfig(): void {
    new AppConfig(this.app).includeConfig();
  }

  /**
   * Including app Routes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-23
   *
   * @returns {void}
   */
  public includeRoutes(): void {
    new Routes(this.app).routesConfig();
  }

  /**
   * Including app Subscribes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-27
   *
   * @returns {void}
   */
  public includeSubscribes(): void {
    new Subscribes().subscribesConfig();
  }

  /**
   * Start the server
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-23
   *
   * @returns {void}
   */
  public async startTheServer(): Promise<void> {
    this.appConfig();
    this.includeRoutes();

    // Default error-handling middleware
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
          return next(error);
        }

        const response = {
          status: statusCode.httpInternalServerError,
          errNo: errorNumbers.genericError,
          errMsg: error?.message || error,
        };

        return customResponse.error(response, res);
      }
    );

    const port: number = config.nodeServerPort as number;
    const host: string = config.nodeServerHost;

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });

    // Connect to MongoDB before starting crons so background jobs can query the DB
    try {
      await new DBManager().asyncOnConnect();
      console.log("[Server] MongoDB connected — starting background jobs");
      this.includeSubscribes();
    } catch (err) {
      console.error("[Server] MongoDB connection failed — background jobs not started:", err);
    }
  }
}

const server = new Server();
server.startTheServer();