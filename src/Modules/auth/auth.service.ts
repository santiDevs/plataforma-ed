import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { LoginDto } from "./login.dto";
import { CreateUserDto } from "../user/dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUser: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUser.password, 10);
    createUser = { ...createUser, password: hashPassword };

    return this.userService.create(createUser);
  }

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
