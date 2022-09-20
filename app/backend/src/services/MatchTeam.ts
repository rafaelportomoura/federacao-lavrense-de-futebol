
import { IPatchMatchTeam, IMatchTeamComplete } from "../Interfaces/IMatchTeam";
import MatchTeamRepository from '../repositories/MatchTeam';
import { CODE_MESSAGES } from '../config/CodeMessages';
import ApiError from '../exceptions/ApiError';
import MatchService from "./Match";
import ChampionshipTeamsServices from "./ChampionshipTeams";
import Logger from "../Libs/Logger";

class MatchTeamService {
  private repository: MatchTeamRepository;

  private match_service: MatchService;

  private championship_teams_services: ChampionshipTeamsServices;

  constructor() {
    this.repository = new MatchTeamRepository();
    this.match_service = new MatchService();
    this.championship_teams_services = new ChampionshipTeamsServices();
  }

  async patchMatchTeam(match: IPatchMatchTeam): Promise<void> {
    const match_raw = await this.match_service.getOneMatch(match.idPartida);
    await this.championship_teams_services.getOneChampionshipTeam({ team_id: match.idTime1, championship_id: match_raw.idCampeonato });
    await this.championship_teams_services.getOneChampionshipTeam({ team_id: match.idTime2, championship_id: match_raw.idCampeonato });
    const time1 = {
      idPartida: match.idPartida,
      idTime: match.idTime1,
    }
    const time2 = {
      idPartida: match.idPartida,
      idTime: match.idTime2,
    }
    try {
      await this.repository.save(time1);
    } catch (error) {
      Logger.error(error);
    }
    try {
      await this.repository.save(time2);
    } catch (error) {
      Logger.error(error);
    }
  }

  async getOneMatch(id: number): Promise<Array<IMatchTeamComplete>> {
    const response = await this.repository.getOneMatch(id);
    if (!response) {
      throw new ApiError.NotFoundError(CODE_MESSAGES.MATCH_NOT_FOUND);
    }
    return response;
  }

}

export default MatchTeamService;