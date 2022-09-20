
import { IDbCompleteMatch, IDbMatch } from "../Interfaces/IMatch";
import MatchService from './Match';
import ChampionshipService from "./Championship";
import MatchTeamService from './MatchTeam'
import MatchGoals from './Goal'
import IMySql from "../Interfaces/IMySql";

class MatchCompleteService {
  private match_service: MatchService;

  private championship_service: ChampionshipService;

  private match_team_service: MatchTeamService;

  private match_goals: MatchGoals;


  constructor() {
    this.match_service = new MatchService();
    this.championship_service = new ChampionshipService();
    this.match_team_service = new MatchTeamService();
    this.match_goals = new MatchGoals();
  }

  async getOneMatchComplete(id: number): Promise<IDbCompleteMatch> {
    const match = await this.match_service.getOneMatch(id);
    const response = await this.completeMatch(match);
    return response;
  }

  async getMatchesByChampionshipId(
    paginate: IMySql.IPaginateParams,
    championship_id: number
  ): Promise<IMySql.IWithPagination<IDbCompleteMatch>> {
    const matches = await this.match_service.getMatchByChampionship(paginate, championship_id);
    const response = {
      pagination: matches.pagination,
      data: [],
    } as IMySql.IWithPagination<IDbCompleteMatch>;
    for await (const e of matches.data) {
      response.data.push(await this.completeMatch(e));
    }
    return response;
  }

  async completeMatch(match: IDbMatch): Promise<IDbCompleteMatch> {
    const championship = await this.championship_service.getOneChampionship(match.idCampeonato);
    const [time1, time2] = await this.match_team_service.getOneMatch(match.idPartida);
    if (time1) {
      const time1_goals = await this.match_goals.getGoals({ idPartida: match.idPartida, idTime: time1.idTime });
      time1.gols = time1_goals;
    }
    if (time2) {
      const time2_goals = await this.match_goals.getGoals({ idPartida: match.idPartida, idTime: time2.idTime });
      time2.gols = time2_goals;
    }
    const response = {
      idPartida: match.idPartida,
      data: match.data,
      tipo: match.tipo,
      campeonato: championship,
      time1: time1 || null,
      time2: time2 || null,

    } as IDbCompleteMatch;
    return response;
  }

}

export default MatchCompleteService;