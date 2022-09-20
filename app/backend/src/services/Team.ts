import { IDbTeam, ITeam, IPaginationTeamParams } from '../Interfaces/ITeam';
import TeamRepository from '../repositories/Team';
import { CODE_MESSAGES } from '../config/CodeMessages';
import ApiError from '../exceptions/ApiError';

class TeamService {
  private repository: TeamRepository;

  constructor() {
    this.repository = new TeamRepository();
  }

  async postTeam(team: ITeam): Promise<void> {
    await this.repository.save(team);
  }

  async getOneTeam(id: number): Promise<IDbTeam> {
    const response = await this.repository.getOne(id);
    if (!response) {
      throw new ApiError.NotFoundError(CODE_MESSAGES.TEAM_WAS_NOT_FOUND);
    }
    return response;
  }

  async getTeams(params: IPaginationTeamParams): Promise<unknown> {
    const paginate = { perPage: params.size, currentPage: params.page };
    const { nome, id_camp } = params;
    if (!nome && !id_camp) {
      const response = await this.repository.getTeams(paginate);
      return response;
    }
    if (!nome) {
      const response = await this.repository.getTeamsFromCamp(paginate, id_camp);
      return response;
    }
    if (!id_camp) {
      const response = await this.repository.getTeamsFilterByName(paginate, nome);
      return response;
    }

    const response = await this.repository.getTeamsFromCampFilterByName(paginate, params);
    return response;
  }

  async putTeam(id: number, name: string): Promise<void> {
    await this.getOneTeam(id);
    await this.repository.updateTeamName(id, name);
  }

  async deleteTeam(id: number): Promise<void> {
    await this.getOneTeam(id);
    await this.repository.deleteTeam(id);
  }
}

export default TeamService;