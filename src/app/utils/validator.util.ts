import Validatorjs, { ErrorMessages, Rules } from "validatorjs";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-29-03
 *
 * Class Validator
 *
 */
class Validator {
  /**
   * Initialize the validatorjs
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-29-03
   *
   * @param {any} body data to validate
   * @param {Rules} rules the error rules
   * @param {ErrorMessages} customMessages the custom error message
   * @param {any} callback the callback
   *
   * @return {Promise<void>} the eventual completion or failure
   */
  public async validator(
    body: any,
    rules: Rules,
    customMessages: ErrorMessages,
    callback: any
  ): Promise<void> {
    const validation = new Validatorjs(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
  }
}

const validator = new Validator();
export default validator;