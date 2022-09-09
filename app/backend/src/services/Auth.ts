import { IUser } from '../Interfaces/IUser';
import UserRepository from '../repositories/User';
import Credentials from '../credentials/index'

class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async encryptPassword(password: string): Promise<string> {
    const credentials = await Credentials.getInstance();
    const encrypted_password = credentials.encrypt(password).toString();
    return encrypted_password;
  }

  public async decryptPassword(password: string): Promise<string> {
    const credentials = await Credentials.getInstance();
    const decrypted_password = credentials.decrypt(Buffer.from(password, 'utf-8')).toString();
    return decrypted_password;
  }

  public async getUser(): Promise<Array<IUser>> {
    const response = await this.repository.getUser();
    return response;
  }

  public async postUser(user: IUser): Promise<void> {
    user.password = await this.encryptPassword(user.password);
    await this.repository.save(user);
  }
}

export default AuthService;