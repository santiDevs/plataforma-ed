import { OmitType } from "@nestjs/mapped-types";
import { User } from "../entities/user.entity";

/**
 * Dto de la creacion del usuario
 */
export class CreateUserDto extends OmitType(User, [
  "createdDay",
  "updatedDay",
  "birthDay",
  "direccion",
]) {}
