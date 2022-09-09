import { IUser } from '../Interfaces/IUser';
import UserRepository from '../repositories/User';

class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async getUser(): Promise<Array<IUser>> {
    const response = await this.repository.getUser();
    return response;
  }

}

export default AuthService;