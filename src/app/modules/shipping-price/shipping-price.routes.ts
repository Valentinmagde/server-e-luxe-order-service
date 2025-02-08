import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import shippingPriceController from "./shipping-price.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class ShippingPriceRoutes
 */
class ShippingPriceRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all shipping zone routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @returns {Router} all shipping prices routes
   */
  public shippingPriceRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/shippingPrices",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/shippingPrices:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Price
             *     operationId: store
             *     summary: Create a new shipping price.
             *     description: Add shipping price into the system.
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
             *     requestBody:
             *       required: true
             *       content:
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               departure:
             *                 type: string
             *                 description: The shipping price departure.
             *                 example: Yaounde
             *               arrival:
             *                 type: string
             *                 description: The shipping price arrival.
             *                 example: Douala
             *               price:
             *                 type: string
             *                 description: The shipping price price
             *               tax:
             *                 type: string
             *                 description: The shipping zone tax
             *                 example: 0
             *             required:
             *               - departure
             *               - arrival
             *               - price
             *               - tax
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               departure:
             *                 type: string
             *                 description: The shipping price departure.
             *                 example: Yaounde
             *               arrival:
             *                 type: string
             *                 description: The shipping price arrival.
             *                 example: Douala
             *               price:
             *                 type: string
             *                 description: The shipping price price
             *               tax:
             *                 type: string
             *                 description: The shipping zone tax
             *                 example: 0
             *             required:
             *               - departure
             *               - arrival
             *               - price
             *               - tax
             *
             *     responses:
             *       201:
             *         description: Shipping price successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingPrice'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
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
            router.post("/", shippingPriceController.store);

            /**
             * @swagger
             * /v1/{lang}/shippingPrices:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Price
             *     operationId: showAllShippingPrices
             *     summary: Get all shipping prices.
             *     description: Get all shipping prices from the system.
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
             *       200:
             *         description: The shipping prices have been successfully
             *                      recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    type: array
             *                    items:
             *                      $ref: '#/components/schemas/ShippingPrice'
             *
             *       400:
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
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
            router.get("/", shippingPriceController.getShippingPrices);
          })
        );

        router.use(
          "/shippingPrice",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/shippingPrice/{shippingPriceId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Price
             *     operationId: show
             *     summary: Get a shipping price by ID.
             *     description: Get a shipping price by id from the system.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: shippingPriceId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping price to get
             *
             *     responses:
             *       200:
             *         description: The shipping price has successfully
             *                      retrieve.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingPrice'
             *
             *       '400':
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       '404':
             *         description: Not Found.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/404'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.get(
              "/:shippingPriceId",
              shippingPriceController.getShippingPriceById
            );

            /**
             * @swagger
             * /v1/{lang}/shippingPrice/departure/{departure}/arrival/{arrival}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Price
             *     operationId: showByDepartureAndArrival
             *     summary: Get a shipping price by departure and arrival.
             *     description: Get a shipping price departure and arrival
             *                  from the system.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: departure
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping price departure
             *                     to get
             *      - in: path
             *        name: arrival
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping price arrival
             *                     to get
             *
             *     responses:
             *       200:
             *         description: The shipping price has successfully
             *                      retrieve.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingPrice'
             *
             *       '400':
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       '404':
             *         description: Not Found.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/404'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.get(
              "/departure/:departure/arrival/:arrival",
              shippingPriceController.getShippingPriceByDepartureArrival
            );

            /**
             * @swagger
             * /v1/{lang}/shippingPrice/{shippingPriceId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Price
             *     operationId: shippingPriceUpdate
             *     summary: Update a shipping price by ID.
             *     description: Update a shipping price by ID.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: shippingPriceId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping price to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               departure:
             *                 type: string
             *                 description: The shipping price departure.
             *                 example: Yaounde
             *               arrival:
             *                 type: string
             *                 description: The shipping price arrival.
             *                 example: Douala
             *               price:
             *                 type: string
             *                 description: The shipping price price
             *               tax:
             *                 type: string
             *                 description: The shipping zone tax
             *                 example: 0
             *             required:
             *               - departure
             *               - arrival
             *               - price
             *               - tax
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               departure:
             *                 type: string
             *                 description: The shipping price departure.
             *                 example: Yaounde
             *               arrival:
             *                 type: string
             *                 description: The shipping price arrival.
             *                 example: Douala
             *               price:
             *                 type: string
             *                 description: The shipping price price
             *               tax:
             *                 type: string
             *                 description: The shipping zone tax
             *                 example: 0
             *             required:
             *               - departure
             *               - arrival
             *               - price
             *               - tax
             *     responses:
             *       200:
             *         description: The shipping price has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingPrice'
             *
             *       '400':
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       '404':
             *         description: Not Found.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/404'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.put("/:shippingPriceId", shippingPriceController.update);

            /**
             * @swagger
             * /v1/{lang}/shippingPrice/{shippingPriceId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Price
             *     operationId: shippingPriceDelete
             *     summary: Delete a shipping price by ID.
             *     description: Delete a shipping price by ID.
             *     parameters:
             *      - in: path
             *        name: lang
             *        schema:
             *          type: string
             *          example: en
             *        required: true
             *        description: Language for the response. Supported
             *          languages ['en', 'fr']
             *      - in: path
             *        name: shippingPriceId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping price to delete
             *
             *     responses:
             *       204:
             *         description: The shipping price delete successfully.
             *
             *       '400':
             *         description: Bad Request.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/400'
             *
             *       '401':
             *         description: Unauthorized.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/401'
             *
             *       '404':
             *         description: Not Found.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/404'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.delete("/:shippingPriceId", shippingPriceController.delete);
          })
        );
      })
    );
  }
}

const shippingPriceRoutes = new ShippingPriceRoutes();
export default shippingPriceRoutes;