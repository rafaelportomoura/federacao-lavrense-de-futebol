import { IDbChampionshipTeam, IChampionshipTeamParam, IDbChampionshipTeamJoin } from "../Interfaces/ChampionshipTeam";
import { ITables } from "../Interfaces/ITables";
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';
import IMySql from "../Interfaces/IMySql";

class ChampionshipRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.CampeonatoTime;
    this.table_object_name = 'championship_team';
  }

  public async save(championship: IDbChampionshipTeam): Promise<void> {
    try {
      await knex<IDbChampionshipTeam>(this.table).insert(championship);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getOneChampionshipTeam(params: IChampionshipTeamParam): Promise<IDbChampionshipTeamJoin> {
    try {
      const response = await knex<IDbChampionshipTeamJoin>(this.table)
        .column(
          { idTime: `${this.table}.idTime` },
          { idCampeonato: `${this.table}.idCampeonato` },
          { nomeTime: `${TABLES.Time}.nome` },
          { nomeCampeonato: `${TABLES.Campeonato}.nome` },
          { imagemTime: `${TABLES.Time}.image` },
          { imagemCampeonato: `${TABLES.Campeonato}.image` },
          { idTimeVencedor: `${TABLES.Campeonato}.idTimeVencedor` }
        )
        .select()
        .where({
          [`${this.table}.idCampeonato`]: params.championship_id,
          [`${this.table}.idTime`]: params.team_id,
        })
        .innerJoin(
          TABLES.Time,
          `${this.table}.idTime`,
          '=',
          `${TABLES.Time}.idTime`
        )
        .innerJoin(
          TABLES.Campeonato,
          `${this.table}.idCampeonato`,
          '=',
          `${TABLES.Campeonato}.idCampeonato`
        )
        .first();
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getChampionshipTeams(
    paginate: IMySql.IPaginateParams,
    championship_id: number
  ): Promise<IMySql.IWithPagination<IDbChampionshipTeamJoin>> {
    try {
      const response = await knex<IDbChampionshipTeamJoin>(this.table)
        .column(
          { idTime: `${this.table}.idTime` },
          { idCampeonato: `${this.table}.idCampeonato` },
          { nomeTime: `${TABLES.Time}.nome` },
          { nomeCampeonato: `${TABLES.Campeonato}.nome` },
          { imagemTime: `${TABLES.Time}.image` },
          { imagemCampeonato: `${TABLES.Campeonato}.image` },
          { idTimeVencedor: `${TABLES.Campeonato}.idTimeVencedor` }
        )
        .select()
        .where({
          [`${this.table}.idCampeonato`]: championship_id,
        })
        .innerJoin(
          TABLES.Time,
          `${this.table}.idTime`,
          '=',
          `${TABLES.Time}.idTime`
        )
        .innerJoin(
          TABLES.Campeonato,
          `${this.table}.idCampeonato`,
          '=',
          `${TABLES.Campeonato}.idCampeonato`
        )
        .paginate(paginate);
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }


  public async deleteChampionshipTeam(params: IChampionshipTeamParam): Promise<void> {
    try {
      await knex<IDbChampionshipTeam>(this.table).where({ idCampeonato: params.championship_id, idTime: params.team_id }).del();
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }
};

export default ChampionshipRepository;