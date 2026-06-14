import orderSubscribe from "../modules/order/order.subscribe";
import { startLdTrackingCron } from "../modules/order/ld-tracking.cron";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-09-16
 *
 * Class Subscribes
 */
class Subscribes {

  /**
   * Creating app Subscribes starts
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-09-16
   *
   * @returns {void}
   */
  public appSubscribes(): void {
    // Includes all subscribes
    orderSubscribe.updateOrderPaymentStatus();
    startLdTrackingCron();
  }

  /**
   * Load subscribes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-08-27
   *
   * @returns {void}
   */
  public subscribesConfig(): void {
    this.appSubscribes();
  }
}

export default Subscribes;
