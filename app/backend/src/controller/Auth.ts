import { Request, Response, NextFunction } from 'express';
import Logger from '../Libs/Logger';
import AuthService from '../services/Auth'

class AuthController {
  private user_service: AuthService;

  constructor() {
    this.user_service = new AuthService();
  }

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.user_service.getUser();
      res.json(response);
    } catch (error) {
      Logger.error(`[AuthController]: ${error.message}`)
      next(error);
    }
  }
}

export default AuthController;