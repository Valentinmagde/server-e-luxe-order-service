import ShippingPrice from "./shipping-price.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class ShippingPriceService
 */
class ShippingPriceService {
  /**
   * Get shipping price details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} shippingPriceId the shipping price id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingPriceById(shippingPriceId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingPrice = await ShippingPrice.findById(shippingPriceId);

          resolve(shippingPrice);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get shipping price by departure and arrival state
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-22
   *
   * @param {string} departure the shipping price departure
   * @param {string} arrival the shipping price arrival
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingPriceByDepartureArrival(
    departure: string,
    arrival: string
  ): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingPrice = await ShippingPrice.findOne({
            departure: departure,
            arrival: arrival
          });

          resolve(shippingPrice);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all shipping prices
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingPrices(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingPrices = await ShippingPrice.find();

          resolve(shippingPrices);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new shipping price
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {any} data the shipping zone data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          console.log(data);
          const shippingPrice = new ShippingPrice(data);

          const createdShippingPrice = await shippingPrice.save();

          resolve(createdShippingPrice);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a shipping price
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} shippingPriceId the shipping price id
   * @param {any} data the shipping price data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(shippingPriceId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingPrice = await ShippingPrice.findById(shippingPriceId);

          if (shippingPrice) {
            shippingPrice.departure = data.departure || shippingPrice.departure;
            shippingPrice.arrival = data.arrival || shippingPrice.arrival;
            shippingPrice.price = data.price || shippingPrice.price;
            shippingPrice.tax = data.tax || shippingPrice.tax;

            const updatedShippingPrice = await shippingPrice.save();

            resolve(updatedShippingPrice);
          } else {
            resolve(shippingPrice);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a shipping price by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} shippingPriceId the shipping price id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(shippingPriceId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingPrice = await ShippingPrice.findById(shippingPriceId);

          if (shippingPrice) {
            const deletedShippingPrice = await shippingPrice.deleteOne();

            resolve(deletedShippingPrice);
          } else {
            resolve(shippingPrice);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const shippingPriceService = new ShippingPriceService();
export default shippingPriceService;