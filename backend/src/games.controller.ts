import { Controller, Get, Logger, Session } from '@nestjs/common';

import { GameService } from './games.service';
import { Games } from './infrastructure/igdb/db/schema/games';

@Controller('games')
export class GamesController {
  private readonly logger = new Logger('GameController');

  constructor(private readonly gameService: GameService) {}

  /**
   *
   * @returns The first 100 games in the database
   */
  @Get('getGames')
  async findAll(): Promise<Games[]> {
    return await this.gameService.getGames();
  }

  /**
   *
   * @param session - Logged in user session
   * @returns User's previous game recommendations
   */
  @Get('getPreviousRecommendations')
  async getPreviousRecommendations(@Session() session: any) {
    return this.gameService.getPreviousRecommendations(session.user.id);
  }

  /**
   *
   * @param session - Logged in user session
   * @returns New recommendations for user
   */
  @Get('getRecommendations')
  async getRecommendations(@Session() session: any) {
    if (session && session.user && session.user.id)
      return this.gameService.getTimeRecommendations(session.user.id);
    else return this.gameService.topGameRecommendations();
  }
}
