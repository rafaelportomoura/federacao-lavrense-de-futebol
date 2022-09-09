

export interface ICodeMessage {
  code: string;
  message: string;
}
export type ICodeMessageFunction = (x: string) => ICodeMessage;

export interface ICodeMessages {
  [key: string]: ICodeMessage | ICodeMessageFunction
}
