import { Request, Response } from 'express';
import Logger from '../Libs/Logger';
import MySQL from '../database/mysql';

class AuthController {
  database: MySQL;

  constructor() {
    this.database = MySQL.getInstance();
    Logger.debug("Constructor");
  }

  public async logger(request: Request, response: Response): Promise<void> {
    try {
      console.log(this)
      console.log(this.database)
      await this.database.connect();

      response.send({ "message": "Hello world" });
    } catch (error) {
      console.log(error)
      Logger.error('Eita porra')
      response.send({ "error": "error" });
    }
  }
}

export default AuthController;