import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import orderCounterController from "./order-counter.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-17
 *
 * Class OrderCounterRoutes
 */
class OrderCounterRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all order counter routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @returns {Router} the order routes
   */
  public orderCounterRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/orderCounter",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/orderCounter/init:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order Counter
             *     operationId: init
             *     summary: Init order counter.
             *     description: Init order counter into the system.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *
             *     responses:
             *       201:
             *         description: Order counter successfully inited.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/OrderCounter'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *       500:
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.post("/init", orderCounterController.init);
          })
        );
      })
    );
  }
}

const orderCounterRoutes = new OrderCounterRoutes();
export default orderCounterRoutes;