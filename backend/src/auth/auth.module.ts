import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
import { SteamStrategy } from './strategies/steam.strategy';
@Module({
  exports: [PassportModule],
  imports: [PassportModule.register({ session: true })],
  providers: [AuthService, SteamStrategy, SessionSerializer],
})
export class AuthModule {}
