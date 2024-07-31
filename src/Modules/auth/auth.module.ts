import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: "cualquierCosa",
      signOptions: { expiresIn: "30s" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
