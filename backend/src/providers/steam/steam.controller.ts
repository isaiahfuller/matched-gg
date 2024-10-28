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
  async ownedGames(@Session() session) {
    if (!session.providers || !session.providers.steam) {
      throw new UnauthorizedException('No Steam account linked');
    }
    const games = await this.steamHandler.getOwnedGames(
      session.providers.steam.steamid,
    );
    return games.games;
  }

  @UseGuards(AuthGuard('steam'))
  @Get('auth/return')
  async return(@Session() session, @Req() req: SteamAuthResponse, @Res() res) {
    if (!('providers' in session)) session.providers = {};
    try {
      if (!session.user) {
        const user = await this.usersService.findBySteamId(
          req.user.profile.steamid,
        );
        if (!user) throw new UnauthorizedException('Steam account not linked');
        session.user = user;
        session.providers.steam = req.user.profile;
        this.logger.log(`User ${user.id} logged in`);
      } else if (session.user) {
        await this.usersService.createSteam(session.user, req.user);
        return session;
      }
    } catch (e) {
      this.logger.error(e);
    } finally {
      // TODO: Stop hardcoding the redirect URL
      res.redirect('http://localhost:5173/');
    }
  }

  @Post('valid')
  async validate(@Session() session) {
    if (!('providers' in session) || !('steam' in session.providers)) {
      throw new UnauthorizedException({ error: 'Steam not logged in.' });
    }
    return session.providers.steam;
  }
}
