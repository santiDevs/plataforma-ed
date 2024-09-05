import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { SecretJWTConstant } from "src/constants/jwt-secret";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./Strategies/local.strategy";
import { JwtStrategy } from "./Strategies/Jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRefreshToken } from "./entities/auth-refresh-token.entity";
import { JwtRefreshStrategy } from "./Strategies/jwt-refresh.strategy";

/**
 *
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRefreshToken]),
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: SecretJWTConstant.secret,
      signOptions: { expiresIn: "1m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
