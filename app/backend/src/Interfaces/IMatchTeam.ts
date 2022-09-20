export interface IMatchTeam {
  idPartida: number;
  idTime: number;
}

export interface IPatchMatchTeam {
  idPartida: number;
  idTime1: number;
  idTime2: number;
}

export interface IPatchMatchTeamBody {
  idTime1: number;
  idTime2: number;
}

export interface IMatchTeamComplete {
  idTime: number;
  nome: number;
  image: number;
}