import { Request, Response, NextFunction } from 'express';
import { post_user, login_user } from "../schemas/User";
import { IUser } from "../Interfaces/IUser";
import Logger from '../Libs/Logger';
import AuthService from '../services/Auth'
import { schemaValidator } from '../Libs/CommonsValidator'
import CODE_MESSAGES from '../config/CodeMessages';
import HTTP_STATUS_CODES from '../config/httpStatusCode';


class AuthController {
  private user_service: AuthService;

  constructor() {
    this.user_service = new AuthService();
  }

  public async postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IUser>(req.body, post_user);
      const response = await this.user_service.postUser(body);
      res.status(HTTP_STATUS_CODES.CREATED).json(response);
    } catch (error) {
      Logger.error(`[PostUser]: ${error.message}`)
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IUser>(req.body, login_user);
      await this.user_service.login(body);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.SUCCESS_LOGIN);
    } catch (error) {
      Logger.error(`[Login]: ${error.message}`)
      next(error);
    }
  }
}

export default AuthController;