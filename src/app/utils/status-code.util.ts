/**
 * @author Valentin Magde <valentinmagde@gmail.com>
 * @since 2023-27-03
 *
 * Class StatusCode
 *
 * @para number _httpContinue
 * @para number _httpSwitchingProtocols
 * @para number _httpProcessing
 * @para number _httpOk
 * @para number _httpCreated
 * @para number _httpAccepted
 * @para number _http_nonAuthoritativeInformation
 * @para number _httpNoContent
 * @para number _httpResetContent
 * @para number _httpPartialContent
 * @para number _httpMultiStatus
 * @para number _httpAlreadyReported
 * @para number _httpImUsed
 * @para number _httpMultipleChoices
 * @para number _httpMovedPermanently
 * @para number _httpFound
 * @para number _httpSeeOther
 * @para number _httpNotModified
 * @para number _httpReserved
 * @para number _httpTemporaryRedirect
 * @para number _httpPermanentlyRedirect
 * @para number _httpBadRequest
 * @para number _httpUnauthorized
 * @para number _httpPaymentRequired
 * @para number _httpForbidden
 * @para number _httpNotFound
 * @para number _httpMethodNotAllowed
 * @para number _httpNotAcceptable
 * @para number _httpProxyAuthenticationRequired
 * @para number _httpRequestTimeout
 * @para number _httpConflict
 * @para number _httpGone
 * @para number _httpLengthRequired
 * @para number _httpPreconditionFailed
 * @para number _httpRequestEntityTooLarge
 * @para number _httpRequestUriTooLong
 * @para number _httpUnsupportedMediaType
 * @para number _httpRequestedRangeNotSatisfiable
 * @para number _httpExpectationFailed
 * @para number _httpIAmATeapot
 * @para number _httpMisdirectedRequest
 * @para number _httpUnprocessableEntity
 * @para number _httpLocked
 * @para number _httpFailedDependency
 * @para number _httpReservedForWebdavAdvancedCollectionsExpiredProposal
 * @para number _httpUpgradeRequired
 * @para number _httpUpgradeRequired
 * @para number _httpPreconditionRequired
 * @para number _httpTooManyRequests
 * @para number _httpRequestHeaderFieldsTooLarge
 * @para number _httpUnavailableForLegalReasons
 * @para number _httpInternalServerError
 * @para number _httpNotImplemented
 * @para number _httpBadGateway
 * @para number _httpServiceUnavailable
 * @para number _httpGatewayTimeout
 * @para number _httpVersionNotSupported
 * @para number _httpVariantAlsoNegotiatesExperimental
 * @para number _httpInsufficientStorage
 * @para number _httpLoopDetected
 * @para number _httpNotExtended
 * @para number _httpNetworkAuthenticationRequired
 */
class StatusCode {
  private _httpContinue: number;
  private _httpSwitchingProtocols: number;
  private _httpProcessing: number;
  private _httpOk: number;
  private _httpCreated: number;
  private _httpAccepted: number;
  private _httpNonAuthoritativeInformation: number;
  private _httpNoContent: number;
  private _httpResetContent: number;
  private _httpPartialContent: number;
  private _httpMultiStatus: number;
  private _httpAlreadyReported: number;
  private _httpImUsed: number;
  private _httpMultipleChoices: number;
  private _httpMovedPermanently: number;
  private _httpFound: number;
  private _httpSeeOther: number;
  private _httpNotModified: number;
  private _httpUseProxy: number;
  private _httpReserved: number;
  private _httpTemporaryRedirect: number;
  private _httpPermanentlyRedirect: number;
  private _httpBadRequest: number;
  private _httpUnauthorized: number;
  private _httpPaymentRequired: number;
  private _httpForbidden: number;
  private _httpNotFound: number;
  private _httpMethodNotAllowed: number;
  private _httpNotAcceptable: number;
  private _httpProxyAuthenticationRequired: number;
  private _httpRequestTimeout: number;
  private _httpConflict: number;
  private _httpGone: number;
  private _httpLengthRequired: number;
  private _httpPreconditionFailed: number;
  private _httpRequestEntityTooLarge: number;
  private _httpRequestUriTooLong: number;
  private _httpUnsupportedMediaType: number;
  private _httpRequestedRangeNotSatisfiable: number;
  private _httpExpectationFailed: number;
  private _httpIAmATeapot: number;
  private _httpMisdirectedRequest: number;
  private _httpUnprocessableEntity: number;
  private _httpLocked: number;
  private _httpFailedDependency: number;
  private _httpReservedForWebdavAdvancedCollectionsExpiredProposal: number;
  private _httpUpgradeRequired: number;
  private _httpPreconditionRequired: number;
  private _httpTooManyRequests: number;
  private _httpRequestHeaderFieldsTooLarge: number;
  private _httpUnavailableForLegalReasons: number;
  private _httpInternalServerError: number;
  private _httpNotImplemented: number;
  private _httpBadGateway: number;
  private _httpServiceUnavailable: number;
  private _httpGatewayTimeout: number;
  private _httpVersionNotSupported: number;
  private _httpVariantAlsoNegotiatesExperimental: number;
  private _httpInsufficientStorage: number;
  private _httpLoopDetected: number;
  private _httpNotExtended: number;
  private _httpNetworkAuthenticationRequired: number;

