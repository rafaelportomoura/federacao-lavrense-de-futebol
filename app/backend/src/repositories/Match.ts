import { IDbMatch, IPostMatch, IPutMatch } from "../Interfaces/IMatch";
import { ITables } from "../Interfaces/ITables";
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';

class MatchRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.Partida;
    this.table_object_name = 'match';
  }

  public async save(match: IPostMatch): Promise<void> {
    try {
      await knex<IDbMatch>(this.table).insert(match);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getOneMatch(id: number): Promise<IDbMatch> {
    try {
      const response = await knex<IDbMatch>(this.table)
        .select()
        .where({ idPartida: id })
        .first()

      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async putMatch(id: number, match: IPutMatch): Promise<void> {
    try {
      await knex<IDbMatch>(this.table).where({ idPartida: id }).update(match);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async deleteMatch(id: number): Promise<void> {
    try {
      await knex<IDbMatch>(this.table).where({ idPartida: id }).del();
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }
};

export default MatchRepository;