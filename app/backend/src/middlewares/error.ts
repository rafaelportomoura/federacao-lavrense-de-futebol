/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';
import CODE_MESSAGES from '../config/CodeMessages';
import { ICodeMessageFunction } from '../Interfaces/ICodeMessage';

export default (error: Error, __: Request, res: Response, _: NextFunction) => {
  let my_error: ApiError.ApiErrorMother;
  if (!(error instanceof ApiError.ApiErrorMother)) {
    const { UNHANDLED_ERROR } = CODE_MESSAGES;
    const code_message_function = UNHANDLED_ERROR as ICodeMessageFunction;
    my_error = new ApiError.BusinessError(code_message_function(error.message));
  } else {
    my_error = error;
  }

  res.status(my_error.status_code).json(my_error.code_message);
}