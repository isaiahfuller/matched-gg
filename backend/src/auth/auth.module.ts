import { Module } from '@nestjs/common';
import { SteamStrategy } from './strategies/steam.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SessionSerializer } from './session.serializer';
@Module({
  exports: [PassportModule],
  imports: [PassportModule.register({ session: true })],
  providers: [AuthService, SteamStrategy, SessionSerializer],
})
export class AuthModule {}
