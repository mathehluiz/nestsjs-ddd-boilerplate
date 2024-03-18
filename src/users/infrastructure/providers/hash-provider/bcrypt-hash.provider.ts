import { HashProvider } from '@/shared/application/providers/hash-provider';
import { compare, hash } from 'bcrypt';

export class BcryptHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 6);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