  /**
   * Create a new ErrorNumbers instance.
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-03-27
   */
  constructor() {
    this._httpContinue = 100;
    this._httpSwitchingProtocols = 101;
    this._httpProcessing = 102;
    this._httpOk = 200;
    this._httpCreated = 201;
    this._httpAccepted = 202;
    this._httpNonAuthoritativeInformation = 203;
    this._httpNoContent = 204;
    this._httpResetContent = 205;
    this._httpPartialContent = 206;
    this._httpMultiStatus = 207;
    this._httpAlreadyReported = 208;
    this._httpImUsed = 226;
    this._httpMultipleChoices = 300;
    this._httpMovedPermanently = 301;
    this._httpFound = 302;
    this._httpSeeOther = 303;
    this._httpNotModified = 304;
    this._httpUseProxy = 305;
    this._httpReserved = 306;
    this._httpTemporaryRedirect = 307;
    this._httpPermanentlyRedirect = 308;
    this._httpBadRequest = 400;
    this._httpUnauthorized = 401;
    this._httpPaymentRequired = 402;
    this._httpForbidden = 403;
    this._httpNotFound = 404;
    this._httpMethodNotAllowed = 405;
    this._httpNotAcceptable = 406;
    this._httpProxyAuthenticationRequired = 407;
    this._httpRequestTimeout = 408;
    this._httpConflict = 409;
    this._httpGone = 410;
    this._httpLengthRequired = 411;
    this._httpPreconditionFailed = 412;
    this._httpRequestEntityTooLarge = 413;
    this._httpRequestUriTooLong = 414;
    this._httpUnsupportedMediaType = 415;
    this._httpRequestedRangeNotSatisfiable = 416;
    this._httpExpectationFailed = 417;
    this._httpIAmATeapot = 418;
    this._httpMisdirectedRequest = 421;
    this._httpUnprocessableEntity = 422;
    this._httpLocked = 423;
    this._httpFailedDependency = 424;
    this._httpReservedForWebdavAdvancedCollectionsExpiredProposal = 425;
    this._httpUpgradeRequired = 426;
    this._httpPreconditionRequired = 428;
    this._httpTooManyRequests = 429;
    this._httpRequestHeaderFieldsTooLarge = 431;
    this._httpUnavailableForLegalReasons = 451;
    this._httpInternalServerError = 500;
    this._httpNotImplemented = 501;
    this._httpBadGateway = 502;
    this._httpServiceUnavailable = 503;
    this._httpGatewayTimeout = 504;
    this._httpVersionNotSupported = 505;
    this._httpVariantAlsoNegotiatesExperimental = 506;
    this._httpInsufficientStorage = 507;
    this._httpLoopDetected = 508;
    this._httpNotExtended = 510;
    this._httpNetworkAuthenticationRequired = 511;
  }

