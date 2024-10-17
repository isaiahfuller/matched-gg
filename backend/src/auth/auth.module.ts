import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

import { JwtStrategy } from './jwt.strategy';
import { SessionSerializer } from './session.serializer';
import { LocalService } from './strategies/local/local.service';
import { LocalStrategy } from './strategies/local/local.strategy';
import { SteamService } from './strategies/steam/steam.service';
import { SteamStrategy } from './strategies/steam/steam.strategy';

@Module({
  exports: [PassportModule],
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    SteamService,
    SteamStrategy,
    SessionSerializer,
    LocalStrategy,
    LocalService,
    UsersService,
    JwtStrategy,
  ],
})
export class AuthModule {}
