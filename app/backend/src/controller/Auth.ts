import { Request, Response, NextFunction } from 'express';
import { post_user, login_user, change_password } from "../schemas/User";
import { IUser } from "../Interfaces/IUser";
import Logger from '../Libs/Logger';
import AuthService from '../services/Auth'
import { schemaValidator } from '../Libs/CommonsValidator'
import { CODE_MESSAGES } from '../config/CodeMessages';
import HTTP_STATUS_CODES from '../config/httpStatusCode';
import ApiError from '../exceptions/ApiError';

class AuthController {
  private user_service: AuthService;

  constructor() {
    this.user_service = new AuthService();
  }

  public async postUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IUser>(req.body, post_user);
      await this.user_service.postUser(body);
      res.status(HTTP_STATUS_CODES.CREATED).json(CODE_MESSAGES.SUCCESS_POST_USER);
    } catch (error) {
      Logger.error(`[PostUser]: ${error.message}`)
      next(error);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (req.body && req.headers) req.body.email = req.headers.email;
      const { email, password } = schemaValidator<IUser>(req.body, change_password);
      await this.user_service.changePassword(email, password);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.PASSWORD_CHANGE_SUCCESS);
    } catch (error) {
      Logger.error(`[ChangePassword]: ${error.message}`)
      next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IUser>(req.body, login_user);
      const response = await this.user_service.login(body);
      res.status(HTTP_STATUS_CODES.OK).json({ ...CODE_MESSAGES.SUCCESS_LOGIN, ...response });
    } catch (error) {
      Logger.error(`[Login]: ${error.message}`)
      next(error);
    }
  }

  public async validLoginToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.headers.authorization) {
        throw new ApiError.UnauthorizedError(CODE_MESSAGES.UNAUTHORIZED);
      }
      const token = req.headers.authorization.replace('Bearer ', '');
      const email = await this.user_service.validLoginToken(token);

      if (req.headers) req.headers.email = email;
      else req.headers = { email };
      next();
    } catch (error) {
      Logger.error(`[ValidLoginToken]: ${error.message}`)
      next(error);
    }
  }
}

export default AuthController;