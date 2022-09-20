import { IPostGoal, IGetGoal, IGoalId, IGoal } from "../Interfaces/IGoal";
import { ITables } from "../Interfaces/ITables";
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';

class GolRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.Gol;
    this.table_object_name = 'match_team';
  }

  public async save(match: IPostGoal): Promise<void> {
    try {
      await knex<IPostGoal>(this.table).insert(match);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getGoals(params: IGetGoal): Promise<Array<IGoalId>> {
    try {
      const response = await knex<IGoalId>(this.table)
        .column(
          { idGol: `${this.table}.idGol` }
        )
        .select()
        .where(params)
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getGoal(id: number): Promise<IGoal> {
    try {
      const response = await knex<IGoal>(this.table)
        .select()
        .where({ idGol: id })
        .first()
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async deleteGoal(id: number): Promise<void> {
    try {
      await knex<IGoal>(this.table).where({ idGol: id }).del();
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }
};

export default GolRepository;