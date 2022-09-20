import { ITables } from "../Interfaces/ITables";
import { ITeam, IDbTeam, IGetTeams } from '../Interfaces/ITeam'
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';
import IMySQL from '../Interfaces/IMySql';

class TeamRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.Time;
    this.table_object_name = 'team';
  }

  public async save(team: ITeam): Promise<void> {
    try {
      await knex<IDbTeam>(this.table).insert(team);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getOne(id: number): Promise<IDbTeam> {
    try {
      const response = await knex<IDbTeam>(this.table).select().where({ idTime: id }).first();
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getTeams(paginate: IMySQL.IPaginateParams): Promise<IMySQL.IWithPagination<IDbTeam>> {
    try {
      const response = await knex<IDbTeam>(this.table).paginate(paginate);
      return response as unknown as IMySQL.IWithPagination<IDbTeam>;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getTeamsFilterByName(paginate: IMySQL.IPaginateParams, name: string): Promise<IMySQL.IWithPagination<IDbTeam>> {
    try {
      const response = await knex<IDbTeam>(this.table).whereILike('nome', `%${name}%`).paginate(paginate);
      return response as unknown as IMySQL.IWithPagination<IDbTeam>;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getTeamsFromCamp(paginate: IMySQL.IPaginateParams, id_camp: number): Promise<IMySQL.IWithPagination<IDbTeam>> {
    try {
      const response = await knex<IDbTeam>(this.table)
        .select(`${this.table}.idTime`, `${this.table}.nome`, `${this.table}.image`)
        .join(TABLES.CampeonatoTime, `${this.table}.idTime`, `${TABLES.CampeonatoTime}.idTime`)
        .where({ idCampeonato: id_camp })
        .paginate(paginate);
      return response as unknown as IMySQL.IWithPagination<IDbTeam>;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getTeamsFromCampFilterByName(paginate: IMySQL.IPaginateParams, param: IGetTeams): Promise<IMySQL.IWithPagination<IDbTeam>> {
    try {
      const response = await knex<IDbTeam>(this.table)
        .select(`${this.table}.idTime`, `${this.table}.nome`, `${this.table}.image`)
        .join(TABLES.CampeonatoTime, `${this.table}.idTime`, `${TABLES.CampeonatoTime}.idTime`)
        .where({ idCampeonato: param.id_camp })
        .whereILike('nome', `%${param.nome}%`)
        .paginate(paginate);
      return response as unknown as IMySQL.IWithPagination<IDbTeam>;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async updateTeamName(id: number, name: string): Promise<void> {
    try {
      await knex<IDbTeam>(this.table).select().update({ nome: name }).where({ idTime: id })
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async deleteTeam(id: number): Promise<void> {
    try {
      await knex<IDbTeam>(this.table).where({ idTime: id }).del();
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }
};

export default TeamRepository;