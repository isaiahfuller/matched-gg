import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './strategies/local/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/local/refreshToken.strategy';

@Module({
  exports: [PassportModule, AuthService, UsersService],
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    SessionSerializer,
    UsersService,
    JwtStrategy,
    RefreshTokenStrategy,
    AuthService,
  ],
})
export class AuthModule {}