  /**
   * HTTP_CONTINUE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_CONTINUE
   */
  public get httpContinue(): number {
    return this._httpContinue;
  }

  /**
   * HTTP_SWITCHING_PROTOCOLS
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_SWITCHING_PROTOCOLS
   */
  public get httpSwitchingProtocols(): number {
    return this._httpSwitchingProtocols;
  }

  /**
   * HTTP_PROCESSING
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PROCESSING
   */
  public get httpProcessing(): number {
    return this._httpProcessing;
  }

  /**
   * HTTP_OK
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_OK
   */
  public get httpOk(): number {
    return this._httpOk;
  }

  /**
   * HTTP_CREATED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_CREATED
   */
  public get httpCreated(): number {
    return this._httpCreated;
  }

  /**
   * HTTP Accepted
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the http accepted
   */
  public get httpAccepted(): number {
    return this._httpAccepted;
  }

  /**
   * HTTP_NON_AUTHORITATIVE_INFORMATION
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NON_AUTHORITATIVE_INFORMATION
   */
  public get httpNonAuthoritativeInformation(): number {
    return this._httpNonAuthoritativeInformation;
  }

  /**
   * HTTP_NO_CONTENT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NO_CONTENT
   */
  public get httpNoContent(): number {
    return this._httpNoContent;
  }

  /**
   * HTTP_RESET_CONTENT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_RESET_CONTENT
   */
  public get httpResetContent(): number {
    return this._httpResetContent;
  }

  /**
   * HTTP_PARTIAL_CONTENT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PARTIAL_CONTENT
   */
  public get httpPartialContent(): number {
    return this._httpPartialContent;
  }

  /**
   * HTTP_MULTI_STATUS
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_MULTI_STATUS
   */
  public get httpMultiStatus(): number {
    return this._httpMultiStatus;
  }

  /**
   * HTTP_ALREADY_REPORTED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_ALREADY_REPORTED
   */
  public get httpAlreadyReported(): number {
    return this._httpAlreadyReported;
  }

  /**
   * HTTP_IM_USED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_IM_USED
   */
  public get httpImUsed(): number {
    return this._httpImUsed;
  }

  /**
   * HTTP_MULTIPLE_CHOICES
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_MULTIPLE_CHOICES
   */
  public get httpMultipleChoices(): number {
    return this._httpMultipleChoices;
  }

  /**
   * HTTP_MOVED_PERMANENTLY
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_MOVED_PERMANENTLY
   */
  public get httpMovedPermanently(): number {
    return this._httpMovedPermanently;
  }

  /**
   * HTTP_FOUND
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_FOUND
   */
  public get httpFound(): number {
    return this._httpFound;
  }

  /**
   * HTTP_SEE_OTHER
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_SEE_OTHER
   */
  public get httpSeeOther(): number {
    return this._httpSeeOther;
  }

  /**
   * HTTP_NOT_MODIFIED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NOT_MODIFIED
   */
  public get httpNotModified(): number {
    return this._httpNotModified;
  }

  /**
   * HTTP_USE_PROXY
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_USE_PROXY
   */
  public get httpUseProxy(): number {
    return this._httpUseProxy;
  }

  /**
   * HTTP_RESERVED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_RESERVED
   */
  public get httpReserved(): number {
    return this._httpReserved;
  }

  /**
   *HTTP_TEMPORARY_REDIRECT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_TEMPORARY_REDIRECT
   */
  public get httpTemporaryRedirect(): number {
    return this._httpTemporaryRedirect;
  }

  /**
   * HTTP_PERMANENTLY_REDIREC
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PERMANENTLY_REDIREC
   */
  public get httpPermanentlyRedirect(): number {
    return this._httpPermanentlyRedirect;
  }

  /**
   * HTTP_BAD_REQUEST
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_BAD_REQUEST
   */
  public get httpBadRequest(): number {
    return this._httpBadRequest;
  }

  /**
   * HTTP_UNAUTHORIZED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_UNAUTHORIZED
   */
  public get httpUnauthorized(): number {
    return this._httpUnauthorized;
  }

