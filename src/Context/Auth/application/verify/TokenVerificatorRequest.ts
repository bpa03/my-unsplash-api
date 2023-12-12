import { type JwtToken } from '../../domain/JwtToken';

export interface TokenVerificatorRequest {
  jwtToken: JwtToken
}
