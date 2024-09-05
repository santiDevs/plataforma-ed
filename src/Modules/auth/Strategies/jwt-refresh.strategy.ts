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
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: SecretJWTConstant.secret,
    });
  }

  /**
   *
   * @param {Request} req Peticion
   * @returns {string | null} el refresh token
   */
  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      "refresh" in req.cookies &&
      req.cookies.refresh.length > 0
    ) {
      return req.cookies.refresh;
    }

    return null;
  }

  /**
   *
   * @param {AuthTokenPayload} payload payload del refresh token
   * @returns {Promise<any>} Datos del usuario
   */
  async validate(payload: AuthTokenPayload): Promise<AuthPayloadValidate> {
    return { info: { id: payload.id, email: payload.email } };
    new Date(payload.exp * 1000);
  }
}
