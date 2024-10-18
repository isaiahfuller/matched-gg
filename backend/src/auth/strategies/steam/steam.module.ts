import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SteamController } from 'src/providers/steam/steam.controller';

import { SteamService } from './steam.service';
import { SteamStrategy } from './steam.strategy';

@Module({
  controllers: [SteamController],
  exports: [SteamService],
  imports: [AuthModule],
  providers: [SteamService, SteamStrategy],
})
export class SteamModule {}
