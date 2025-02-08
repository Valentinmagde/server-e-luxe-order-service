import { slugify } from "../../utils/helpers.util";
import ShippingZone from "../shipping-zone/shipping-zone.model";
import ShippingMethod from "./shipping-method.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-13
 *
 * Class ShippingMethodService
 */
class ShippingMethodService {
  /**
   * Get shipping method details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} shippingMethodId the shipping method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingMethodById(shippingMethodId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingMethod = await ShippingMethod.findById(
            shippingMethodId
          );

          resolve(shippingMethod);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get shipping methods by country
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-19
   *
   * @param {string} countryId the country id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingMethodsByCountry(countryId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingZone: any = await ShippingZone.findOne({
            countries: countryId,
          }).populate("shippingMethods");

          if (shippingZone) resolve(shippingZone.shippingMethods);
          else resolve([]);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Get all shipping methods
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getShippingMethods(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingMethods = await ShippingMethod.find();

          resolve(shippingMethods);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Create a new shipping method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {any} data the shipping method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async store(data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          data.slug = data.slug || slugify(data.name);

          const shippingMethod = new ShippingMethod(data);

          const createdShippingMethod = await shippingMethod.save();

          resolve(createdShippingMethod);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Update a shipping method
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} shippingMethodId the shipping method id
   * @param {any} data the shipping method data
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async update(shippingMethodId: string, data: any): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingMethod = await ShippingMethod.findById(
            shippingMethodId
          );

          if (shippingMethod) {
            shippingMethod.name = data.name || shippingMethod.name;
            shippingMethod.slug =
              data.slug || shippingMethod.slug || slugify(data.name);
            shippingMethod.description =
              data.description || shippingMethod.description;

            const updatedShippingMethod = await shippingMethod.save();

            resolve(updatedShippingMethod);
          } else {
            resolve(shippingMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Delete a shipping method by id
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-13
   *
   * @param {string} shippingMethodId the shipping method id
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public delete(shippingMethodId: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const shippingMethod = await ShippingMethod.findById(
            shippingMethodId
          );

          if (shippingMethod) {
            const deletedShippingMethod = await shippingMethod.deleteOne();

            resolve(deletedShippingMethod);
          } else {
            resolve(shippingMethod);
          }
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const shippingMethodService = new ShippingMethodService();
export default shippingMethodService;
