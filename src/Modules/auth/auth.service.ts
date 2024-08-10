import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./login.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";

/**
 * Servicio de autenticación que maneja el registro y login de usuarios.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Registra un nuevo usuario, encripta su contraseña y lo autentica.
   * @param {CreateUserDto} createUser - Los datos del usuario a registrar.
   * @returns {Promise<{ user: User, token: string }>} - El usuario registrado y el token JWT generado.
   */
  async register(createUser: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    const decrypPassword = createUser.password;
    createUser = { ...createUser, password: hashPassword };

    return this.userService.create(createUser).then(() => {
      return this.login({
        email: createUser.email,
        password: decrypPassword,
      });
    });
  }

  /**
   * Autentica un usuario basado en su email y contraseña.
   * @param {LoginDto} loginDto - Contiene el email y la contraseña del usuario.
   * @returns {Promise<{ user: User, token: string }>} - El usuario autenticado y el token JWT generado.
   * @throws {UnauthorizedException} - Si el email o la contraseña son incorrectos.
   */
  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("email is wrong");
    }

    const isvalidPassword = await bcrypt.compare(password, user.password);

    if (!isvalidPassword) {
      throw new UnauthorizedException("password is wrong");
    }

    const playload = {
      email: user.email,
      role: user.userType,
    };

    const token = await this.jwtService.signAsync(playload);

    return { user, token };
  }
}