  /**
   * HTTP_PAYMENT_REQUIRED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PAYMENT_REQUIRED
   */
  public get httpPaymentRequired(): number {
    return this._httpPaymentRequired;
  }

  /**
   * HTTP_FORBIDDEN
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_FORBIDDEN
   */
  public get httpForbidden(): number {
    return this._httpForbidden;
  }

  /**
   * HTTP_NOT_FOUND
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NOT_FOUND
   */
  public get httpNotFound(): number {
    return this._httpNotFound;
  }

  /**
   * HTTP_METHOD_NOT_ALLOWED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_METHOD_NOT_ALLOWED
   */
  public get httpMethodNotAllowed(): number {
    return this._httpMethodNotAllowed;
  }

  /**
   * HTTP_NOT_ACCEPTABLE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NOT_ACCEPTABLE
   */
  public get httpNotAcceptable(): number {
    return this._httpNotAcceptable;
  }

  /**
   * HTTP_PROXY_AUTHENTICATION_REQUIRED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PROXY_AUTHENTICATION_REQUIRED
   */
  public get httpProxyAuthenticationRequired(): number {
    return this._httpProxyAuthenticationRequired;
  }

  /**
   * HTTP_REQUEST_TIMEOUT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_REQUEST_TIMEOUT
   */
  public get httpRequestTimeout(): number {
    return this._httpRequestTimeout;
  }

  /**
   * HTTP_CONFLICT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_CONFLICT
   */
  public get httpConflict(): number {
    return this._httpConflict;
  }

  /**
   * HTTP_GONE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_GONE
   */
  public get httpGone(): number {
    return this._httpGone;
  }

  /**
   * HTTP_LENGTH_REQUIRED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_LENGTH_REQUIRED
   */
  public get httpLengthRequired(): number {
    return this._httpLengthRequired;
  }

  /**
   * HTTP_PRECONDITION_FAILED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PRECONDITION_FAILED
   */
  public get httpPreconditionFailed(): number {
    return this._httpPreconditionFailed;
  }

  /**
   * HTTP_REQUEST_ENTITY_TOO_LARGE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_REQUEST_ENTITY_TOO_LARGE
   */
  public get httpRequestEntityTooLarge(): number {
    return this._httpRequestEntityTooLarge;
  }

  /**
   * HTTP_REQUEST_URI_TOO_LONG
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_REQUEST_URI_TOO_LONG
   */
  public get httpRequestUriTooLong(): number {
    return this._httpRequestUriTooLong;
  }

  /**
   * HTTP_UNSUPPORTED_MEDIA_TYPE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_UNSUPPORTED_MEDIA_TYPE
   */
  public get httpUnsupportedMediaType(): number {
    return this._httpUnsupportedMediaType;
  }

  /**
   * HTTP_REQUESTED_RANGE_NOT_SATISFIABLE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_REQUESTED_RANGE_NOT_SATISFIABLE
   */
  public get httpRequestedRangeNotSatisfiable(): number {
    return this._httpRequestedRangeNotSatisfiable;
  }

  /**
   * HTTP_EXPECTATION_FAILED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_EXPECTATION_FAILED
   */
  public get httpExpectationFailed(): number {
    return this._httpExpectationFailed;
  }

  /**
   * HTTP_I_AM_A_TEAPOT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_I_AM_A_TEAPOT
   */
  public get httpIAmATeapot(): number {
    return this._httpIAmATeapot;
  }

  /**
   * HTTP_MISDIRECTED_REQUEST
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_MISDIRECTED_REQUEST
   */
  public get httpMisdirectedRequest(): number {
    return this._httpMisdirectedRequest;
  }

  /**
   * HTTP_UNPROCESSABLE_ENTITY
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_UNPROCESSABLE_ENTITY
   */
  public get httpUnprocessableEntity(): number {
    return this._httpUnprocessableEntity;
  }

  /**
   * HTTP_LOCKED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_LOCKED
   */
  public get httpLocked(): number {
    return this._httpLocked;
  }

