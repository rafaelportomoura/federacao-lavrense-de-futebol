export interface ITeam {
  nome: string;
  image?: string;
}

export interface IDbTeam {
  idTime: number;
  nome: string;
  image?: string;
}

export interface ITeamId {
  id?: number;
}

export interface IPaginationTeam {
  current_page: number;
  total_pages: number;
  current_items: number;
  total_items: number;
  teams: Array<ITeam>;
}

export interface IPaginationTeamParams {
  page?: number;
  size?: number;
  id_camp?: number;
  nome?: string;
}

export interface IGetTeams {
  id_camp?: number;
  nome?: string;
}