import { ICodeMessage } from '../Interfaces/ICodeMessage';
import { IUser } from '../Interfaces/IUser';
import UserRepository from '../repositories/User';
import Credentials from '../credentials/index'
import ApiError from '../exceptions/ApiError';
import CODE_MESSAGE from '../config/CodeMessages'

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

  public async login(user: IUser): Promise<void> {
    user.password = await this.encryptPassword(user.password);
    const user_login = await this.repository.geUserByEmailAndPassword(user);
    console.log(user_login);
    if (!user_login.length) {
      throw new ApiError.BusinessError(CODE_MESSAGE.INVALID_LOGIN as ICodeMessage)
    }
  }

  public async getUser(email: string): Promise<Array<IUser>> {
    const response = await this.repository.getUserByEmail(email);
    return response;
  }

  public async postUser(user: IUser): Promise<void> {
    user.password = await this.encryptPassword(user.password);
    await this.repository.save(user);
  }
}

export default AuthService;