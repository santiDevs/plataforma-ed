import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { FindOptionsWhere, UpdateResult } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./user.service";

/**
 * Controlador que contiene los metodos de usuarios
 */
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Crea un usuario
   * @param {CreateUserDto} createUserDto los datos del usuario
   * @returns {Promise<number>} devuelve el usuario creado
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * Encuentra todos los usuarios
   * @returns {Promise<User[]>} devuelve un array con todos los usuarios
   */
  @Get("users")
  findAll() {
    return this.userService.findAll();
  }

  /**
   *
   * @param {FindOptionsWhere<User> | FindOptionsWhere<User>[]} where el id del usuario que se desea encontrar
   * @param id
   * @returns {Promise<User>} devuelve el usuario
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.userService.findOne({ id: +id });
  }

  /**
   * Actualiza un usuario
   * @param {string} id el id del usuario
   * @param {UpdateUserDto} updateUserDto propiedades del usuario
   * @returns {Promise<UpdateResult>} devuelve el resultado de la actualizaacion
   */
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  /**
   * elimina un usuario
   * @param {string} id id del usuario que se desea remover
   * @returns {Promise<UpdateResult>} devuelve el usuario eliminado
   */
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.userService.remove(+id);
  }
}
