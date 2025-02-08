import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import shippingMethodController from "./shipping-method.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-13
 *
 * Class ShippingMethodRoutes
 */
class ShippingMethodRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all shipping methods routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @returns {Router} all shipping methods routes
   */
  public shippingMethodRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/shippingMethods",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/shippingMethods:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Method
             *     operationId: store
             *     summary: Create a new shipping method.
             *     description: Add shipping method into the system.
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
             *               name:
             *                 type: string
             *                 description: The shipping method name.
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *               minimum_amount:
             *                 type: number
             *                 description: The shipping method minimum amount
             *               description:
             *                 type: string
             *                 description: The shipping method description
             *             required:
             *               - name
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The shipping method name.
             *                 example: stripe
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *               minimum_amount:
             *                 type: number
             *                 description: The shipping method minimum amount
             *               description:
             *                 type: string
             *                 description: The shipping method description
             *             required:
             *               - name
             *
             *     responses:
             *       201:
             *         description: Shipping method successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingMethod'
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
            router.post("/", shippingMethodController.store);

            /**
             * @swagger
             * /v1/{lang}/shippingMethods:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Method
             *     operationId: showAllShippingMethods
             *     summary: Get all shipping methods.
             *     description: Get all shipping methods from the system.
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
             *         description: The shipping methods have been successfully
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
             *                      $ref: '#/components/schemas/ShippingMethod'
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
            router.get("/", shippingMethodController.getShippingMethods);

            /**
             * @swagger
             * /v1/{lang}/shippingMethods/{countryId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Method
             *     operationId: showBYyCountry
             *     summary: Get a shipping methods by country ID.
             *     description: Get a shipping methods by country id from the
             *                  system.
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
             *        name: countryId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the country
             *
             *     responses:
             *       200:
             *         description: The shipping methods have successfully
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
             *                    $ref: '#/components/schemas/ShippingMethod'
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
              "/:countryId",
              shippingMethodController.getShippingMethodsByCountry
            );
          })
        );

        router.use(
          "/shippingMethod",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/shippingMethod/{shippingMethodId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Method
             *     operationId: show
             *     summary: Get a shipping method by ID.
             *     description: Get a shipping method by id from the system.
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
             *        name: shippingMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping method to get
             *
             *     responses:
             *       200:
             *         description: The shipping method has successfully
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
             *                    $ref: '#/components/schemas/ShippingMethod'
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
              "/:shippingMethodId",
              shippingMethodController.getShippingMethodById
            );

            /**
             * @swagger
             * /v1/{lang}/shippingMethod/{shippingMethodId}:
             *   put:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Method
             *     operationId: shippingMethodUpdate
             *     summary: Update a shipping method by ID.
             *     description: Update a shipping method by ID.
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
             *        name: shippingMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping method to get
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
             *                 description: The shipping method name.
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *               description:
             *                 type: string
             *                 description: The shipping method description
             *             required:
             *               - name
             *         application/x-www-form-urlencoded:
             *           schema:
             *             type: object
             *             properties:
             *               name:
             *                 type: string
             *                 description: The shipping method name.
             *               slug:
             *                 type: string
             *                 description: |
             *                    The payment method slug.
             *
             *                    A string can be qualified as a slug if it
             *                    meets the following criteria:
             *                    - It consists of lowercase alphanumeric
             *                      characters (a-z, 0-9) and hyphens (-).
             *                    - It does not contain any spaces, special
             *                      characters, or accented characters.
             *                    - It accurately and concisely describes the
             *                      content of the resource it identifies.
             *                    - It is unique within the context of the
             *                      website or application.
             *               description:
             *                 type: string
             *                 description: The shipping method description
             *             required:
             *               - name
             *     responses:
             *       200:
             *         description: The shipping method has successfully update.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/ShippingMethod'
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
            router.put("/:shippingMethodId", shippingMethodController.update);

            /**
             * @swagger
             * /v1/{lang}/shippingMethod/{shippingMethodId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Shipping Method
             *     operationId: shippingMethodDelete
             *     summary: Delete a shipping mehtod by ID.
             *     description: Delete a shipping method by ID.
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
             *        name: shippingMethodId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the shipping method to delete
             *
             *     responses:
             *       204:
             *         description: The shipping method delete successfully.
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
            router.delete(
              "/:shippingMethodId",
              shippingMethodController.delete
            );
          })
        );
      })
    );
  }
}

const shippingMethodRoutes = new ShippingMethodRoutes();
export default shippingMethodRoutes;