import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./Strategies/local.strategy";
import { JwtStrategy } from "./Strategies/Jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthRefreshToken } from "./entities/auth-refresh-token.entity";
import { JwtRefreshStrategy } from "./Strategies/jwt-refresh.strategy";
import { ConfigService } from "@nestjs/config";

/**
 *
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([AuthRefreshToken]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: configService.get<string>("JWT_EXPIRES_IN") },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
