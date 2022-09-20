import { IPostChampionship, IDbChampionship, IChampionTeam } from "../Interfaces/Championship";
import { ITables } from "../Interfaces/ITables";
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';
import IMySQL from '../Interfaces/IMySql';

class ChampionshipRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.Campeonato;
    this.table_object_name = 'championship';
  }

  public async save(championship: IPostChampionship): Promise<void> {
    try {
      await knex<IDbChampionship>(this.table).insert(championship);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getOneChampionship(id: number): Promise<IDbChampionship> {
    try {
      const response = await knex<IDbChampionship>(this.table).select().where({ idCampeonato: id }).first();
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async putChampionship(id: number, name: string): Promise<void> {
    try {
      await knex<IDbChampionship>(this.table).update({ nome: name }).where({ idCampeonato: id });
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async deleteChampionship(id: number): Promise<void> {
    try {
      await knex<IDbChampionship>(this.table).where({ idCampeonato: id }).del();
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getChampionships(paginate: IMySQL.IPaginateParams): Promise<IMySQL.IWithPagination<IDbChampionship>> {
    try {
      const response = await knex<IDbChampionship>(this.table).paginate(paginate);
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getChampionshipsByTeam(paginate: IMySQL.IPaginateParams, id_team: number): Promise<IMySQL.IWithPagination<IDbChampionship>> {

    try {
      const response = await knex<IDbChampionship>(this.table).select(
        `${this.table}.idCampeonato`,
        `${this.table}.idTimeVencedor`,
        `${this.table}.nome`,
        `${this.table}.image`
      ).join(
        TABLES.CampeonatoTime,
        `${this.table}.idCampeonato`,
        '=',
        `${TABLES.CampeonatoTime}.idCampeonato`
      ).where({ idTime: id_team }).paginate(paginate);
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getChampionshipByName(paginate: IMySQL.IPaginateParams, name: string): Promise<IMySQL.IWithPagination<IDbChampionship>> {
    try {
      const response = await knex<IDbChampionship>(this.table)
        .whereILike('nome', `%${name}%`)
        .paginate(paginate);
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getChampionshipFromTeamFilterByName(
    paginate: IMySQL.IPaginateParams,
    id_team: number,
    name: string
  ): Promise<IMySQL.IWithPagination<IDbChampionship>> {
    try {
      const response = await knex<IDbChampionship>(this.table)
        .select(
          `${this.table}.idCampeonato`,
          `${this.table}.idTimeVencedor`,
          `${this.table}.nome`,
          `${this.table}.image`
        )
        .join(
          TABLES.CampeonatoTime,
          `${this.table}.idCampeonato`,
          '=',
          `${TABLES.CampeonatoTime}.idCampeonato`
        )
        .where({ idTime: id_team })
        .whereILike('nome', `%${name}%`)
        .paginate(paginate);
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async addChampionTeam(params: IChampionTeam): Promise<void> {
    try {
      await knex<IDbChampionship>(this.table)
        .where({ idCampeonato: params.championship_id })
        .update({ idTimeVencedor: params.team_id });
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

};

export default ChampionshipRepository;