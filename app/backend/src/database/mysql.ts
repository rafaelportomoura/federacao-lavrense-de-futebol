/* eslint-disable no-use-before-define */
import mysql from 'mysql2/promise'
import IMySql from "../Interfaces/IMySql";
import CONFIG from '../config/Environments';

class MySQL {
  private static instance: MySQL;

  private config: IMySql.DbParams

  private uri: IMySql.Uri;

  private connection: mysql.Connection;

  private constructor(DB_CONFIG: IMySql.DbParams) {
    this.config = DB_CONFIG;
    this.connection = null;
    this.uri = `mysql://${this.config.user}:${this.config.password}@${this.config.host}/${this.config.database}`
  }

  public static getInstance(DB_CONFIG: IMySql.DbParams = CONFIG.DB): MySQL {
    if (!MySQL.instance) {
      MySQL.instance = new MySQL(DB_CONFIG);
    }

    return MySQL.instance;
  }

  public async connect(): Promise<mysql.Connection> {
    this.connection = await mysql.createConnection(this.uri)

    await this.connection.connect();

    return this.connection;
  }


  public async endConnection(): Promise<void> {
    this.connection.end();
  }
}

export default MySQL;