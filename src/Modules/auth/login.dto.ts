import { User } from "../user/entities/user.entity";

/**
 *
 */
export class LoginDto {
  email: string;
  password: string;
}

/**
 *
 */
export class AuthTokenPayload {
  email: string;
  id: number;
  exp?: number;
}

/**
 *
 */
export class LoginResponseDto {
  user: User;
  token: string;
  refresh: string;
}

/**
 *
 */
export class AuthRefreshTokenPayload extends AuthTokenPayload {
  expiration?: number;
}

// eslint-disable-next-line jsdoc/require-jsdoc
export class AuthPayloadValidate {
  info: AuthPayloadValidateInfo;
  expiration?: Date;
}

/**
 *
 */
export class AuthPayloadValidateInfo {
  id: number;
  email: string;
}
