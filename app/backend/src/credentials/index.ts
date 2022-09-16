/* eslint-disable no-use-before-define */
import { promises as fs } from 'fs';
import Cryptography from '../Libs/Cryptography';


class Credentials {
  private static credentials_instance: Credentials;

  private cryptography: Cryptography;


  private constructor(private_key: string, public_key: string) {
    this.cryptography = new Cryptography(public_key, private_key);
  }

  static async getInstance() {
    if (!Credentials.credentials_instance) Credentials.credentials_instance = new Credentials(await fs.readFile('/home/node/.ssh/id_rsa', 'utf-8'), await fs.readFile('/home/node/.ssh/id_rsa.pub', 'utf-8'));


    return Credentials.credentials_instance;
  }

  public encrypt(data: string): string {
    return this.cryptography.encrypt(data);
  }

  public decrypt(data: string): JSON {
    return this.cryptography.decrypt(data);
  }
}

export default Credentials;
