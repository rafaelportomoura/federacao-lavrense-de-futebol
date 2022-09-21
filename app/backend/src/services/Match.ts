
import { IPostMatch, IPutMatch, IDbMatch } from "../Interfaces/IMatch";
import MatchRepository from '../repositories/Match';
import { CODE_MESSAGES } from '../config/CodeMessages';
import ApiError from '../exceptions/ApiError';
import ChampionshipService from "./Championship";
import IMySql from "../Interfaces/IMySql";

class MatchService {
  private repository: MatchRepository;

  private championship_service: ChampionshipService;


  constructor() {
    this.repository = new MatchRepository();
    this.championship_service = new ChampionshipService();
  }

  async postMatch(match: IPostMatch): Promise<void> {
    await this.championship_service.getOneChampionship(match.idCampeonato);
    match.data = match.data.replace('T', ' ');
    match.data = match.data.replace('Z', '');
    await this.repository.save(match);
  }

  async getOneMatch(id: number): Promise<IDbMatch> {
    const response = await this.repository.getOneMatch(id);
    if (!response) {
      throw new ApiError.NotFoundError(CODE_MESSAGES.MATCH_NOT_FOUND);
    }
    return response;
  }

  async putMatch(id: number, match: IPutMatch): Promise<void> {
    await this.getOneMatch(id);
    await this.championship_service.getOneChampionship(match.idCampeonato);
    match.data = match.data.replace('T', ' ');
    match.data = match.data.replace('Z', '');
    await this.repository.putMatch(id, match);
  }

  async deleteMatch(id: number): Promise<void> {
    await this.getOneMatch(id);
    await this.repository.deleteMatch(id);
  }

  async getMatchByChampionship(paginate: IMySql.IPaginateParams, championship_id: number): Promise<IMySql.IWithPagination<IDbMatch>> {
    const response = this.repository.getMatchByChampionship(paginate, championship_id);
    return response;
  }
}

export default MatchService;