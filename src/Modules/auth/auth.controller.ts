import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { LoginDto } from "./login.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { User } from "../user/entities/user.entity";
import { AuthInterceptor } from "../interceptors/auth.interceptor.ts/auth-interceptor.interceptor";

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
   * @returns {Promise<{ user: User, token: string }>} - El usuario autenticado y el token JWT generado.
   */
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(AuthInterceptor)
  @Post("login")
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}
