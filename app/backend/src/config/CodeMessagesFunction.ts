import { ICodeMessagesFunction } from "../Interfaces/ICodeMessage";

// 0001 a 0999

const CODE_MESSAGES_FUNCTION: ICodeMessagesFunction = {
  UNHANDLED_ERROR: (x: string) => ({
    code: '0001',
    message: `UNHANDLED_ERROR: ${x}`,
  }),
  INVALID_DATA: (x: string) => ({
    code: '0002',
    message: x,
  }),
  ALREADY_EXIST_DATA: (object_name: string) => ({
    code: '0003',
    message: `Already have this ${object_name} in database`,
  }),
}

export default CODE_MESSAGES_FUNCTION;