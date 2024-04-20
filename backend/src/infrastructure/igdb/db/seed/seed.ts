import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import TwitchHandler from '../../../twitch/handlers/twitchHandler';
import { config } from '@config/config';
import { logger } from 'src/util/logger';
import { IgdbFacade } from 'src/infrastructure/igdb/facade/igdbFacade';
import * as gamesSchema from '../schema/games';
import * as websitesSchema from '../schema/websites';
import { mapGame } from '../map/mapGame';
import { chunk } from '@util/chunk';
import { IgdbDbController } from '../controller/IgdbDbController';
import { GameDTO } from '../../facade/subsystems/DTO/GameDTO';
import { WebsiteDTO } from '../../facade/subsystems/DTO/WebsiteDTO';
import { mapWebsite } from '../map/mapWebsites';

const seed = async (): Promise<void> => {
  const igdbDbController = new IgdbDbController();

  const twitch = new TwitchHandler(
    {
      clientId: config.twitch.clientId,
      clientSecret: config.twitch.clientSecret,
      apiUrl: config.twitch.apiUrl,
    },
    logger,
  );

  const accessToken = (await twitch.connect()).access_token;

  const igdb = new IgdbFacade(
    { accessToken: accessToken, clientId: config.twitch.clientId },
    logger,
    accessToken,
  );

  const igdbGames: GameDTO[] = await igdb.seedGames({
    concurrency: 4,
    expanded: false,
  });

  const games: gamesSchema.Games[] = igdbGames.map(
    (game: GameDTO): gamesSchema.Games => {
      return mapGame(game);
    },
  );

  logger.info({ games: games.length }, 'Games mapped');

  const gameChunks: [gamesSchema.Games[]] = chunk(games, 1000);

  logger.info({ chunks: gameChunks.length }, 'Games chunked');

  gameChunks.forEach(async (chunk: gamesSchema.Games[]) => {
    try {
      await igdbDbController.storeGames(chunk);
    } catch (error) {
      logger.error(`Error inserting games: ${error}`);
    }
  });

  logger.info('Games inserted');

  const igdbWebsites: WebsiteDTO[] = await igdb.seedWebsites({
    concurrency: 4,
    expanded: false,
  });

  const websites: websitesSchema.Websites[] = igdbWebsites.map(
    (website: WebsiteDTO): websitesSchema.Websites => {
      return mapWebsite(website);
    },
  );

  logger.info({ websites: websites.length }, 'Websites mapped');
  const websiteChunks: [websitesSchema.Websites[]] = chunk(websites, 1000);

  logger.info({ chunks: websiteChunks.length }, 'Websites chunked');

  websiteChunks.forEach(async (chunk: websitesSchema.Websites[]) => {
    try {
      await igdbDbController.storeWebsites(chunk);
    } catch (error) {
      logger.error(`Error inserting websites: ${error}`);
    }
  });
  logger.info('Websites inserted');
};

seed()
  .then(() => {
    logger.info('Seed complete');
  })
  .catch((error) => {
    logger.error(`Seed failed: ${error}`);
    process.exit(1);
  });
