import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocalModule } from './auth/strategies/local/local.module';
import { SteamModule } from './auth/strategies/steam/steam.module';
import { GamesController } from './games.controller';
import { LocalController } from './providers/local/local.controller';
import { SteamController } from './providers/steam/steam.controller';
import { UsersService } from './users/users.service';

@Module({
  controllers: [
    AppController,
    GamesController,
    SteamController,
    LocalController,
  ],
  imports: [AuthModule, SteamModule, LocalModule],
  providers: [AppService, UsersService],
})
export class AppModule {}
