import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthPayloadValidate, AuthTokenPayload } from "../login.dto";
import { ConfigService } from "@nestjs/config";

/**
 *
 */
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh",
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtRefreshStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_REFRESH_SECRET"),
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
    return {
      info: {
        id: payload.id,
        email: payload.email,
      },
      expiration: new Date(payload.exp * 1000),
    };
  }
}
