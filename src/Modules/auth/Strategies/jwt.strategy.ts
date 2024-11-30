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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_SECRET"),
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
