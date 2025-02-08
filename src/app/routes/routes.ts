import { Application, Request, Response } from "express";
import swaggerOptions from "../../resources/swagger/order-docs";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import routesGrouping from "../utils/routes-grouping.util";
import statusCode from "../utils/status-code.util";
import errorNumbers from "../utils/error-numbers.util";
import customResponse from "../utils/custom-response.util";
import i18n from "../../core/i18n";
import setLocale from "../middlewares/set-locale.middleware";
import authorization from "../middlewares/authorization.middleware";
import orderRoutes from "../modules/order/order.routes";
import shippingZoneRoutes from "../modules/shipping-zone/shipping-zone.routes";
import
  shippingPriceRoutes
  from "../modules/shipping-price/shipping-price.routes";
import
  shippingMethodRoutes
  from "../modules/shipping-method/shipping-method.routes";
import orderCounterRoutes from "../modules/order-counter/order-counter.routes";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-05
 *
 * Class Routes
 */
class Routes {
  private app: Application;
  private specs: object;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-07-05
   *
   * @param {Application} app express application
   */
  constructor(app: Application) {
    this.app = app;
    this.specs = swaggerJSDoc(swaggerOptions);
  }

  /**
   * Creating app Routes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @returns {void}
   */
  public appRoutes(): void {
    this.app.use(
      "/v1",
      routesGrouping.group((router) => {
        router.use(
          "/:lang",
          setLocale.setLocale,
          authorization.isAuth,
          routesGrouping.group((router) => {
            // Includes order routes
            router.use(orderRoutes.orderRoutes());

            // Includes shipping zone routes
            router.use(shippingZoneRoutes.shippingZoneRoutes());

            // Includes shipping price routes
            router.use(shippingPriceRoutes.shippingPriceRoutes());

            // Includes shipping method routes
            router.use(shippingMethodRoutes.shippingMethodRoutes());

            // Includes order counter routes
            router.use(orderCounterRoutes.orderCounterRoutes());
          })
        );

        // Swagger documentation
        router.use(
          "/orders/docs",
          swaggerUi.serve, swaggerUi.setup(this.specs)
        );
        router.get("/orders/docs.json", (req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.send(this.specs);
        });
      })
    );

    // error handler for not found router
    this.app.all("*", (req: Request, res: Response) => {
      const response = {
        status: statusCode.httpNotFound,
        errNo: errorNumbers.resourceNotFound,
        errMsg: i18n.__("others.routeNotFound"),
      };

      return customResponse.error(response, res);
    });
  }

  /**
   * Load routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @returns {void}
   */
  public routesConfig(): void {
    this.appRoutes();
  }
}

export default Routes;