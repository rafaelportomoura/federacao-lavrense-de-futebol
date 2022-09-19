const TABLES = ['AtividadeDoUsuario', 'Campeonato', 'CampeonatoTime', 'Gol', 'Partida', 'PartidaTime', 'Time', 'Usuario'] as const;


export type ITables = typeof TABLES[number];

export type ITablesHash = {
  [key in ITables]: ITables
}