/// <reference types="mocha" />
import { expect } from 'chai';

import { Request, Response, NextFunction } from 'express';
import Exceptions from '../src/exceptions/ApiError';
import error_middleware from '../src/middlewares/error';
import { ICodeMessage } from '../src/Interfaces/ICodeMessage';
import { CODE_MESSAGES } from '../src/config/CodeMessages';

const res = (s: number, c: ICodeMessage) => ({
  status: (x: number) => ({
    json: (code_message: ICodeMessage) => {
      expect(x).to.equal(s)
      expect(code_message.code).to.equal(c.code);
      expect(code_message.message).to.equal(c.message);
    },
  }),
}) as unknown as Response;

const request_null = null as unknown as Request;
const next_function_null = null as unknown as NextFunction;

describe('Middleware - Errors', () => {

  it('SUCCESS: Internal Server Error', () => {
    const error = new Error('x');

    error_middleware(error, request_null, res(500, CODE_MESSAGES.INTERNAL_SERVER_ERROR), next_function_null);
  })

  it('SUCCESS: Business Error', () => {
    const code_message = { code: '1', message: 'x' };
    const error = new Exceptions.BusinessError(code_message);

    error_middleware(error, request_null, res(400, code_message), next_function_null);
  })

  it('SUCCESS: Not Found error', () => {
    const code_message = { code: '1', message: 'x' };
    const error = new Exceptions.NotFoundError(code_message);

    error_middleware(error, request_null, res(404, code_message), next_function_null);
  })

  it('SUCCESS: Unauthorized error', () => {
    const code_message = { code: '1', message: 'x' };
    const error = new Exceptions.UnauthorizedError(code_message);

    error_middleware(error, request_null, res(401, code_message), next_function_null);
  })
})