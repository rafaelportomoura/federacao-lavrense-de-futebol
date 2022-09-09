import { ITables } from "../Interfaces/ITables";
import { IUser } from '../Interfaces/IUser'
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { DBError } from '../exceptions/DbError';

class UserRepository {

  private table: ITables;

  private table_object_name: string;

  constructor() {
    this.table = TABLES.Usuario;
    this.table_object_name = 'user';
  }

  public async getUserByEmailAndPassword(user: IUser): Promise<Array<IUser>> {
    try {
      const response = await knex<IUser>(this.table).select().where(user)
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async setToken(token: string, expiration: string, email: string): Promise<void> {
    try {
      await knex<IUser>(this.table).update({ token, expiration }).where({ email });
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async getUserByEmail(email: string): Promise<Array<IUser>> {
    try {
      const response = await knex<IUser>(this.table).select().where({ email });
      return response;
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async save(user: IUser): Promise<void> {
    try {
      await knex<IUser>(this.table).insert(user);
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }

  public async changePassword(email: string, password: string, expiration: string): Promise<void> {
    try {
      await knex<IUser>(this.table).update({ password, expiration }).where({ email });
    } catch (error) {
      throw new DBError(error, this.table_object_name);
    }
  }
};

export default UserRepository;