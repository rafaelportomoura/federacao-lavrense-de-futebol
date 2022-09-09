/* eslint-disable @typescript-eslint/no-unused-vars */

namespace IMySql {
  export interface DbParams {
    port: number,
    host: string,
    user: string,
    password: string,
    database: string
  };


}

export default IMySql;