const HTTP_STATUS_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  OK: 200,
  CREATED: 201,
} as const;

export default HTTP_STATUS_CODES;