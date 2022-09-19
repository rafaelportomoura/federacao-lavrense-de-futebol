import { ICodeMessage } from '../Interfaces/ICodeMessage';
import { IUser, IUserLoginReturn } from '../Interfaces/IUser';
import UserRepository from '../repositories/User';
import Credentials from '../credentials/index'
import ApiError from '../exceptions/ApiError';
import { CODE_MESSAGES } from '../config/CodeMessages';

class AuthService {
  private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async encrypt(data: string): Promise<string> {
    const credentials = await Credentials.getInstance();
    const encrypted_data = credentials.encrypt(data);
    return encrypted_data;
  }

  public async decrypt(data: string): Promise<JSON> {
    const credentials = await Credentials.getInstance();
    const decrypted_data = credentials.decrypt(data);
    return decrypted_data;
  }

  public async login(user: IUser): Promise<IUserLoginReturn> {
    user.password = await this.encrypt(user.password);

    const user_login = await this.repository.getUserByEmailAndPassword(user);

    if (!user_login.length) {
      throw new ApiError.BusinessError(CODE_MESSAGES.INVALID_LOGIN as ICodeMessage)
    }

    const token = await this.encrypt(JSON.stringify(user));
    const expiration = new Date(Date.now() + 1 * 60000).toISOString();

    await this.repository.setToken(token, expiration, user.email);

    return { token, expiration };
  }

  public async getUser(email: string): Promise<Array<IUser>> {
    const response = await this.repository.getUserByEmail(email);
    return response;
  }

  public async postUser(user: IUser): Promise<void> {
    user.password = await this.encrypt(user.password);
    await this.repository.save(user);
  }

  public async validLoginToken(token: string): Promise<string> {
    const decrypted_token = await this.decrypt(token);

    const { email } = JSON.parse(JSON.stringify(decrypted_token))

    const [user] = await this.repository.getUserByEmail(email);

    if (user.expiration < new Date().toISOString()) {
      throw new ApiError.UnauthorizedError(CODE_MESSAGES.UNAUTHORIZED as ICodeMessage);
    }

    if (token !== user.token) {
      throw new ApiError.UnauthorizedError(CODE_MESSAGES.UNAUTHORIZED as ICodeMessage);
    }

    return email;
  }

  public async changePassword(email: string, new_password: string): Promise<void> {
    const password = await this.encrypt(new_password);
    await this.repository.changePassword(email, password, new Date(Date.now() + 1 * 60000).toISOString());
  }
}

export default AuthService;