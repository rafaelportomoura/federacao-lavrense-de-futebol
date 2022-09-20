import { Request, Response, NextFunction } from 'express';
import { IChampionshipId, IPostMatch, IPutMatch, IMatchId, IMatchPagination } from "../Interfaces/IMatch";
import {
  post_match,
  get_one_match,
  put_match_path,
  put_match_body,
  delete_one_match,
  get_matches_by_championship_query,
  get_matches_championship_query
} from "../schemas/Match";
import {
  patch_match_team_body
} from '../schemas/MatchTeam'
import { IPatchMatchTeamBody } from "../Interfaces/IMatchTeam";
import Logger from '../Libs/Logger';
import { schemaValidator } from '../Libs/CommonsValidator'
import { CODE_MESSAGES } from '../config/CodeMessages';
import HTTP_STATUS_CODES from '../config/httpStatusCode';
import MatchService from '../services/Match';
import MatchCompleteService from '../services/MatchComplete';
import MatchTeamService from '../services/MatchTeam';

class MatchController {
  private match_service: MatchService;

  private match_complete_service: MatchCompleteService;

  private match_team_service: MatchTeamService;

  constructor() {
    this.match_service = new MatchService();
    this.match_complete_service = new MatchCompleteService();
    this.match_team_service = new MatchTeamService();
  }

  public async postMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const body = schemaValidator<IPostMatch>(req.body, post_match);
      await this.match_service.postMatch(body);
      res.status(HTTP_STATUS_CODES.CREATED).json(CODE_MESSAGES.SUCCESS_CREATED_MATCH);
    } catch (error) {
      Logger.error(`[PostMatch]: ${error.message}`)
      next(error);
    }
  }


  public async getUniqueMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IMatchId;
      const { id } = schemaValidator<IMatchId>(params, get_one_match);
      const response = await this.match_complete_service.getOneMatchComplete(id);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetUniqueMatch]: ${error.message}`)
      next(error);
    }
  }

  public async putMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IMatchId;
      const { id } = schemaValidator<IMatchId>(params, put_match_path);
      const body = schemaValidator<IPutMatch>(req.body, put_match_body);
      await this.match_service.putMatch(id, body);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.SUCCESS_EDIT_MATCH);
    } catch (error) {
      Logger.error(`[PutMatch]: ${error.message}`)
      next(error);
    }
  }

  public async deleteMatch(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IMatchId;
      const { id } = schemaValidator<IMatchId>(params, delete_one_match);
      await this.match_service.deleteMatch(id);
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.MATCH_DELETE);
    } catch (error) {
      Logger.error(`[DeleteMatch]: ${error.message}`)
      next(error);
    }
  }

  public async patchTeams(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IMatchId;
      const { id } = schemaValidator<IMatchId>(params, delete_one_match);
      const body = schemaValidator<IPatchMatchTeamBody>(req.body, patch_match_team_body)
      await this.match_team_service.patchMatchTeam({ idPartida: id, ...body });
      res.status(HTTP_STATUS_CODES.OK).json(CODE_MESSAGES.MATCH_EDIT_TEAM);
    } catch (error) {
      Logger.error(`[PatchTeamsMatch]: ${error.message}`)
      next(error);
    }
  }

  public async getMatchesByChampionshipId(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const params = req.params as unknown as IChampionshipId;
      const { championship_id } = schemaValidator<IChampionshipId>(params, get_matches_by_championship_query);
      const query = req.query as unknown as IMatchPagination;
      const { page, size } = schemaValidator<IMatchPagination>(query, get_matches_championship_query);
      const response = await this.match_complete_service.getMatchesByChampionshipId({ currentPage: page, perPage: size }, championship_id);
      res.status(HTTP_STATUS_CODES.OK).json(response);
    } catch (error) {
      Logger.error(`[GetMatchesByChampionshipId]: ${error.message}`)
      next(error);

    }
  }
};

export default MatchController;