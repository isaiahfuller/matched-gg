import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { GamesController } from './games.controller';
import { SteamController } from './providers/steam/steam.controller';

@Module({
  controllers: [AppController, GamesController, SteamController],
  imports: [AuthModule],
  providers: [AppService, AuthService],
})
export class AppModule {}
