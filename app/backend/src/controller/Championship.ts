import { Request, Response, NextFunction } from 'express';
import * as championship_schemas from "../schemas/Championship";
// eslint-disable-next-line snakecasejs/snakecasejs
import * as IChampionship from '../Interfaces/Championship';
import Logger from '../Libs/Logger';
import { schemaValidator } from '../Libs/CommonsValidator'
import { CODE_MESSAGES } from '../config/CodeMessages';
import HTTP_STATUS_CODES from '../config/httpStatusCode';
import ChampionshipService from '../services/Championship';

class ChampionshipController {
  private service: ChampionshipService;

  constructor() {
    this.service = new ChampionshipService();
  }

  public async postChampionship(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IChampionship.IPostChampionship>(req.body, championship_schemas.post_championship);
      await this.service.postChampionship(body);
      res.status(HTTP_STATUS_CODES.CREATED).json(CODE_MESSAGES.SUCCESS_POST_CHAMPIONSHIP);
    } catch (error) {
      Logger.error(`[PostChampionship]: ${error.message}`)
      next(error);
    }
  }

  public async getChampionships(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const path = schemaValidator<IChampionship.IGetChampionship>(req.query, championship_schemas.get_championship);
      const response = await this.service.getChampionships(path);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetChampionships]: ${error.message}`)
      next(error);
    }
  }

  public async getUniqueChampionship(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IChampionship.IGetUniqueChampionship;
      const { id } = schemaValidator<IChampionship.IGetUniqueChampionship>(params, championship_schemas.get_individual_championship);
      const response = await this.service.getOneChampionship(id);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetUniqueChampionship]: ${error.message}`)
      next(error);
    }
  }

  public async putChampionship(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IChampionship.IPutChampionshipPath;
      const { id } = schemaValidator<IChampionship.IPutChampionshipPath>(params, championship_schemas.put_individual_championship_path);
      const { nome } = schemaValidator<IChampionship.IPutChampionshipBody>(req.body, championship_schemas.put_individual_championship_body);
      await this.service.putChampionship(id, nome);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.CHAMPIONSHIP_WAS_UPDATED);
    } catch (error) {
      Logger.error(`[PutChampionship]: ${error.message}`)
      next(error);
    }
  }

  public async deleteChampionship(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IChampionship.IDeleteChampionshipPath;
      const { id } = schemaValidator<IChampionship.IDeleteChampionshipPath>(params, championship_schemas.delete_championship);
      await this.service.deleteChampionship(id);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.CHAMPIONSHIP_WAS_DELETED);
    } catch (error) {
      Logger.error(`[DeleteChampionship]: ${error.message}`)
      next(error);
    }
  }

  public async addChampionTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let params = req.params as unknown as IChampionship.IChampionTeam;
      params = schemaValidator<IChampionship.IChampionTeam>(params, championship_schemas.add_champions_team_championship_path);
      await this.service.addChampionTeam(params);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.CHAMPIONSHIP_TEAM_CHAMPIONS);
    } catch (error) {
      Logger.error(`[DeleteChampionship]: ${error.message}`)
      next(error);
    }
  }
}

export default ChampionshipController;