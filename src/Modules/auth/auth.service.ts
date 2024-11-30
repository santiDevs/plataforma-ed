import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import {
  AuthPayloadValidateInfo,
  AuthRefreshTokenPayload,
  AuthTokenPayload,
  LoginDto,
  LoginResponseDto,
} from "./login.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthRefreshToken } from "./entities/auth-refresh-token.entity";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";

/**
 * Servicio de autenticación que maneja el registro y login de usuarios.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(AuthRefreshToken)
    private authRefreshTokenRepository: Repository<AuthRefreshToken>,
    private configService: ConfigService,
  ) {}

  /**
   * Registra un nuevo usuario, encripta su contraseña y lo autentica.
   * @param {CreateUserDto} createUser - Los datos del usuario a registrar.
   * @returns {Promise<{ user: User, token: string }>} - El usuario registrado y el token JWT generado.
   */
  async register(createUser: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    createUser = { ...createUser, password: hashPassword };

    return this.userService.create(createUser);
  }

  /**
   * Autentica un usuario basado en su email y contraseña.
   * @param {LoginDto} loginDto - Contiene el email y la contraseña del usuario.
   * @param user
   * @returns {Promise<{ user: User, token: string }>} - El usuario autenticado y el token JWT generado.
   * @throws {UnauthorizedException} - Si el email o la contraseña son incorrectos.
   */
  async login(user: User): Promise<LoginResponseDto> {
    const token = await this.generateTokenPair(user);

    return { user, ...token };
  }

  /**
   * Valida la contraseña
   * @param {string} email Email del usuario
   * @param {string} password Contraseña del usuario
   * @returns {Promise<User> | null} Usuario
   */
  async validateUser(email: string, password: string): Promise<User> | null {
    const user = await this.userService.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  //Refresh token stuff

  /**
   *
   * @param user
   * @param userInfo
   * @param currentRefreshToken
   * @param currentRefreshTokenExpiresAt
   */
  async generateRefreshToken(
    userInfo: AuthPayloadValidateInfo,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ): Promise<string> {
    const refreshPayload: AuthRefreshTokenPayload = {
      id: userInfo.id,
      email: userInfo.email,
    };

    const newRefreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
      expiresIn: "1h",
    });

    if (currentRefreshToken && currentRefreshTokenExpiresAt) {
      if (
        await this.isRefreshTokenBlackListed(currentRefreshToken, userInfo.id)
      ) {
        throw new UnauthorizedException("invalid refresh token");
      }
      await this.authRefreshTokenRepository.insert({
        token: currentRefreshToken,
        expiration: currentRefreshTokenExpiresAt,
        userId: userInfo.id,
      });
    }

    return newRefreshToken;
  }

  /**
   *
   * @param token
   * @param userId
   */
  private isRefreshTokenBlackListed(token: string, userId: number) {
    return this.authRefreshTokenRepository.existsBy({ token, userId });
  }

  /**
   *
   * @param user
   * @param userInfo
   * @param currentRefreshToken
   * @param currentRefreshTokenExpiresAt
   */
  async generateTokenPair(
    userInfo: AuthPayloadValidateInfo,
    currentRefreshToken?: string,
    currentRefreshTokenExpiresAt?: Date,
  ): Promise<Omit<LoginResponseDto, "user">> {
    const payload: AuthTokenPayload = {
      id: userInfo.id,
      email: userInfo.email,
    };
    return {
      token: this.jwtService.sign(payload),
      refresh: await this.generateRefreshToken(
        userInfo,
        currentRefreshToken,
        currentRefreshTokenExpiresAt,
      ),
    };
  }
}
