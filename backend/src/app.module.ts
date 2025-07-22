import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LocalController } from './auth/providers/local/local.controller';
import { SteamController } from './auth/providers/steam/steam.controller';
import { LocalModule } from './auth/strategies/local/local.module';
import { SteamModule } from './auth/strategies/steam/steam.module';
import { GamesController } from './games.controller';
import { GameService } from './games.service';
import { UsersService } from './users/users.service';

@Module({
  controllers: [
    AppController,
    GamesController,
    SteamController,
    LocalController,
  ],
  imports: [AuthModule, SteamModule, LocalModule],
  providers: [UsersService, GameService],
})
export class AppModule {}
