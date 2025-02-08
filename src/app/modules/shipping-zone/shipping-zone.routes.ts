import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import shippingZoneController from "./shipping-zone.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class ShippingZoneRoutes
 */
class ShippingZoneRoutes {
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
   * @returns {Router} all shipping zones routes
   */
  public shippingZoneRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/shippingZones",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/shippingZones:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Zone
             *     operationId: store
             *     summary: Create a new shipping zone.
             *     description: Add shipping zone into the system.
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
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The shipping zone name.
             *                 example: cameroon
             *               shippingMethods:
             *                 type: array
             *                 description: The payment method IDs
             *               countries:
             *                 type: array
             *                 description: The country IDs
             *             required:
             *               - name
             *
             *     responses:
             *       201:
             *         description: Shipping zone successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingZone'
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
            router.post("/", shippingZoneController.store);

            /**
             * @swagger
             * /v1/{lang}/shippingZones:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Zone
             *     operationId: showAllShippingZones
             *     summary: Get all shipping zones.
             *     description: Get all shipping zones from the system.
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
             *         description: The shipping zones have been successfully
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
             *                      $ref: '#/components/schemas/ShippingZone'
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
            router.get("/", shippingZoneController.getShippingZones);
          })
        );

        router.use(
          "/shippingZone",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/shippingZone/{shippingZoneId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Zone
             *     operationId: show
             *     summary: Get a shipping zone by ID.
             *     description: Get a shipping zone by id from the system.
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
             *        name: shippingZoneId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping zone to get
             *
             *     responses:
             *       200:
             *         description: The shipping zone has successfully
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
             *                    $ref: '#/components/schemas/ShippingZone'
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
              "/:shippingZoneId",
              shippingZoneController.getShippingZoneById
            );

            /**
             * @swagger
             * /v1/{lang}/shippingZone/{shippingZoneId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Zone
             *     operationId: shippingZoneUpdate
             *     summary: Update a shipping zone by ID.
             *     description: Update a shipping zone by ID.
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
             *        name: shippingZoneId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping zone to get
             *
             *     requestBody:
             *       required: true
             *       content:
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The shipping zone name.
             *                 example: cameroon
             *               shippingMethods:
             *                 type: array
             *                 description: The payment method IDs
             *               countries:
             *                 type: array
             *                 description: The country IDs
             *             required:
             *               - name
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The shipping zone name.
             *                 example: cameroon
             *               shippingMethods:
             *                 type: array
             *                 description: The payment method IDs
             *               countries:
             *                 type: array
             *                 description: The country IDs
             *             required:
             *               - name
             *     responses:
             *       200:
             *         description: The shipping zone has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingZone'
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
            router.put("/:shippingZoneId", shippingZoneController.update);

            /**
             * @swagger
             * /v1/{lang}/shippingZone/{shippingZoneId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Zone
             *     operationId: shippingZoneDelete
             *     summary: Delete a shipping zone by ID.
             *     description: Delete a shipping zone by ID.
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
             *        name: shippingZoneId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping zone to delete
             *
             *     responses:
             *       204:
             *         description: The shipping zone delete successfully.
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
            router.delete("/:shippingZoneId", shippingZoneController.delete);
          })
        );
      })
    );
  }
}

const shippingZoneRoutes = new ShippingZoneRoutes();
export default shippingZoneRoutes;