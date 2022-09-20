import { Request, Response, NextFunction } from 'express';
import {
  post_team, get_team, get_individual_team, put_individual_team_path, put_individual_team_body, delete_team
} from "../schemas/Team";
import { ITeam, IPaginationTeamParams, ITeamId } from "../Interfaces/ITeam";
import Logger from '../Libs/Logger';
import { schemaValidator } from '../Libs/CommonsValidator'
import { CODE_MESSAGES } from '../config/CodeMessages';
import HTTP_STATUS_CODES from '../config/httpStatusCode';
import TeamService from '../services/Team';

class TeamController {
  private team_service: TeamService;

  constructor() {
    this.team_service = new TeamService();
  }

  public async postTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<ITeam>(req.body, post_team);
      await this.team_service.postTeam(body);
      res.status(HTTP_STATUS_CODES.CREATED).json(CODE_MESSAGES.SUCCESS_POST_TEAM);
    } catch (error) {
      Logger.error(`[PostTeam]: ${error.message}`)
      next(error);
    }
  }

  public async getTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const path = schemaValidator<IPaginationTeamParams>(req.query, get_team);
      const response = await this.team_service.getTeams(path);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetTeams]: ${error.message}`)
      next(error);
    }
  }

  public async getUniqueTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = schemaValidator<ITeamId>(req.params, get_individual_team);
      const response = await this.team_service.getOneTeam(id);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetUniqueTeam]: ${error.message}`)
      next(error);
    }
  }

  public async putTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = schemaValidator<ITeamId>(req.params, put_individual_team_path);
      const { nome } = schemaValidator<ITeam>(req.body, put_individual_team_body);
      await this.team_service.putTeam(id, nome);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.TEAM_WAS_UPDATED);
    } catch (error) {
      Logger.error(`[PutTeam]: ${error.message}`)
      next(error);
    }
  }

  public async deleteTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = schemaValidator<ITeamId>(req.params, delete_team);
      await this.team_service.deleteTeam(id);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.TEAM_WAS_DELETED);
    } catch (error) {
      Logger.error(`[DeleteTeam]: ${error.message}`)
      next(error);
    }
  }
}

export default TeamController;