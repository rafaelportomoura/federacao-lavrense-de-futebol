import NodeRsa from 'node-rsa';

class Cryptography {
  private public_key: NodeRsa;

  private private_key: NodeRsa;

  constructor(public_key: string, private_key: string) {
    this.public_key = new NodeRsa(public_key);
    this.private_key = new NodeRsa(private_key);
  }

  public encrypt(data: NodeRsa.Data): string {
    return this.private_key.encryptPrivate(data, 'base64');
  }

  public decrypt(data: string): string {
    return this.public_key.decryptPublic(data, 'base64');
  }

  public encryptBuffer(buffer: NodeRsa.Data): Buffer {
    return this.private_key.encryptPrivate(buffer, 'buffer');
  }

  public decryptBuffer(buffer: Buffer): Buffer {
    return this.public_key.decryptPublic(buffer, 'buffer');
  }
}

export default Cryptography;