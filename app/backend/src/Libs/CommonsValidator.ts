import 'joi-i18n';
import Joi from 'joi';
import ApiError from '../exceptions/ApiError';
import CODE_MESSAGES_FUNCTION from '../config/CodeMessagesFunction';

export function schemaValidator<T>(body: T, schema: Joi.AnySchema) {
  const { value, error } = schema.validate<T>(body);

  if (error) {
    let error_message;
    try {
      const path = error.details[0].path.join('.');
      error_message = `[${path}] ${error.details[0].message}`;
    } catch {
      error_message = error.message;
    }
    const code_messages_interface = CODE_MESSAGES_FUNCTION.INVALID_DATA

    throw new ApiError.BusinessError(code_messages_interface(error_message));
  }

  return value;
}