  /**
   * HTTP_FAILED_DEPENDENCY
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_FAILED_DEPENDENCY
   */
  public get httpFailedDependency(): number {
    return this._httpFailedDependency;
  }

  /**
   * HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the
   * HTTP_RESERVED_FOR_WEBDAV_ADVANCED_COLLECTIONS_EXPIRED_PROPOSAL
   */
  public get httpReservedForWebdavAdvancedCollectionsExpiredProposal():number {
    return this._httpReservedForWebdavAdvancedCollectionsExpiredProposal;
  }

  /**
   * HTTP_UPGRADE_REQUIRED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_UPGRADE_REQUIREDSAL
   */
  public get httpUpgradeRequired(): number {
    return this._httpUpgradeRequired;
  }

  /**
   * HTTP_PRECONDITION_REQUIRE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_PRECONDITION_REQUIRE
   */
  public get httpPreconditionRequired(): number {
    return this._httpPreconditionRequired;
  }

  /**
   * HTTP_TOO_MANY_REQUESTS
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_TOO_MANY_REQUESTS
   */
  public get httpTooManyRequests(): number {
    return this._httpTooManyRequests;
  }

  /**
   * HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_REQUEST_HEADER_FIELDS_TOO_LARGE
   */
  public get httpRequestHeaderFieldsTooLarge(): number {
    return this._httpRequestHeaderFieldsTooLarge;
  }

  /**
   * HTTP_UNAVAILABLE_FOR_LEGAL_REASONS
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_UNAVAILABLE_FOR_LEGAL_REASONS
   */
  public get httpUnavailableForLegalReasons(): number {
    return this._httpUnavailableForLegalReasons;
  }

  /**
   * HTTP_INTERNAL_SERVER_ERROR
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_INTERNAL_SERVER_ERROR
   */
  public get httpInternalServerError(): number {
    return this._httpInternalServerError;
  }

  /**
   * HTTP_NOT_IMPLEMENTED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NOT_IMPLEMENTED
   */
  public get httpNotImplemented(): number {
    return this._httpNotImplemented;
  }

  /**
   * HTTP_BAD_GATEWAY
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_BAD_GATEWAY
   */
  public get httpBadGateway(): number {
    return this._httpBadGateway;
  }

  /**
   * HTTP_SERVICE_UNAVAILABLE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_SERVICE_UNAVAILABLE
   */
  public get httpServiceUnavailable(): number {
    return this._httpServiceUnavailable;
  }

  /**
   * HTTP_GATEWAY_TIMEOUT
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_GATEWAY_TIMEOUT
   */
  public get httpGatewayTimeout(): number {
    return this._httpGatewayTimeout;
  }

  /**
   * HTTP_VERSION_NOT_SUPPORTED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_VERSION_NOT_SUPPORTED
   */
  public get httpVersionNotSupported(): number {
    return this._httpVersionNotSupported;
  }

  /**
   * HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_VARIANT_ALSO_NEGOTIATES_EXPERIMENTAL
   */
  public get httpVariantAlsoNegotiatesExperimental(): number {
    return this._httpVariantAlsoNegotiatesExperimental;
  }

  /**
   * HTTP_INSUFFICIENT_STORAGE
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_INSUFFICIENT_STORAGE
   */
  public get httpInsufficientStorage(): number {
    return this._httpInsufficientStorage;
  }

  /**
   * HTTP_LOOP_DETECTED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_LOOP_DETECTED
   */
  public get httpLoopDetected(): number {
    return this._httpLoopDetected;
  }

  /**
   * HTTP_NOT_EXTENDED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NOT_EXTENDED
   */
  public get httpNotExtended(): number {
    return this._httpNotExtended;
  }

  /**
   * HTTP_NETWORK_AUTHENTICATION_REQUIRED
   *
   * @author Valentin Magde <valentinmagde@gmail.com>
   * @since 2023-06-03
   *
   * @return {number} the HTTP_NETWORK_AUTHENTICATION_REQUIRED
   */
  public get httpNetworkAuthenticationRequired(): number {
    return this._httpNetworkAuthenticationRequired;
  }
}

const statusCode = new StatusCode();
export default statusCode;