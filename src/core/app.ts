/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import bodyParser from "body-parser";
import cors from "cors";
import ExpressConfigModule from "./express";
import { Application } from "express";
import DBManager from "./db";
import config from "../config";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 *
 * Class AppConfig
 */
class AppConfig {
  private app;

  /**
   * Create a new UserController instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @param {Application} app express application
   */
  constructor(app: Application) {
    process.on("unhandledRejection", (reason, p) => {
      console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
      // application specific logging, throwing an error, or other logic here
    });
    this.app = app;
  }

  /**
   * Include the config.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @return {void}
   */
  public includeConfig(): void {
    this.loadAppLevelConfig();
    this.loadExpressConfig();
  }

  /**
   * Load the App level config.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @return {void}
   */
  public loadAppLevelConfig(): void {
    const allowedOrigins = [config.webClientUrl, config.webBackofficeUrl, config.apiGatewayUrl];
    const corsOptions: cors.CorsOptions = {
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const isLocalhost = /^http:\/\/localhost(:\d+)?$/.test(origin);
        if (isLocalhost || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origin ${origin} not allowed`));
        }
      },
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    };
    this.app.options('*', cors(corsOptions));
    this.app.use(cors(corsOptions));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  }

  /**
   * Load the Express config.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @return {void}
   */
  public loadExpressConfig(): void {
    new ExpressConfigModule(this.app).setAppEngine();
    // new Authorization(this.app).setJWTConfig();
    new DBManager(this.app).setDBConnection();
  }
}

export default AppConfig;
