import path from 'path';
import * as jose from 'jose';
import { readFile } from 'fs/promises';
import { JwtToken } from '../domain/JwtToken';
import { Token } from '../domain/Token';
import { type TokenAuthenticator } from '../domain/TokenAuthenticator';
import { JwtTokenIsInvaid } from '../domain/JwtTokenIsInvalid';
import { type UserEmail } from '../../Users/domain/UserEmail';

export class TokenAuthenticatorProvider implements TokenAuthenticator {
  async verify (token: JwtToken): Promise<void> {
    const alg = 'RS256';
    const publicKeyFile = path.join(process.cwd(), 'publickey.crt');
    const publicKey = (await readFile(publicKeyFile)).toString();

    try {
      const key = await jose.importSPKI(publicKey, alg);
      await jose.jwtVerify(token.value, key);
    } catch (error) {
      if (error instanceof jose.errors.JWSInvalid) {
        throw new JwtTokenIsInvaid('token expired or is invalid');
      }
    }
  };

  async create ({ userEmail, payload }: { userEmail: UserEmail, payload: unknown }): Promise<Token> {
    const alg = 'RS256';
    const pkcs8File = path.join(process.cwd(), 'pkcs8.key');
    const pkcs8 = (await readFile(pkcs8File)).toString();

    const privateKey = await jose.importPKCS8(pkcs8, alg);
    const jwt: string = await new jose.SignJWT({ payload }).setProtectedHeader({ alg }).sign(privateKey);

    const token = new Token({ email: userEmail, token: new JwtToken(jwt) });
    return token;
  };
}
