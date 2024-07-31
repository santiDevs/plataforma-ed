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

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}
