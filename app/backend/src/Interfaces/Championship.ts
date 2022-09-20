export interface IDbChampionship {
  idCampeonato?: number;
  nome: string;
  image?: string;
  idTimeVencedor?: number;
}

export interface IPostChampionship {
  nome: string;
}


export interface IGetUniqueChampionship {
  id: number;
}

export interface IPutChampionshipPath {
  id: number;
}

export interface IPutChampionshipBody {
  nome: string;
}

export interface IDeleteChampionshipPath {
  id: number;
}

export interface IGetChampionship {
  page?: number;
  size?: number;
  id_team?: number;
  nome?: string;
}

export interface IChampionTeam {
  championship_id: number;
  team_id: number;
}