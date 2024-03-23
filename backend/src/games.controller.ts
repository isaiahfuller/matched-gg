import { Controller, Get } from '@nestjs/common';

@Controller('games')
export class GamesController {
  @Get()
  findAll(): string {
    return 'All games';
  }
}
