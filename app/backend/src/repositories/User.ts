import { ITables } from "../Interfaces/ITables";
import { IUser } from '../Interfaces/IUser'
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';

class UserRepository {

  private table: ITables;

  constructor() {
    this.table = TABLES.Usuario;
  }

  public async getUser(): Promise<Array<IUser>> {
    const response = await knex<IUser>(this.table).select()
    return response;
  }

  public async save(user: IUser): Promise<void> {
    try {
      await knex<IUser>(this.table).insert(user);
    } catch (error) {
      throw new DBError(error, 'user');
    }
  }
};

export default UserRepository;