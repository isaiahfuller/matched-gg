import { Controller, Get, Logger, Session } from '@nestjs/common';

import { AppService } from './app.service';
import { GameService } from './games.service';
import { Games } from './infrastructure/igdb/db/schema/games';

@Controller('games')
export class GamesController {
  private readonly logger = new Logger('GameController');

  constructor(
    private readonly appService: AppService,
    private readonly gameService: GameService,
  ) {}

  @Get('getGames')
  async findAll(): Promise<Games[]> {
    return await this.gameService.getGames();
  }

  @Get('getPreviousRecommendations')
  async getPreviousRecommendations(@Session() session) {
    return this.gameService.getPreviousRecommendations(session.user.id);
  }

  @Get('getRecommendations')
  async getRecommendations(@Session() session) {
    return this.gameService.getTimeRecommendations(session.user.id);
  }
}
