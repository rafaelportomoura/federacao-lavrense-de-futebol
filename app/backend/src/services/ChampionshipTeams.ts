import { IDeleteChampionshipTeamBody, IGetChampionshipTeamsQuery, IDbChampionshipTeamJoin, IChampionshipTeamParam, IPatchChampionshipTeamBody, IPatchChampionshipTeamResponse } from "../Interfaces/ChampionshipTeam";

import ChampionshipTeamsRepository from '../repositories/ChampionshipTeam';
import { CODE_MESSAGES } from '../config/CodeMessages';
import ApiError from '../exceptions/ApiError';
import IMySql from "../Interfaces/IMySql";


class ChampionshipTeamsServices {
  private repository: ChampionshipTeamsRepository;

  constructor() {
    this.repository = new ChampionshipTeamsRepository();
  }

  public async postChampionshipTeam(id: number, params: IPatchChampionshipTeamBody): Promise<IPatchChampionshipTeamResponse> {
    const response = {} as IPatchChampionshipTeamResponse;
    for (const team of params.teams) {
      const db_params = {
        idCampeonato: id,
        idTime: team,
      }
      try {
        await this.repository.save(db_params);
        response[team] = CODE_MESSAGES.CHAMPIONSHIP_TEAM_ADDED;
      } catch (error) {
        response[team] = error.code_message;
      }

    }
    return response;
  }

  public async getOneChampionshipTeam(params: IChampionshipTeamParam): Promise<IDbChampionshipTeamJoin> {
    const response = await this.repository.getOneChampionshipTeam(params);
    if (!response) {
      throw new ApiError.NotFoundError(CODE_MESSAGES.CHAMPIONSHIP_TEAM_NOT_FOUND)
    }

    return response;
  }

  public async deleteChampionshipTeam(id: number, params: IDeleteChampionshipTeamBody): Promise<IPatchChampionshipTeamResponse> {
    const response = {} as IPatchChampionshipTeamResponse;
    for (const team of params.teams) {
      const search_params = {
        championship_id: id,
        team_id: team,
      }
      try {
        const championship_team = await this.getOneChampionshipTeam(search_params);
        if (championship_team.idTimeVencedor === team) {
          throw new ApiError.BusinessError(CODE_MESSAGES.CHAMPIONSHIP_TEAM_CHAMPIONS_CANT_BE_DELETED);
        }
        await this.repository.deleteChampionshipTeam(search_params);
        response[team] = CODE_MESSAGES.CHAMPIONSHIP_TEAM_DELETED;
      } catch (error) {
        response[team] = error.code_message;
      }
    }
    return response;
  }


  public async getChampionshipTeams(
    id: number,
    query: IGetChampionshipTeamsQuery
  ): Promise<IMySql.IWithPagination<IDbChampionshipTeamJoin>> {
    const paginate: IMySql.IPaginateParams = {
      perPage: query.size,
      currentPage: query.page,
    }
    const response = await this.repository.getChampionshipTeams(paginate, id);
    return response;
  }
}

export default ChampionshipTeamsServices;