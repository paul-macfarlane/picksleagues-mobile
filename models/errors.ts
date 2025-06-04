export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const SERVER_ERROR = 500;

export class APIError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export class APIInvalidDataError extends APIError {
  constructor(message: string) {
    super(BAD_REQUEST, message);
  }
}

export class APIUnauthorizedError extends APIError {
  constructor(message: string) {
    super(UNAUTHORIZED, message);
  }
}

export class APIForbiddenError extends APIError {
  constructor(message: string) {
    super(FORBIDDEN, message);
  }
}

export class APINotFoundError extends APIError {
  constructor(message: string) {
    super(NOT_FOUND, message);
  }
}

export class APIConflictError extends APIError {
  constructor(message: string) {
    super(CONFLICT, message);
  }
}

export class APIServerError extends APIError {
  constructor(message: string) {
    super(SERVER_ERROR, message);
  }
}

export function APIErrorFromResponse(response: Response): APIError {
  const status = response.status;
  const message = response.statusText;
  switch (status) {
    case BAD_REQUEST:
      return new APIInvalidDataError(message);
    case UNAUTHORIZED:
      return new APIUnauthorizedError(message);
    case FORBIDDEN:
      return new APIForbiddenError(message);
    case NOT_FOUND:
      return new APINotFoundError(message);
    case CONFLICT:
      return new APIConflictError(message);
    case SERVER_ERROR:
      return new APIServerError(message);
    default:
      return new APIError(status, message);
  }
}
