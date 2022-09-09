import { ICodeMessages } from "../Interfaces/ICodeMessage";

const CODE_MESSAGES: ICodeMessages = {
  UNHANDLED_ERROR: (x: string) => ({
    code: '0001',
    message: x,
  }),
  INVALID_DATA: (x: string) => ({
    code: '0002',
    message: x,
  }),
  ALREADY_EXIST_DATA: (object_name: string) => ({
    code: '0003',
    message: `Already have this ${object_name} in database`,
  }),
  ERROR_DB: {
    code: '0004',
    message: 'Error when call database',
  },
  INVALID_LOGIN: {
    code: '0005',
    message: 'Wrong email or password!',
  },
  SUCCESS_LOGIN: {
    code: '0006',
    message: 'Successfully logged in!',
  },
} as const;

export default CODE_MESSAGES;