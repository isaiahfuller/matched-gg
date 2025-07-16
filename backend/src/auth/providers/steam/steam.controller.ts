import { config } from '@config/config';
import {
  Controller,
  Get,
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

import { SteamService } from '../../strategies/steam/steam.service';
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

  /**
   *
   * @param session - User's session
   * @param req - http request
   * @param res - http response
   * @returns User's achievement status for a specific game
   * @deprecated Currently not being used
   */
  @Post('gameAchievements')
  async achivements(@Session() session, @Req() req, @Res() res) {
    const achivements = await this.steamHandler.getGameAchievements(
      session.providers.steam.steamid,
      req.body.appid,
    );
    res.send(achivements);
    return achivements;
  }

  /**
   *
   * @param session - User's session
   * @returns Games similar to the user's, ordered by number of appearances.
   */
  @Get('getSimilarGames')
  async getSimilarGames(@Session() session) {
    const games = this.steamHandler.getSimilarGames(session);
    return games;
  }

  /**
   * Once user logs in with Steam, links account, creates account, or logs in to account.
   * @param session - User's session
   * @param req - http request, with data from {@link SteamOpenIdUserProfile}
   * @param res - http response
   */
  @UseGuards(AuthGuard('steam-openid'))
  @Get('auth')
  async login(@Session() session, @Req() req: SteamAuthResponse, @Res() res) {
    try {
      if (!session.user) {
        const user = await this.usersService.findBySteamId(req.user.steamid);
        if (!user) {
          const newUser = await this.usersService.createSteam(req.user);
          session.user = newUser[0];
          session.user.steam = req.user;
          await this.processLibrary(session);
          this.logger.log(`User ${newUser.id} logged in`);
        } else {
          delete user.password;
          session.user = user;
          this.logger.log(`User ${user.id} logged in`);
        }
      } else if (session.user) {
        await this.usersService.addSteam(session.user, req.user);
        const user = await this.usersService.findById(session.user.id);
        if (!user) throw new UnauthorizedException('Not logged in');
        delete user.password;
        session.user = user;
        this.logger.log(`User ${user.id} linked Steam account`);
      }
    } catch (e) {
      this.logger.error(e);
    } finally {
      // TODO: Stop hardcoding the redirect URL
      res.redirect(`http://localhost:4467/`);
    }
  }

  /**
   *
   * @param session - User's session
   * @returns The user's owned games, with playtime and last played timestamp
   */
  @Get('getOwnedGames')
  async ownedGames(@Session() session) {
    if (!session.user || !session.user.steam) {
      throw new UnauthorizedException('No Steam account linked');
    }
    const games = await this.steamHandler.getOwnedGames(
      session.user.steam.steamid,
    );
    return games.games;
  }

  /**
   *
   * @param session - User's session
   * @returns User's owned games on Steam, mapped for the database
   */
  @Get('processLibrary')
  async processLibrary(@Session() session) {
    if (!session.user || !session.user.steam) {
      throw new UnauthorizedException('No Steam account linked');
    }
    const games = await this.steamHandler.syncAccount(session);
    return games;
  }

  /**
   *
   * @param session - User's session
   * @returns Steam account info
   */
  @Post('valid')
  async validate(@Session() session) {
    if (!('providers' in session) || !('steam' in session.providers)) {
      throw new UnauthorizedException({ error: 'Steam not logged in.' });
    }
    return session.providers.steam;
  }
}
