import ApiError from "./ApiError";
import CODE_MESSAGES from "../config/CodeMessages";
import { ICodeMessageFunction, ICodeMessage } from "../Interfaces/ICodeMessage";
import HTTP_STATUS_CODES from "../config/httpStatusCode";
import { ISqlError } from '../Interfaces/ISQLError';
import Logger from "../Libs/Logger";

export class DBError extends ApiError.ApiErrorMother {

  constructor(error: ISqlError, db_table_object_name: string) {
    Logger.error(JSON.stringify(error));
    let error_message_function: ICodeMessageFunction;
    let code_message: ICodeMessage;
    let status_code: number = HTTP_STATUS_CODES.BAD_REQUEST;
    switch (error.code) {
      case 'ER_DUP_ENTRY':
        error_message_function = CODE_MESSAGES.ALREADY_EXIST_DATA as ICodeMessageFunction;
        code_message = error_message_function(db_table_object_name);
        break;

      default:
        code_message = CODE_MESSAGES.ERROR_DB as ICodeMessage;
        status_code = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
        break;
    }
    super('DB_ERROR', code_message, status_code);
  }
}