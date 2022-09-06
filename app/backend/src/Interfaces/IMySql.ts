/* eslint-disable @typescript-eslint/no-unused-vars */
namespace IMySql {
  export interface DbParams {
    host: string,
    user: string,
    password: string,
    database: string
  };

  export type Callback = () => void;
}

export default IMySql;