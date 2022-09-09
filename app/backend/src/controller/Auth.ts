import { Request, Response, NextFunction } from 'express';
import { post_user } from "../schemas/User";
import { IUser } from "../Interfaces/IUser";
import Logger from '../Libs/Logger';
import AuthService from '../services/Auth'
import { schemaValidator } from '../Libs/CommonsValidator'


class AuthController {
  private user_service: AuthService;

  constructor() {
    this.user_service = new AuthService();
  }

  public async postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IUser>(req.body, post_user);
      const response = await this.user_service.postUser(body);
      res.json(response);
    } catch (error) {
      Logger.error(`[PostUser]: ${error.message}`)
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.user_service.getUser();
      res.json(response);
    } catch (error) {
      Logger.error(`[Login]: ${error.message}`)
      next(error);
    }
  }
}

export default AuthController;