import express, { Router } from "express";
import dotenv from "dotenv";
import routesGrouping from "../../utils/routes-grouping.util";
import orderController from "./order.controller";

dotenv.config();

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-05
 *
 * Class OrderRoutes
 */
class OrderRoutes {
  private router: Router;

  /**
   * Create a new Routes instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   */
  constructor() {
    this.router = express.Router({ mergeParams: true });
  }

  /**
   * Creating all order routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @returns {Router} the order routes
   */
  public orderRoutes(): Router {
    return this.router.use(
      routesGrouping.group((router) => {
        router.use(
          "/orders",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/orders:
             *   post:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: store
             *     summary: Create an order.
             *     description: Add an order into the system.
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
             *               order_items:
             *                  type: array
             *                  items:
             *                    type: object
             *                    properties:
             *                      name:
             *                        type: string
             *                        description: Name of item
             *                        example: Pencil
             *                        required: true
             *                      qty:
             *                        type: number
             *                        description: Quantity of item
             *                        example: 1
             *                        required: true
             *                      image:
             *                        type: string
             *                        description: Url of item image
             *                      price:
             *                        type: number
             *                        description: Item price
             *                        required: true
             *                      product:
             *                        type: number
             *                        description: Item ID
             *                        required: true
             *               shipping_address:
             *                 type: object
             *                 properties:
             *                   full_name:
             *                     type: string
             *                     description: The customer's name.
             *                     example: Doe
             *                     required: true
             *                   company:
             *                     type: string
             *                     description: The company's name.
             *                     example: Kitecole
             *                   state:
             *                     type: string
             *                     description: The customer's name.
             *                     example: Yaounde
             *                   address:
             *                     type: string
             *                     description: The customer's address.
             *                     example: Yaounde, Biyem-assi
             *                     required: true
             *                   city:
             *                     type: string
             *                     description: The customer's city.
             *                     example: Yaounde
             *                     required: true
             *                   postal_code:
             *                     type: string
             *                     description: The customer's postal code.
             *                     example: Yaounde
             *                     required: true
             *                   country:
             *                     type: string
             *                     description: The customer's country.
             *                     example: Cameroon
             *                     required: true
             *                   phone:
             *                     type: string
             *                     description: The customer's phone number.
             *                     required: true
             *                   email:
             *                     type: string
             *                     description: The customer's email.
             *                     required: true
             *                   latlatitude:
             *                     type: number
             *                     description: The customer address latitude.
             *                   longitude:
             *                     type: number
             *                     description: The longitude of customer
             *                                  address.
             *               payment_method:
             *                 type: string
             *                 description: The payment method.
             *                 example: Paypal
             *               payment_result:
             *                 type: object
             *                 properties:
             *                   id:
             *                     type: string
             *                     description: The payment result id
             *                   status:
             *                     type: string
             *                     description: The payment status
             *                   update_time:
             *                     type: string
             *                     description: The payment update time
             *                     format: date-time
             *                   email_address:
             *                     type: string
             *                     description: The payment email address
             *                     format: date-time
             *               items_price:
             *                 type: number
             *                 description: Total items price
             *               shipping_price:
             *                 type: number
             *                 description: The shipping price
             *               tax_price:
             *                 type: number
             *                 description: The tax price
             *               total_price:
             *                 type: number
             *                 description: The total price
             *               delivery_note:
             *                 type: string
             *                 description: Delivery note
             *               user:
             *                 type: string
             *                 description: The customer ID
             *             required:
             *               - order_items
             *               - shipping_address
             *               - payment_method
             *               - items_price
             *               - total_price
             *               - user
             *
             *         application/json:
             *           schema:
             *             type: object
             *             properties:
             *               order_items:
             *                  type: array
             *                  items:
             *                    type: object
             *                    properties:
             *                      name:
             *                        type: string
             *                        description: Name of item
             *                        example: Pencil
             *                        required: true
             *                      qty:
             *                        type: number
             *                        description: Quantity of item
             *                        example: 1
             *                        required: true
             *                      image:
             *                        type: string
             *                        description: Url of item image
             *                      price:
             *                        type: number
             *                        description: Item price
             *                        required: true
             *                      product:
             *                        type: number
             *                        description: Item ID
             *                        required: true
             *               shipping_address:
             *                 type: object
             *                 properties:
             *                   full_name:
             *                     type: string
             *                     description: The customer's name.
             *                     example: Doe
             *                     required: true
             *                   company:
             *                     type: string
             *                     description: The company's name.
             *                     example: Kitecole
             *                   state:
             *                     type: string
             *                     description: The customer's name.
             *                     example: Yaounde
             *                   address:
             *                     type: string
             *                     description: The customer's address.
             *                     example: Yaounde, Biyem-assi
             *                     required: true
             *                   city:
             *                     type: string
             *                     description: The customer's city.
             *                     example: Yaounde
             *                     required: true
             *                   postal_code:
             *                     type: string
             *                     description: The customer's postal code.
             *                     example: Yaounde
             *                     required: true
             *                   country:
             *                     type: string
             *                     description: The customer's country.
             *                     example: Cameroon
             *                     required: true
             *                   phone:
             *                     type: string
             *                     description: The customer's phone number.
             *                     required: true
             *                   email:
             *                     type: string
             *                     description: The customer's email.
             *                     required: true
             *                   latlatitude:
             *                     type: number
             *                     description: The customer address latitude.
             *                   longitude:
             *                     type: number
             *                     description: The longitude of customer
             *                                  address.
             *               payment_method:
             *                 type: string
             *                 description: The payment method.
             *                 example: Paypal
             *               payment_result:
             *                 type: object
             *                 properties:
             *                   id:
             *                     type: string
             *                     description: The payment result id
             *                   status:
             *                     type: string
             *                     description: The payment status
             *                   update_time:
             *                     type: string
             *                     description: The payment update time
             *                     format: date-time
             *                   email_address:
             *                     type: string
             *                     description: The payment email address
             *                     format: date-time
             *               items_price:
             *                 type: number
             *                 description: Total items price
             *               shipping_price:
             *                 type: number
             *                 description: The shipping price
             *               tax_price:
             *                 type: number
             *                 description: The tax price
             *               total_price:
             *                 type: number
             *                 description: The total price
             *               delivery_note:
             *                 type: string
             *                 description: Delivery note
             *               user:
             *                 type: string
             *                 description: The customer ID
             *             required:
             *               - order_items
             *               - shipping_address
             *               - payment_method
             *               - items_price
             *               - total_price
             *               - user
             *
             *     responses:
             *       201:
             *         description: Order successfully created.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.post("/", orderController.store);

            /**
             * @swagger
             * /v1/{lang}/orders/user/{userId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: getOrdersByUser
             *     summary: Get orders by user id.
             *     description: Get orders by user id from the system.
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
             *        name: userId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the user to get
             *
             *     responses:
             *       200:
             *         description: The orders have successfully obtained.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/user/:userId", orderController.getOrdersByUser);

            /**
             * @swagger
             * /v1/{lang}/orders:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: show
             *     summary: Get all orders.
             *     description: Get all orders from the system..
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
             *         description: Orders have been successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/", orderController.getOrders);

            /**
             * @swagger
             * /v1/{lang}/orders/recent:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: showRecent
             *     summary: Get recent orders.
             *     description: Get recent orders from the system..
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
             *         description: Recent orders have been successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/recent", orderController.getRecentOrders);

            /**
             * @swagger
             * /v1/{lang}/orders/dashboard-amount:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: showDashboardAmount
             *     summary: Get dashboard amount.
             *     description: Get dashboard amount from the system..
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
             *         description: Dashboard amount have been successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/dashboard-amount", orderController.getDashboardAmount);

            /**
             * @swagger
             * /v1/{lang}/orders/dashboard-count:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: showDashboardCount
             *     summary: Get dashboard count.
             *     description: Get dashboard count from the system..
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
             *         description: Dashboard count have been successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/dashboard-count", orderController.getDashboardCount);

            /**
             * @swagger
             * /v1/{lang}/orders/best-seller/chart:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: showBestSellerChar
             *     summary: Get best seller char.
             *     description: Get best seller char from the system..
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
             *         description: Best seller char have been successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/best-seller/chart", orderController.getBestSellerProductChart);

            /**
             * @swagger
             * /v1/{lang}/orders/dashboard-recent-order:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: showDashboardRecent
             *     summary: Get dashboard recent orders.
             *     description: Get dashboard recent orders from the system..
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
             *         description: Dashboard recent orders have been successfully recovered.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/dashboard-recent-order", orderController.getOrders);

            router.get("/crons", orderController.getCronStatus.bind(orderController));
            router.post("/crons/:cronId/run", orderController.runCronNow.bind(orderController));
          })
        );

        router.use(
          "/order",
          routesGrouping.group((router) => {
            /**
             * @swagger
             * /v1/{lang}/order/{orderId}:
             *   get:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: getOrderById
             *     summary: Get an order by ID.
             *     description: Get an order by id from the system.
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
             *        name: orderId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the order to get
             *
             *     responses:
             *       200:
             *         description: The order has successfully obtained.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
            router.get("/:orderId", orderController.getOrderById);

            router.post(
              "/:orderId/resubmit-ld",
              orderController.resubmitToLd.bind(orderController)
            );

            /**
             * @swagger
             * /v1/{lang}/order/{orderId}:
             *   patch:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - Order
             *     operationId: patch
             *     summary: Patch an order by ID.
             *     description: Patch an order by ID.
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
             *        name: orderId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the order to get
             *
             *     requestBody:
             *       required: true
             *       description: We can find the documentation on the JSON
             *                    Patch format [here](https://jsonpatch.com/)
             *       content:
             *         application/json:
             *           schema:
             *             $ref: '#/components/schemas/PatchBody'
             *
             *     responses:
             *       200:
             *         description: The user has successfully logged in.
             *         content:
             *           application/json:
             *             schema:
             *                type: object
             *                properties:
             *                  status:
             *                    type: string
             *                    example: Ok
             *                  data:
             *                    $ref: '#/components/schemas/Order'
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
             *       412:
             *         description: Precondition Failed.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/412'
             *
             *       '500':
             *         description: Internal Server Error.
             *         content:
             *          application/json:
             *             schema:
             *              $ref: '#/responses/schemas/500'
             *
             */
            router.patch("/:orderId", orderController.patch);

            /**
             * //@swagger
             * /v1/{lang}/user/{userId}:
             *   delete:
             *     security:
             *      - bearerAuth: []
             *     tags:
             *     - User
             *     operationId: delete
             *     summary: Delete a user by ID.
             *     description: Delete a user by ID.
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
             *        name: userId
             *        schema:
             *          type: string
             *        required: true
             *        description: String ID of the user to delete
             *
             *     responses:
             *       204:
             *         description: The user deleted successfully.
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
            // router.delete("/:userId", userController.delete);
          })
        );
      })
    );
  }
}

const orderRoutes = new OrderRoutes();
export default orderRoutes;