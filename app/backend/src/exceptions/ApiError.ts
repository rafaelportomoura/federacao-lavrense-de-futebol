/* eslint-disable max-classes-per-file */
import { ICodeMessage } from '../Interfaces/ICodeMessage';
import HTTP_STATUS_CODE from '../config/httpStatusCode';

namespace ApiError {
  export class ApiErrorMother extends Error {
    public code: string;

    public code_message: ICodeMessage;

    public status_code: number;

    constructor(type: string, code_message: ICodeMessage, status_code: number) {
      super(`${type}: ${code_message.message}`);
      this.code_message = code_message;
      this.code = code_message.code;
      this.status_code = status_code;
    }
  }

  export class BusinessError extends ApiErrorMother {
    constructor(code_message: ICodeMessage) {
      super('BusinessError', code_message, HTTP_STATUS_CODE.BAD_REQUEST);
    }
  }

  export class UnauthorizedError extends ApiErrorMother {
    constructor(code_message: ICodeMessage) {
      super('UnauthorizedError', code_message, HTTP_STATUS_CODE.UNAUTHORIZED);
    }
  }

  export class NotFoundError extends ApiErrorMother {
    constructor(code_message: ICodeMessage) {
      super('NotFoundError', code_message, HTTP_STATUS_CODE.NOT_FOUND);
    }
  }
}

export default ApiError;