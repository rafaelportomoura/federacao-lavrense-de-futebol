import { uuid } from 'uuidv4'
import { ITables } from "../Interfaces/ITables";
import knex from '../database/index';
import { TABLES } from '../config/Tables';
import { IUserHistory } from "../Interfaces/IUserHistory";

class UserHistory {

  private table: ITables;

  constructor() {
    this.table = TABLES.AtividadeDoUsuario;
  }

  public async saveHistory(body: IUserHistory): Promise<void> {
    body.idAtividadeDoUsuario = uuid();
    body.timestamp = new Date();
    await knex<IUserHistory>(this.table).insert(body);
  }
}

export default UserHistory;