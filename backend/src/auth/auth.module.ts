import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './strategies/local/jwt.strategy';
import { LocalService } from './strategies/local/local.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { RefreshTokenStrategy } from './strategies/local/refreshToken.strategy';

@Module({
  exports: [PassportModule, AuthService, LocalService],
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    SessionSerializer,
    LocalStrategy,
    LocalService,
    UsersService,
    JwtStrategy,
    RefreshTokenStrategy,
    AuthService,
  ],
})
export class AuthModule {}
