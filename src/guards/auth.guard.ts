import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Request } from "express";
import { SecretJWTConstant } from "src/constants/jwt-secret";

/**
 * Guarda de autenticación que verifica el JWT en las solicitudes entrantes.
 * Se asegura de que el token JWT sea válido y de que el usuario esté autenticado.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Método principal que se ejecuta para determinar si se permite o no el acceso a una ruta.
   * @param {ExecutionContext} context - El contexto de ejecución que contiene la solicitud actual.
   * @returns {boolean | Promise<boolean> | Observable<boolean>} - Un valor booleano o una promesa que indica si se permite el acceso.
   * @throws {UnauthorizedException} - Si no se proporciona un token válido o si el token es inválido.
   */
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException("una");

    try {
      const payload = this.jwtService.verify(token, {
        secret: SecretJWTConstant.secret,
      });

      request["user"] = payload;
    } catch {
      throw new UnauthorizedException("uno");
    }

    return true;
  }

  /**
   * Extrae el token JWT del encabezado de autorización de la solicitud.
   * @param {Request} request - La solicitud HTTP.
   * @returns {string | undefined} - El token JWT si está presente, o `undefined` si no lo está.
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
