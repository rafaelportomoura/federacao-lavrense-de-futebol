import { IDbChampionship, IPostChampionship, IGetChampionship, IChampionTeam } from "../Interfaces/Championship";

import ChampionshipRepository from '../repositories/Championship';
import { CODE_MESSAGES } from '../config/CodeMessages';
import ApiError from '../exceptions/ApiError';
import IMySQL from '../Interfaces/IMySql';
import ChampionshipTeamsServices from './ChampionshipTeams';

class ChampionshipService {
  private repository: ChampionshipRepository;

  private championship_team_service: ChampionshipTeamsServices;

  constructor() {
    this.repository = new ChampionshipRepository();
    this.championship_team_service = new ChampionshipTeamsServices()
  }

  public async postChampionship(team: IPostChampionship): Promise<void> {
    await this.repository.save(team);
  }

  public async getOneChampionship(id: number): Promise<IDbChampionship> {
    const response = await this.repository.getOneChampionship(id);
    if (!response) {
      throw new ApiError.NotFoundError(CODE_MESSAGES.CHAMPIONSHIP_WAS_NOT_FOUND);
    }
    return response;
  }

  public async putChampionship(id: number, name: string): Promise<void> {
    await this.getOneChampionship(id);
    await this.repository.putChampionship(id, name);
  }

  public async deleteChampionship(id: number): Promise<void> {
    await this.getOneChampionship(id);
    await this.repository.deleteChampionship(id);
  }

  public async getChampionships(params: IGetChampionship): Promise<IMySQL.IWithPagination<IDbChampionship>> {
    const paginate = { perPage: params.size, currentPage: params.page };
    const { id_team, nome } = params;
    if (!id_team && !nome) {
      const response = await this.repository.getChampionships(paginate);
      return response;
    }

    if (!nome) {
      const response = await this.repository.getChampionshipsByTeam(paginate, id_team);
      return response;
    }

    if (!id_team) {
      const response = await this.repository.getChampionshipByName(paginate, nome);
      return response;
    }

    const response = await this.repository.getChampionshipFromTeamFilterByName(paginate, id_team, nome);
    return response;
  }

  public async addChampionTeam(params: IChampionTeam): Promise<void> {
    await this.championship_team_service.getOneChampionshipTeam(params);
    await this.repository.addChampionTeam(params);
  }
}

export default ChampionshipService;