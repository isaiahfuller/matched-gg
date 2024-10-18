import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SteamModule } from './auth/strategies/steam/steam.module';
import { GamesController } from './games.controller';
import { SteamController } from './providers/steam/steam.controller';
import { UsersService } from './users/users.service';

@Module({
  controllers: [AppController, GamesController, SteamController],
  imports: [AuthModule, SteamModule],
  providers: [AppService, UsersService],
})
export class AppModule {}
