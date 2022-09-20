/* eslint-disable @typescript-eslint/no-unused-vars */

namespace IMySql {
  export interface DbParams {
    port: number,
    host: string,
    user: string,
    password: string,
    database: string
  };

  export interface IPaginateParams {
    perPage: number,
    currentPage: number,
    isFromStart?: boolean,
    isLengthAware?: boolean,
  }
  export interface IPagination {
    total?: number;
    lastPage?: number;
    currentPage: number;
    perPage: number;
    from: number;
    to: number;
  }
  export interface IWithPagination<T = any> {
    data: Array<T>;
    pagination: IPagination
  }

}

export default IMySql;