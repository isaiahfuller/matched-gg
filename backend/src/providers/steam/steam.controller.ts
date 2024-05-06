import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../auth/auth.service';
import { SteamAuthResponse } from './types';
import SteamHandler from 'src/infrastructure/steam/handlers/steamHandler';
import { config } from '@config/config';

@Controller('steam')
export class SteamController {
  private logger = new Logger(SteamController.name);
  private steamHandler = new SteamHandler(config);
  constructor(private readonly authService: AuthService) {}

  @Get('auth') // TODO: Change to Post when front-end is implemented
  @UseGuards(AuthGuard('steam'))
  @HttpCode(HttpStatus.OK)
  /**
   * @remarks this is never called due to the authguard sending user to the return route
   */
  login() {}

  @Get('auth/return')
  @UseGuards(AuthGuard('steam'))
  async return(@Session() session, @Req() req: SteamAuthResponse, @Res() res) {
    if (!('providers' in session)) session.providers = {};
    session.providers.steam = req.user._json;
    // TODO: Stop hardcoding the redirect URL
    res.redirect('http://localhost:5173/');
    return;
  }

  @Post('gameAchievements')
  async achivements(@Session() session, @Req() req, @Res() res) {
    const achivements = await this.steamHandler.getGameAchievements(
      session.providers.steam.steamid,
      req.body.appid,
    );
    res.send(achivements);
    return achivements;
  }
  @Get('getOwnedGames')
  async ownedGames(@Session() session, @Res() res) {
    const games = await this.steamHandler.getOwnedGames(
      session.providers.steam.steamid,
    );
    res.send(games.games);
    return games;
  }

  @Post('valid')
  async validate(@Session() session, @Res() res) {
    if (!('providers' in session) || !('steam' in session.providers)) {
      res.status(401).send({ error: 'Steam not logged in.' });
      return session;
    }
    res.send(session.providers.steam);
    return session;
  }
}
