import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './games.controller';
import { AuthModule } from './auth/auth.module';
import { SteamController } from './providers/steam/steam.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, GamesController, SteamController],
  providers: [AppService, AuthService],
})
export class AppModule {}
