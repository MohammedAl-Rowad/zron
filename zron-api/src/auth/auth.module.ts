import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { User } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
