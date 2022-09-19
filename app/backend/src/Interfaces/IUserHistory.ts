type Body = Record<string, unknown>;
type Query = Record<string, unknown>;
type Parameters = Record<string, unknown>;

export interface IUserHistory {
  idAtividadeDoUsuario?: string;
  body: Body;
  query: Query;
  parameters: Parameters;
  path: string;
  IP: string;
  email: string;
  timestamp: Date;
}