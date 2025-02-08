/* eslint-disable class-methods-use-this */
import bcrypt from "bcryptjs";

/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-22-03
 *
 * Class PasswordHash
 */
class PasswordHash {
  /**
   * Create hash
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @param {string} password the user password
   * @returns {string} of crypt password
   */
  public createHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  /**
   * Compare hash
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-22
   *
   * @param {string} password the user password
   * @param {string} hash hashed user password
   * @returns {boolean} true | false
   */
  public compareHash(password: string, hash: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}

const passwordHash = new PasswordHash();
export default passwordHash;