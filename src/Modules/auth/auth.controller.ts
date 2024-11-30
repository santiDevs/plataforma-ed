import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto, LoginResponseDto } from "./login.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { AuthInterceptor } from "../interceptors/auth.interceptor.ts/auth-interceptor.interceptor";
import { LocalAuthGuard } from "src/guards/local-auth.guard";
import { Request as ExpressRequest } from "express";
import { JwtRefreshGuard } from "src/guards/jwt-refresh.guard";

/**
 * Controlador para manejar las rutas de autenticación.
 * Proporciona endpoints para el registro y login de usuarios.
 */
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint para registrar un nuevo usuario.
   * Utiliza el DTO `CreateUserDto` para validar y transferir los datos de la solicitud.
   * Aplica `ClassSerializerInterceptor` para serializar la respuesta.
   * @param {CreateUserDto} createUserDto - Los datos necesarios para crear un usuario.
   * @returns {Promise<{ user: User; token: string; }>} - El usuario registrado y el token JWT generado.
   */
  @Post("register")
  @UseInterceptors(ClassSerializerInterceptor)
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  /**
   * Endpoint para autenticar a un usuario.
   * Utiliza el DTO `LoginDto` para validar y transferir los datos de la solicitud.
   * Aplica `ClassSerializerInterceptor` para serializar la respuesta.
   * @param {LoginDto} loginDto - Los datos necesarios para autenticar a un usuario (email y contraseña).
   * @param request
   * @returns {Promise<{ user: User, token: string }>} - El usuario autenticado y el token JWT generado.
   */
  @Post("login")
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  @UseGuards(LocalAuthGuard)
  login(@Request() request: Request) {
    return this.authService.login(request["user"]);
  }

  /**
   *
   * @param req
   */
  @Post("refresh-token")
  @UseGuards(JwtRefreshGuard)
  @UseInterceptors(AuthInterceptor)
  refreshToken(
    @Request() req: ExpressRequest, // Aquí ya está el tipo correcto
  ): Promise<Omit<LoginResponseDto, "user">> {
    if (!req["user"]) {
      throw new UnauthorizedException();
    }
    return this.authService.generateTokenPair(
      req.user["info"],
      req.cookies["refresh"],
      req.user["expiration"],
    );
  }

  /**
   *
   * @param req
   */
  @Post("logout")
  logout(@Req() req: ExpressRequest): void {
    req.res.clearCookie("token");
    req.res.clearCookie("refresh");
  }
}
