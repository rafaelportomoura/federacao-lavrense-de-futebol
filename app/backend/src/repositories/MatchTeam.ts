import { IMatchTeam, IMatchTeamComplete } from "../Interfaces/IMatchTeam";
import { ITables } from "../Interfaces/ITables";
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';

class MatchTeamRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.PartidaTime;
    this.table_object_name = 'match_team';
  }

  public async save(match: IMatchTeam): Promise<void> {
    try {
      await knex<IMatchTeam>(this.table).insert(match);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }


  public async getOneMatch(id: number): Promise<Array<IMatchTeamComplete>> {
    try {
      const response = await knex<IMatchTeamComplete>(this.table)
        .column(
          { idTime: `${this.table}.idTime` },
          { nome: `${TABLES.Time}.nome` },
          { image: `${TABLES.Time}.image` }
        )
        .join(
          TABLES.Time,
          `${TABLES.Time}.idTime`,
          '=',
          `${this.table}.idTime`
        )
        .select()
        .where({ idPartida: id })
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

};

export default MatchTeamRepository;