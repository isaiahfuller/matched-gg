import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { config } from '@config/config';
import { IgdbConfig } from '@config/interfaces';
import { chunk } from '@util/chunk';
import { IgdbFacade } from 'src/infrastructure/igdb/facade/igdbFacade';
import { logger } from 'src/util/logger';

import TwitchHandler from '../../../twitch/handlers/twitchHandler';
import { ArtworkDTO } from '../../facade/subsystems/DTO/ArtworkDTO';
import { GameDTO } from '../../facade/subsystems/DTO/GameDTO';
import { WebsiteDTO } from '../../facade/subsystems/DTO/WebsiteDTO';
import { IgdbResources } from '../../facade/subsystems/enums/IgdbResources';
import { IgdbDbController } from '../controller/IgdbDbController';
import { mapArtwork } from '../map/mapArtwork';
import { mapGame } from '../map/mapGame';
import { mapWebsite } from '../map/mapWebsite';
import * as artworksSchema from '../schema/artworks';
import * as gamesSchema from '../schema/games';
import * as websitesSchema from '../schema/websites';

const seed = async (): Promise<void> => {
  const igdbDbController = new IgdbDbController();

  const twitch = new TwitchHandler(
    {
      apiUrl: config.twitch.apiUrl,
      clientId: config.twitch.clientId,
      clientSecret: config.twitch.clientSecret,
    },
    logger,
  );

  const igdbConfig = {
    accessToken: (await twitch.connect()).access_token,
    clientId: config.twitch.clientId,
  } as IgdbConfig;

  const igdb = new IgdbFacade({
    config: igdbConfig,
    logger,
  });

  const igdbGames: GameDTO[] = await igdb.seedResources<GameDTO>({
    concurrency: 4,
    expanded: false,
    resource: IgdbResources.GAMES,
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

  const igdbWebsites: WebsiteDTO[] = await igdb.seedResources<WebsiteDTO>({
    concurrency: 4,
    expanded: false,
    resource: IgdbResources.WEBSITES,
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

  const igdbArtworks: ArtworkDTO[] = await igdb.seedResources<ArtworkDTO>({
    concurrency: 4,
    expanded: false,
    resource: IgdbResources.ARTWORKS,
  });

  const artworks: artworksSchema.Artworks[] = igdbArtworks.map(
    (artwork: ArtworkDTO): artworksSchema.Artworks => {
      return mapArtwork(artwork);
    },
  );

  logger.info({ artworks: artworks.length }, 'Artworks mapped');
  const artworkChunks: [artworksSchema.Artworks[]] = chunk(artworks, 1000);

  logger.info({ chunks: artworkChunks.length }, 'Artworks chunked');

  artworkChunks.forEach(async (chunk: artworksSchema.Artworks[]) => {
    try {
      await igdbDbController.storeArtworks(chunk);
    } catch (error) {
      logger.error(`Error inserting artworks: ${error}`);
    }
  });
  logger.info('Artworks inserted');
};

seed()
  .then(() => {
    logger.info('Seed complete');
  })
  .catch((error) => {
    logger.error(`Seed failed: ${error}`);
    process.exit(1);
  });
