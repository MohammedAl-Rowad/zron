import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './createuser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserTransformer } from './user.transformer';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const userInstance: User = await this.usersRepository.save<Partial<User>>({
      ...createUserDto,
      password: hash,
    });
    return new UserTransformer(userInstance);
  }
}
