import { ITables } from "../Interfaces/ITables";
import { IUser } from '../Interfaces/IUser'
import knex from '../database/index';
import { TABLES } from '../config/Tables';


class UserRepository {

  private table: ITables;

  constructor() {
    this.table = TABLES.Usuario;
  }

  public async getUser(): Promise<Array<IUser>> {
    const response = await knex<IUser>(this.table).select()
    return response;
  }
};

export default UserRepository;