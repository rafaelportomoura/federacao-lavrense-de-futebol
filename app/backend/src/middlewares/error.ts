/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import ApiError from '../exceptions/ApiError';
import CODE_MESSAGES_FUNCTION from '../config/CodeMessagesFunction';
import Logger from '../Libs/Logger';

export default (error: Error, __: Request, res: Response, _: NextFunction) => {
  let my_error: ApiError.ApiErrorMother;
  if (!(error instanceof ApiError.ApiErrorMother)) {
    const { UNHANDLED_ERROR } = CODE_MESSAGES_FUNCTION;
    const unhandled = UNHANDLED_ERROR(error.message);
    Logger.error(JSON.stringify(unhandled))

    my_error = new ApiError.InternalServerError();
  } else {
    my_error = error;
  }

  res.status(my_error.status_code).json(my_error.code_message);
}