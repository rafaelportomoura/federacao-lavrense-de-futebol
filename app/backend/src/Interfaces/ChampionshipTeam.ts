import { ICodeMessage } from "./ICodeMessage";

export interface IDbChampionshipTeam {
  idCampeonato: number;
  idTime: number
}

export interface IDbChampionshipTeamJoin {
  idTime: number;
  idCampeonato: number;
  nomeTime: string;
  nomeCampeonato: string;
  imagemTime: string;
  imagemCampeonato: string;
  idTimeVencedor: number;
}

export interface IChampionshipTeamParam {
  championship_id: number;
  team_id: number;
}

export interface IChampionshipId {
  id: number;
}

export interface IPatchChampionshipTeamBody {
  teams: Array<number>
}

export interface IDeleteChampionshipTeamBody {
  teams: Array<number>
}

export interface IPatchChampionshipTeamResponse {
  [key: number]: ICodeMessage
}

export interface IDeleteChampionshipTeamResponse {
  [key: number]: ICodeMessage
}


export interface IGetChampionshipTeamsQuery {
  page?: number;
  size?: number;
}