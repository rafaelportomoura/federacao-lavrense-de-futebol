import { ICodeMessages } from "../Interfaces/ICodeMessage";

// 1000 a 1999

export const CODE_MESSAGES: ICodeMessages = {
  ERROR_DB: {
    code: '1000',
    message: 'Error when call database',
  },
  INVALID_LOGIN: {
    code: '1001',
    message: 'Wrong email or password!',
  },
  SUCCESS_LOGIN: {
    code: '1002',
    message: 'Successfully logged in!',
  },
  UNAUTHORIZED: {
    code: '1003',
    message: 'Invalid Token!',
  },
  PASSWORD_CHANGE_SUCCESS: {
    code: '1004',
    message: 'Password was changed!',
  },
  PASSWORD_CHANGE_ERROR: {
    code: '1005',
    message: 'It was not possible to change the password!',
  },
  SUCCESS_POST_USER: {
    code: '1006',
    message: 'User was created!',
  },
  INTERNAL_SERVER_ERROR: {
    code: '1007',
    message: 'INTERNAL SERVER ERROR',
  },
  TEAM_WAS_CREATED: {
    code: "1008",
    message: "Team was created!",
  },
  TEAM_WAS_NOT_FOUND: {
    code: "1009",
    message: "Team was not found!",
  },
  TEAM_WAS_UPDATED: {
    code: "1010",
    message: "Team was updated",
  },
  TEAM_WAS_DELETED: {
    code: "1011",
    message: "Team was deleted",
  },
  TEAM_CANT_BE_DELETED: {
    code: "1012",
    message: "Team can't be deleted!",
  },
} as const;
