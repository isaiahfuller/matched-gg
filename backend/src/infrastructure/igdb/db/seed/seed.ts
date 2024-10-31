import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { config } from '@config/config';
import { IgdbConfig } from '@config/interfaces';
import { chunk } from '@util/chunk';
import { IgdbFacade } from 'src/infrastructure/igdb/facade/igdbFacade';
import { logger } from 'src/util/logger';

import TwitchHandler from '../../../twitch/handlers/twitchHandler';
import { ArtworkDTO } from '../../facade/subsystems/DTO/ArtworkDTO';
import { CompanyDTO } from '../../facade/subsystems/DTO/CompanyDTO';
import { CoversDTO } from '../../facade/subsystems/DTO/CoversDTO';
import { GameDTO } from '../../facade/subsystems/DTO/GameDTO';
import { InvolvedCompanyDTO } from '../../facade/subsystems/DTO/InvolvedCompanyDTO';
import { WebsiteDTO } from '../../facade/subsystems/DTO/WebsiteDTO';
import { IgdbResources } from '../../facade/subsystems/enum/IgdbResources';
import { IgdbDbController } from '../controller/IgdbDbController';
import { mapArtwork } from '../map/mapArtwork';
import { mapCompany } from '../map/mapCompany';
import { mapGame } from '../map/mapGame';
import { mapInvolvedCompany } from '../map/mapInvolvedCompany';
import { mapWebsite } from '../map/mapWebsite';

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

  async function seedResource<DTO>(mapping, endpoint) {
    const igdbGames = await igdb.seedResources<DTO>({
      concurrency: 4,
      expanded: false,
      resource: endpoint,
    });
    const entries = igdbGames.map((entry) => {
      return mapping(entry);
    });

    logger.info({ entries: entries.length }, `${endpoint} mapped`);

    const chunks = chunk(entries, 1000);

    logger.info({ chunks: chunks.length }, `${endpoint} chunked`);

    chunks.forEach(async (chunk) => {
      try {
        switch (endpoint) {
          case IgdbResources.ARTWORKS:
            return igdbDbController.storeArtworks(chunk);
          case IgdbResources.COMPANIES:
            return igdbDbController.storeCompanies(chunk);
          case IgdbResources.COVERS:
            return igdbDbController.storeCovers(chunk);
          case IgdbResources.GAMES:
            return igdbDbController.storeGames(chunk);
          case IgdbResources.INVOLVED_COMPANIES:
            return igdbDbController.storeInvolvedCompanies(chunk);
          case IgdbResources.WEBSITES:
            return igdbDbController.storeWebsites(chunk);
          default:
            throw new Error('Unhandled endpoint');
        }
      } catch (error) {
        logger.error(`Error inserting ${endpoint}: ${error}`);
      }
    });

    logger.info(`${endpoint} inserted`);
  }

  await seedResource<GameDTO>(mapGame, IgdbResources.GAMES);
  await seedResource<WebsiteDTO>(mapWebsite, IgdbResources.WEBSITES);
  await seedResource<ArtworkDTO>(mapArtwork, IgdbResources.ARTWORKS);
  await seedResource<CoversDTO>(mapArtwork, IgdbResources.COVERS);
  await seedResource<CompanyDTO>(mapCompany, IgdbResources.COMPANIES);
  await seedResource<InvolvedCompanyDTO>(
    mapInvolvedCompany,
    IgdbResources.INVOLVED_COMPANIES,
  );
};

seed()
  .then(() => {
    logger.info('Seed complete');
  })
  .catch((error) => {
    logger.error(`Seed failed: ${error}`);
    process.exit(1);
  });
