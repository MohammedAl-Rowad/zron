import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { compare } from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { UserTransformer } from '../users/user.transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (user && (await compare(pass, user.password))) {
      const { password, ...res } = user;
      return res;
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = new UserTransformer(user);
    return {
      access_toekn: this.jwtService.sign(classToPlain(payload)),
    };
  }
}
