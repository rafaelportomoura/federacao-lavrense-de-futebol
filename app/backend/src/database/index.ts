/* eslint-disable no-use-before-define */
import knex from 'knex';
import CONFIG from '../config/Environments';
import Logger from '../Libs/Logger';

export default knex({
  client: 'mysql',
  connection: {
    host: CONFIG.DB.host,
    port: CONFIG.DB.port,
    user: CONFIG.DB.user,
    password: CONFIG.DB.password,
    database: CONFIG.DB.database,
  },
  log: {
    warn(message) {
      Logger.warn(message);
    },
    error(message) {
      Logger.error(message);
    },
    deprecate(message) {
      Logger.info(message);
    },
    debug(message) {
      Logger.debug(message);
    },
  },
  acquireConnectionTimeout: 10000,
})