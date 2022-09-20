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
  SUCCESS_POST_TEAM: {
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
  SUCCESS_POST_CHAMPIONSHIP: {
    code: "1013",
    message: "Championship was created!",
  },
  CHAMPIONSHIP_WAS_NOT_FOUND: {
    code: "1014",
    message: "Championship was not found!",
  },
  CHAMPIONSHIP_WAS_UPDATED: {
    code: "1015",
    message: "Championship was updated",
  },
  CHAMPIONSHIP_WAS_DELETED: {
    code: "1016",
    message: "Championship was deleted",
  },
  CHAMPIONSHIP_CANT_BE_DELETED: {
    code: "1017",
    message: "Championship can't be deleted!",
  },
  CHAMPIONSHIP_TEAM_ADDED: {
    code: "1018",
    message: "Championship team has been added!",
  },
  CHAMPIONSHIP_TEAM_DELETED: {
    code: "1019",
    message: "Championship teams has been deleted!",
  },
  CHAMPIONSHIP_TEAM_NOT_FOUND: {
    code: "1020",
    message: "Championship team was not found!",
  },
  CHAMPIONSHIP_TEAM_CHAMPIONS: {
    code: "1021",
    message: "Championship champions team has been added!",
  },
  CHAMPIONSHIP_TEAM_CHAMPIONS_CANT_BE_DELETED: {
    code: "1022",
    message: "Championship champions team can't be deleted",
  },
  SUCCESS_CREATED_MATCH: {
    code: "1023",
    message: "Success created match!",
  },
  SUCCESS_EDIT_MATCH: {
    code: "1024",
    message: "Success edit match!",
  },
  MATCH_NOT_FOUND: {
    code: "1025",
    message: "Match was not found!",
  },
  MATCH_DELETE: {
    code: "1026",
    message: "Success delete match!",
  },
  MATCH_EDIT_TEAM: {
    code: "1027",
    message: "Success edit match team!",
  },
  GOAL_DELETED: {
    code: "1028",
    message: "Goal has been deleted",
  },
  GOAL_CREATED: {
    code: "1029",
    message: "Goal has been created",
  },
  GOAL_NOT_FOUND: {
    code: "1030",
    message: "Goal was not found!",
  },
} as const;
