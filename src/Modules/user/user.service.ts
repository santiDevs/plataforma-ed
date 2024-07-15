import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './entities/user-type.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.save(createUserDto)

    return newUser.id;
  }

  findAll() {
    return this.userRepository.find({
      relations: ['userType'],
    })
  }

  findOne(id: number) {
    return this.userRepository.findOne({where: {id : id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto)
  }

  async remove(id: number) {
    const response = await this.userRepository.delete(id)
    return response.affected > 0
  }

  getUserTypes() {
    return this.userTypeRepository.find({
      relations: ['users']
    })
  }
}
