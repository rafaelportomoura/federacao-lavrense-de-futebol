import { Request, Response } from 'express';
import Logger from '../Libs/Logger';

class AuthController {
  constructor() {
    Logger.debug("Constructor");
  }

  logger(request: Request, response: Response): void {

    Logger.error("This is an error log");
    Logger.warn("This is a warn log");
    Logger.info("This is a info log");
    Logger.http("This is a http log");
    Logger.debug("This is a debug log");

    response.send({ "message": "Hello world" });
  }
}

export default AuthController;