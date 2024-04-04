import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesController } from './games.controller';
import { AuthModule } from './auth.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController, GamesController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {}
