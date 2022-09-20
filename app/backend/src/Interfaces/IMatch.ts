export interface IDbMatch {
  idPartida: number;
  data: string;
  idCampeonato: number;
  tipo: string;
}


export interface IMatchChampionship {
  idPartida: number;
  data: string;
  tipo: string;
  campeonato: {
    idCampeonato: number;
    idTimeVencedor: number;
    nome: string;
    image: string;
  }
}

export interface IDbCompleteMatch extends IMatchChampionship {
  x?: string;
}



export interface IPostMatch {
  data: string;
  idCampeonato: number;
  tipo: string;
}

export interface IPutMatch {
  data: string;
  idCampeonato: number;
  tipo: string;
}

export interface IMatchId {
  id: number
}