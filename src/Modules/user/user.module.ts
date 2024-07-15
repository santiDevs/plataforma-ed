import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserType } from './entities/user-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType])],

  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}