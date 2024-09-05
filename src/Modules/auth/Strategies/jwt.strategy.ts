import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { SecretJWTConstant } from "src/constants/jwt-secret";
import { AuthPayloadValidate, AuthTokenPayload } from "../login.dto";

/**
 *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: SecretJWTConstant.secret,
    });
  }

  /**
   *
   * @param {Request} req Peticion
   * @returns {string | null} el token
   */
  private static extractJWT(req: Request): string | null {
    if (req.cookies && "token" in req.cookies && req.cookies.token.length > 0) {
      return req.cookies.token;
    }

    return null;
  }

  /**
   *
   * @param {AuthTokenPayload} payload payload del token
   * @returns {Promise<any>} Datos del usuario
   */
  async validate(payload: AuthTokenPayload): Promise<AuthPayloadValidate> {
    return { info: { id: payload.id, email: payload.email } };
  }
}
