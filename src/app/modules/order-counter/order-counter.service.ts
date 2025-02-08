import OrderCounter from "./order-counter.model";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-08-17
 *
 * Class OrderCounterService
 */
class OrderCounterService {
  /**
   * Get order counter details
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-05
   *
   * @param {string} seqName the sequence name
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public getSequenceNextValue(seqName: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const seqDoc: any = await OrderCounter.findOneAndUpdate(
            { _id: seqName },
            { $inc: { sequence_value: 1 } },
            { new: true }
          );

          resolve(seqDoc.sequence_value);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }

  /**
   * Init order counter
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-17
   *
   * @return {Promise<unknown>} the eventual completion or failure
   */
  public async init(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const orderCounter = new OrderCounter({
            _id: "orderId",
            sequence_value: 0,
          });

          const createdOrderCounter = await orderCounter.save();

          resolve(createdOrderCounter);
        } catch (error) {
          reject(error);
        }
      })();
    });
  }
}

const orderCounterService = new OrderCounterService();
export default orderCounterService;
