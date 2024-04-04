import { Module } from '@nestjs/common';
import { SteamStrategy } from './steam.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
@Module({
  imports: [PassportModule],
  providers: [AuthService, SteamStrategy],
})
export class AuthModule {}
