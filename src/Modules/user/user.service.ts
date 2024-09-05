import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOptionsWhere, Repository } from "typeorm";
import { UserType } from "./entities/user-type.entity";
import { User } from "./entities/user.entity";
import { UpdateCourseDto } from "../course/dto/update-course.dto";
import { UpdateResult } from "typeorm";

/**
 * Clase que contiene los metodos para manipular la entidad de User y Usertype
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Metodo para crear un usuario
   * @param {CreateUserDto} createUserDto Los datos necesarios para crear un usuario
   * @returns {Promise<number>} devuelve el id del usuario creado
   */
  async create(createUserDto: CreateUserDto): Promise<number> {
    const newUser = await this.userRepository.save(createUserDto);

    return newUser.id;
  }

  /**
   * Encuentra todos los usuarios y su usertype
   * @returns {string} devuelve el tipo del usuario
   */
  findAll() {
    return this.userRepository.find({
      relations: ["userType"],
    });
  }

  /**
   *  Encuentra un usuario por su id
   * @param {FindOptionsWhere<User> | FindOptionsWhere<User>[]} where id del usuario que se quiere encontrar
   * @returns {number} devuelve el id del usuario que se quiere encontrar
   */
  findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return this.userRepository.findOne({ where });
  }

  /**
   * Encuentra un usuario por su email
   * @param {string} email email del usuario que se desea encontrar
   * @returns {Promise<User> | null} devuelve el email del usuario creado
   */
  findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  /**
   * Actializa el usuario que le pasemos por su id
   * @param {number} id id del usuario que se desea actualizar
   * @param {UpdateCourseDto} updateUserDto las propiedades que se actualizaran del usuario
   * @returns {Promise<UpdateResult>} devuelve el id del usuario que se va a actualizar y sus propiedades
   */
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  /**
   * Remueve el usuario que le especifiquemos por su id
   * @param {number} id id del usuario que se desea remover
   * @returns {boolean} devuelve un booleano diciendo si el usuario se elimino correctamente (o no)
   */
  async remove(id: number) {
    const response = await this.userRepository.delete(id);
    return response.affected > 0;
  }

  /**
   * Obtiene el tipo del usuario
   * @returns {UserType} devuelve el tipo del usuario
   */
  getUserTypes() {
    return this.userTypeRepository.find({
      relations: ["users"],
    });
  }
}
