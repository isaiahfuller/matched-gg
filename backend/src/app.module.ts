import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocalService } from './auth/strategies/local/local.service';
import { SteamService } from './auth/strategies/steam/steam.service';
import { GamesController } from './games.controller';
import { SteamController } from './providers/steam/steam.controller';
import { UsersService } from './users/users.service';

@Module({
  controllers: [AppController, GamesController, SteamController],
  imports: [AuthModule],
  providers: [AppService, SteamService, LocalService, UsersService, JwtService],
})
export class AppModule {}
