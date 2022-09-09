import { ICodeMessages } from "../Interfaces/ICodeMessage";

const CODE_MESSAGES: ICodeMessages = {
  UNHANDLED_ERROR: (x: string) => ({
    code: '0001',
    message: x,
  }),
} as const;

export default CODE_MESSAGES;