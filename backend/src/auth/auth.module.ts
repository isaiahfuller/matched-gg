import { Module } from '@nestjs/common';
import { SteamStrategy } from './strategies/steam.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [AuthService, SteamStrategy, SessionSerializer],
  exports: [PassportModule],
})
export class AuthModule {}
