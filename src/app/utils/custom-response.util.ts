import { Response } from "express";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-27-03
 *
 * Class CustomResponse
 *
 */
class CustomResponse {
  /**
   * Success customize response
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-27-03
   *
   * @param {any} data the custom response
   * @param {Response} res the http response
   *
   * @return {void}
   */
  public success(data: { status: number; data: unknown }, res: Response): void {
    res.status(data.status).send({ status: "OK", data: data.data });
  }

  /**
   * Error customize response
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-27-03
   *
   * @param {any} data the custom response
   * @param {Response} res the http response
   *
   * @return {void}
   */
  public error(
    data: { status: number; errNo: number; errMsg: unknown },
    res: Response
  ): void {
    res.status(data.status).send({
      status: "FAILED",
      data: { errNo: data.errNo, errMsg: data.errMsg },
    });
  }

  /**
   * Format Error customize response
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-27-03
   *
   * @param any data
   * @param Response res
   *
   * @return Response of customize response
   */
  // public formatError(Throwable $e) {
  //     if($e instanceof QueryException)
  //     {
  //         return self::sendingError([
  //             'errNo'=>ApiErrorNumbers::$integrity_constraint_violation,
  //             'errMsg'=>$e->errorInfo[2],
  //             'statusCode'=>Response::HTTP_INTERNAL_SERVER_ERROR
  //         ]);
  //     }
  //     else {
  //         return self::sendingError([
  //             'errNo'=>ApiErrorNumbers::$generic_error,
  //             'errMsg'=>$e->getMessage(),
  //             'statusCode'=>Response::HTTP_INTERNAL_SERVER_ERROR
  //         ]);
  //     }
  // }
}

const customResponse = new CustomResponse();
export default customResponse;