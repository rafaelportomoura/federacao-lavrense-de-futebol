import { Request, Response, NextFunction } from 'express';
import * as championship_teams_schemas from "../schemas/ChampionshipTeams";
// eslint-disable-next-line snakecasejs/snakecasejs
import * as IChampionshipTeams from '../Interfaces/ChampionshipTeam';
import Logger from '../Libs/Logger';
import { schemaValidator } from '../Libs/CommonsValidator'
import HTTP_STATUS_CODES from '../config/httpStatusCode';
import ChampionshipTeamService from '../services/ChampionshipTeams';

class ChampionshipTeamController {
  private service: ChampionshipTeamService;

  constructor() {
    this.service = new ChampionshipTeamService();
  }

  public async patchChampionshipTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IChampionshipTeams.IPatchChampionshipTeamBody>(
        req.body,
        championship_teams_schemas.add_team_championship_body
      );
      const params = req.params as unknown as IChampionshipTeams.IChampionshipId
      const { id } = schemaValidator<IChampionshipTeams.IChampionshipId>(
        params,
        championship_teams_schemas.add_team_championship_path
      )
      const response = await this.service.postChampionshipTeam(id, body);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[PatchChampionshipTeam]: ${error.message}`)
      next(error);
    }
  }

  public async deleteChampionshipTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IChampionshipTeams.IDeleteChampionshipTeamBody>(
        req.body,
        championship_teams_schemas.delete_team_championship_body
      );
      const params = req.params as unknown as IChampionshipTeams.IChampionshipId
      const { id } = schemaValidator<IChampionshipTeams.IChampionshipId>(
        params,
        championship_teams_schemas.delete_team_championship_path
      )
      const response = await this.service.deleteChampionshipTeam(id, body);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[DeleteChampionshipTeam]: ${error.message}`)
      next(error);
    }
  }

  public async getChampionshipTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IChampionshipTeams.IChampionshipId
      const { id } = schemaValidator<IChampionshipTeams.IChampionshipId>(
        params,
        championship_teams_schemas.delete_team_championship_path
      )
      const paginate = schemaValidator<IChampionshipTeams.IGetChampionshipTeamsQuery>(
        req.query,
        championship_teams_schemas.get_championship_teams_query
      )
      const response = await this.service.getChampionshipTeams(id, paginate)
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetChampionshipTeams]: ${error.message}`)
      next(error);
    }

  }
};

export default ChampionshipTeamController;