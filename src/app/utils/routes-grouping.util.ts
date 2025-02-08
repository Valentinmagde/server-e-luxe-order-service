import express, { Router } from "express";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-26-03
 *
 * Class RoutesGrouping
 */
class RoutesGrouping {
  /**
   * Grouping routes
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-26
   *
   * @param {Router} callback the callback function
   * @return {Router} of grouping routes
   */
  public group = (callback: (router: Router) => void): Router => {
    const router = express.Router({ mergeParams: true });
    callback(router);
    return router;
  };
}

const routesGrouping = new RoutesGrouping();
export default routesGrouping;