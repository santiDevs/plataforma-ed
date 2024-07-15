import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export type UpdateUserDto = Partial<CreateUserDto>
