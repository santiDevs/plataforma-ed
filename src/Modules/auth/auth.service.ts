import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  register() {
    return "register";
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("email is wrong");
    }

    if (password != user.password) {
      throw new UnauthorizedException("password is wrong");
    }

    return user;
  }
}
