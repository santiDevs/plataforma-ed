import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { SecretJWTConstant } from "src/constants/jwt-secret";

/**
 *
 */
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: SecretJWTConstant.secret,
      signOptions: { expiresIn: "30m" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
