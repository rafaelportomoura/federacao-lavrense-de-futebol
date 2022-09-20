import { Request, Response, NextFunction } from 'express';
import { IPostGoal } from "../Interfaces/IGoal";
import {
  post_goal,
  delete_goal
} from '../schemas/Goal';
import Logger from '../Libs/Logger';
import { schemaValidator } from '../Libs/CommonsValidator'
import { CODE_MESSAGES } from '../config/CodeMessages';
import HTTP_STATUS_CODES from '../config/httpStatusCode';
import GoalService from '../services/Goal';

class GoalController {
  private goal_service: GoalService;

  constructor() {
    this.goal_service = new GoalService();
  }

  public async postGoal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IPostGoal>(req.body, post_goal);
      await this.goal_service.postGoal(body);
      res.status(HTTP_STATUS_CODES.CREATED).json(CODE_MESSAGES.GOAL_CREATED);
    } catch (error) {
      Logger.error(`[PostGoal]: ${error.message}`)
      next(error);
    }
  }


  public async deleteGoal(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as { id: number };
      const { id } = schemaValidator<{ id: number }>(params, delete_goal);
      await this.goal_service.deleteGoals(id);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.GOAL_DELETED);
    } catch (error) {
      Logger.error(`[DeleteGoal]: ${error.message}`)
      next(error);
    }
  }
};

export default GoalController;