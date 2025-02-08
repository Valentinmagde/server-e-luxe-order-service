/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-27-03
 *
 * Class ErrorNumbers
 *
 * @para number _validator
 * @para number _badLoginCredentials
 * @para number _invalidToken
 * @para number _expiredToken
 * @para number _blacklistedToken
 * @para number _tokenNotFound
 * @para number _resourceExist
 * @para number _resourceNotFound
 * @para number _invalidResource
 * @para number _requiredPermission
 * @para number _notAllowedMethod
 * @para number _crUnknownError
 * @para number _crConnectionError
 * @para number _crConnHostError
 * @para number _crUnknownHost
 * @para number _crServerGoneError
 * @para number _crOutOfMemory
 * @para number _crServerLost
 * @para number _integrityConstraintViolation
 * @para number _genericError
 */
class ErrorNumbers {
  private _validator: number;
  private _badLoginCredentials: number;
  private _invalidToken: number;
  private _expiredToken: number;
  private _blacklistedToken: number;
  private _tokenNotFound: number;
  private _requiredPermission: number;
  private _resourceExist: number;
  private _resourceNotFound: number;
  private _invalidResource: number;
  private _notAllowedMethod: number;
  private _crUnknownError: number;
  private _crConnectionError: number;
  private _crConnHostError: number;
  private _crUnknownHost: number;
  private _crServerGoneError: number;
  private _crOutOfMemory: number;
  private _crServerLost: number;
  private _integrityConstraintViolation: number;
  private _genericError: number;

  /**
   * Create a new ErrorNumbers instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-27
   */
  constructor() {
    this._validator = 6;
    this._badLoginCredentials = 7;
    this._invalidToken = 11;
    this._expiredToken = 12;
    this._blacklistedToken = 13;
    this._tokenNotFound = 14;
    this._requiredPermission = 15;
    this._resourceExist = 25;
    this._resourceNotFound = 26;
    this._invalidResource = 27;
    this._notAllowedMethod = 31;
    this._crUnknownError = 251;
    this._crConnectionError = 252;
    this._crConnHostError = 253;
    this._crUnknownHost = 254;
    this._crServerGoneError = 255;
    this._crOutOfMemory = 256;
    this._crServerLost = 257;
    this._integrityConstraintViolation = 258;
    this._genericError = 259;
  }

  /**
   * Get required permission error number.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @return {number} the required permission error number
   */
  public get requiredPermission(): number {
    return this._requiredPermission;
  }

  /**
   * Get resource exist error number.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-21
   *
   * @return {number} the resource exist error number
   */
  public get resourceExist(): number {
    return this._resourceExist;
  }

  /**
   * Get invalid resource error number.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-04-10
   *
   * @return {number} the invalid resource error numbe
   */
  public get ivalidResource(): number {
    return this._invalidResource;
  }

    /**
     * Get validator error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the error number of validator
     */
    public get validator(): number {
        return this._validator;
    }

    /**
     * Get bad login credentials error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the bad login credentials error number
     */
    public get badLoginCredentials(): number {
        return this._badLoginCredentials;
    }

    /**
     * Get invalid token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the invalid token error number
     */
    public get invalidToken(): number {
        return this._invalidToken;
    }

    /**
     * Get expired token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the expired token error number
     */
    public get expiredToken(): number {
        return this._expiredToken;
    }

    /**
     * Get blacklisted token error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the blacklisted token error number
     */
    public get blacklistedToken(): number {
        return this._blacklistedToken;
    }

    /**
     * Get token not found error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the token not found error number
     */
    public get tokenNotFound(): number {
        return this._tokenNotFound;
    }

    /**
     * Get resource not found error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the resource not found error number
     */
    public get resourceNotFound(): number {
        return this._resourceNotFound;
    }

    /**
     * Get not allowed method error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the not allowed method error number
     */
    public get notAllowedMethod(): number {
        return this._notAllowedMethod;
    }

    /**
     * Get cr unknown error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr unknown error error number
     */
    public get crUnknownError(): number {
        return this._crUnknownError;
    }

    /**
     * Get cr connection error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr connection error error number
     */
    public get crConnectionError(): number {
        return this._crConnectionError;
    }

    /**
     * Get cr conn host error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr conn host error error number
     */
    public get crConnHostError(): number {
        return this._crConnHostError;
    }

    /**
     * Get cr unknown host error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr unknown host error number
     */
    public get crUnknownHost(): number {
        return this._crUnknownHost;
    }

    /**
     * Get cr server gone error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr server gone error number.
     */
    public get crServerGoneError(): number {
        return this._crServerGoneError;
    }

    /**
     * Get cr out of memory error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr out of memory error number
     */
    public get crOutOfMemory(): number {
        return this._crOutOfMemory;
    }

    /**
     * Get cr server lost error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the cr server lost error number
     */
    public get crServerLost(): number {
        return this._crServerLost;
    }

    /**
     * Get integrity constraint violation error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the integrity constraint violation error number
     */
    public get integrityConstraintViolation(): number {
        return this._integrityConstraintViolation;
    }

    /**
     * Get generic error error number.
     *
     * @author Valentin Magde <valentinmagde@gmail.com>
     * @since 2023-03-27
     *
     * @return {number} the generic error error number.
     */
    public get genericError(): number {
        return this._genericError;
    }
}

const errorNumbers = new ErrorNumbers();
export default errorNumbers;