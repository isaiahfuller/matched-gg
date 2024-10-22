import { config } from '@config/config';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Req,
  Res,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import SteamHandler from 'src/infrastructure/steam/handlers/steamHandler';
import { UsersService } from 'src/users/users.service';

import { SteamService } from '../../auth/strategies/steam/steam.service';
import { SteamAuthResponse } from './types';

@Controller('steam')
export class SteamController {
  private logger = new Logger(SteamController.name);
  private steamHandler = new SteamHandler(config);
  constructor(
    private readonly steamService: SteamService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('gameAchievements')
  async achivements(@Session() session, @Req() req, @Res() res) {
    const achivements = await this.steamHandler.getGameAchievements(
      session.providers.steam.steamid,
      req.body.appid,
    );
    res.send(achivements);
    return achivements;
  }

  @UseGuards(AuthGuard('steam'))
  @Get('auth') // TODO: Change to Post when front-end is implemented
  @HttpCode(HttpStatus.OK)
  /**
   * @remarks this is never called due to the authguard sending user to the return route
   */
  login() {}

  @Get('getOwnedGames')
  async ownedGames(@Session() session, @Res() res) {
    const games = await this.steamHandler.getOwnedGames(
      session.providers.steam.steamid,
    );
    res.send(games.games);
    return games;
  }

  @UseGuards(AuthGuard('steam'))
  @Get('auth/return')
  async return(@Session() session, @Req() req: SteamAuthResponse, @Res() res) {
    if (!('providers' in session)) session.providers = {};
    try {
      const user = await this.usersService.findBySteamId(req.user.id);
      if (!user) throw new UnauthorizedException('Steam account not linked');
      session.providers.steam = req.user._json;
    } catch (e) {
      session.providers.steam = { error: 'Steam account not linked' };
    } finally {
      // TODO: Stop hardcoding the redirect URL
      res.redirect('http://localhost:5173/');
    }
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
