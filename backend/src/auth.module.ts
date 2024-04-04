import { Module } from '@nestjs/common';
import { SteamStrategy } from './steam.strategy';
@Module({
  providers: [SteamStrategy],
})
export class AuthModule {}