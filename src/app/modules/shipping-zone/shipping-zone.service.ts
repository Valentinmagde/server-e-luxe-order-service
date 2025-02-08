import ShippingZone from "./shipping-zone.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-12
 *
 * Class ShippingZoneService
 */
class ShippingZoneService {
  /**
   * Get shipping zone details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} shippingZoneId the shipping zone id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingZoneById(shippingZoneId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingZone = await ShippingZone.findById(
            shippingZoneId
          ).populate("paymentMethods");

          resolve(shippingZone);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all shipping zones
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingZones(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingZones = await ShippingZone.find();

          resolve(shippingZones);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new shipping zone
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
          const shippingZone = new ShippingZone(data);

          const createdShippingZone = await shippingZone.save();

          resolve(createdShippingZone);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a shipping zone
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} shippingZoneId the shipping zone id
   * @param {any} data the shipping zone data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(shippingZoneId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingZone = await ShippingZone.findById(shippingZoneId);

          if (shippingZone) {
            shippingZone.name = data.name || shippingZone.name;
            shippingZone.shippingMethods = [
              ...shippingZone.shippingMethods,
              data.paymentMethods,
            ];
            shippingZone.countries = [
              ...shippingZone.countries,
              data.countries,
            ];

            const updatedShippingZone = await shippingZone.save();

            resolve(updatedShippingZone);
          } else {
            resolve(shippingZone);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a shipping zone by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-12
   *
   * @param {string} shippingZoneId the shipping zone id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(shippingZoneId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingZone = await ShippingZone.findById(shippingZoneId);

          if (shippingZone) {
            const deletedShippingZone = await shippingZone.deleteOne();

            resolve(deletedShippingZone);
          } else {
            resolve(shippingZone);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const shippingZoneService = new ShippingZoneService();
export default shippingZoneService;