import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import { config } from '@config/config';
import { IgdbConfig } from '@config/interfaces';
import { chunk } from '@util/chunk';
import { IgdbFacade } from 'src/infrastructure/igdb/facade/igdbFacade';
import { igdbSteamLink } from 'src/infrastructure/steam/db/seed/gameLink';
import { logger } from 'src/util/logger';

import TwitchHandler from '../../../twitch/handlers/twitchHandler';
import { ArtworkDTO } from '../../facade/subsystems/DTO/artwork';
import { CompanyDTO } from '../../facade/subsystems/DTO/company';
import { CoversDTO } from '../../facade/subsystems/DTO/cover';
import { DateFormatDTO } from '../../facade/subsystems/DTO/dateFormat';
import { GameModeDTO } from '../../facade/subsystems/DTO/gameMode';
import { GameStatusDTO } from '../../facade/subsystems/DTO/gameStatus';
import { GameTypeDTO } from '../../facade/subsystems/DTO/gameType';
import { GameDTO } from '../../facade/subsystems/DTO/games';
import { GenreDTO } from '../../facade/subsystems/DTO/genre';
import { InvolvedCompanyDTO } from '../../facade/subsystems/DTO/involvedCompany';
import { KeywordDTO } from '../../facade/subsystems/DTO/keyword';
import { MultiplayerModeDTO } from '../../facade/subsystems/DTO/multiplayerMode';
import { PlatformDTO } from '../../facade/subsystems/DTO/platform';
import { PlatformFamilyDTO } from '../../facade/subsystems/DTO/platformFamily';
import { PlatformLogoDTO } from '../../facade/subsystems/DTO/platformLogo';
import { PlatformTypeDTO } from '../../facade/subsystems/DTO/platformType';
import { PlatformVersionDTO } from '../../facade/subsystems/DTO/platformVersion';
import { PlatformVersionCompanyDTO } from '../../facade/subsystems/DTO/platformVersionCompany';
import { PlatformVersionReleaseDateDTO } from '../../facade/subsystems/DTO/platformVersionReleaseDate';
import { PlatformWebsiteDTO } from '../../facade/subsystems/DTO/platformWebsite';
import { ReleaseDateRegionDTO } from '../../facade/subsystems/DTO/releaseDateRegion';
import { ScreenshotDTO } from '../../facade/subsystems/DTO/screenshot';
import { ThemeDTO } from '../../facade/subsystems/DTO/theme';
import { WebsiteDTO } from '../../facade/subsystems/DTO/website';
import { WebsiteTypeDTO } from '../../facade/subsystems/DTO/websiteType';
import { IgdbResources } from '../../facade/subsystems/enum/IgdbResources';
import { IgdbDbController } from '../controller/IgdbDbController';
import { mapArtwork } from '../map/mapArtwork';
import { mapCompany } from '../map/mapCompany';
import { mapDateFormat } from '../map/mapDateFormat';
import { mapGame } from '../map/mapGame';
import { mapGameMode } from '../map/mapGameMode';
import { mapGameStatus } from '../map/mapGameStatus';
import { mapGameType } from '../map/mapGameType';
import { mapGenre } from '../map/mapGenre';
import { mapInvolvedCompany } from '../map/mapInvolvedCompany';
import { mapKeyword } from '../map/mapKeyword';
import { mapMultiplayerMode } from '../map/mapMultiplayerMode';
import { mapPlatform } from '../map/mapPlatform';
import { mapPlatformFamilies } from '../map/mapPlatformFamily';
import { mapPlatformLogo } from '../map/mapPlatformLogo';
import { mapPlatformType } from '../map/mapPlatformType';
import { mapPlatformVersion } from '../map/mapPlatformVersion';
import { mapPlatformVersionCompany } from '../map/mapPlatformVersionCompany';
import { mapPlatformVersionReleaseDate } from '../map/mapPlatformVersionReleaseDate';
import { mapPlatformWebsite } from '../map/mapPlatformWebsite';
import { mapReleaseDateRegion } from '../map/mapReleaseDateRegion';
import { mapScreenshot } from '../map/mapScreenshot';
import { mapTheme } from '../map/mapTheme';
import { mapWebsite } from '../map/mapWebsite';
import { mapWebsiteType } from '../map/mapWebsiteType';
import { Artworks, artworksTable } from '../schema/artworks';
import { Companies, companiesTable } from '../schema/companies';
import { Covers, coversTable } from '../schema/covers';
import { DateFormats, dateFormatTable } from '../schema/dateFormats';
import { GameModes, gameModeTable } from '../schema/gameMode';
import { GameStatuses, gameStatusTable } from '../schema/gameStatus';
import { GameTypes, gameTypesTable } from '../schema/gameTypes';
import { Games, gamesTable } from '../schema/games';
import { Genres, genresTable } from '../schema/genres';
import {
  InvolvedCompanies,
  involvedCompaniesTable,
} from '../schema/involvedCompanies';
import { Keywords, keywordsTable } from '../schema/keywords';
import {
  MultiplayerModes,
  multiplayerModesTable,
} from '../schema/multiplayerModes';
import {
  PlatformFamilies,
  platformFamiliesTable,
} from '../schema/platformFamilies';
import { PlatformLogos, platformLogosTable } from '../schema/platformLogos';
import { PlatformTypes, platformTypesTable } from '../schema/platformTypes';
import {
  PlatformVersionCompanies,
  platformVersionCompaniesTable,
} from '../schema/platformVersionCompanies';
import {
  PlatformVersionReleaseDates,
  platformVersionReleaseDatesTable,
} from '../schema/platformVersionReleaseDate';
import {
  PlatformVersions,
  platformVersionsTable,
} from '../schema/platformVersions';
import {
  PlatformWebsites,
  platformWebsitesTable,
} from '../schema/platformWebsites';
import { Platforms, platformsTable } from '../schema/platforms';
import {
  ReleaseDateRegions,
  releaseDateRegionsTable,
} from '../schema/releaseDateRegions';
import { Screenshots, screenshotsTable } from '../schema/screenshots';
import { Themes, themesTable } from '../schema/themes';
import { WebsiteTypes, websiteTypesTable } from '../schema/websiteTypes';
import { Websites, websitesTable } from '../schema/websites';
import { processRelations } from './processRelations';

/**
 * Gets data from IGDB, adds it to the database
 */
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

  /**
   * Get data for given endpoint from IGDB, add it to the database
   * @param mapping - Map function for the schema
   * @param endpoint - Name of the IGDB endpoint
   * @typeParam DTO - Database schema's type
   */
  async function seedResource<DTO extends { id?: number }>(mapping, endpoint) {
    const igdbGames = await igdb.seedResources<DTO>({
      concurrency: 3,
      expanded: false,
      resource: endpoint,
    });
    const idSet = new Set();
    const entries = igdbGames
      .reverse()
      .filter((e) => {
        if (idSet.has(e.id)) return false;
        idSet.add(e.id);
        return true;
      })
      .map((entry) => {
        return mapping(entry);
      });

    logger.info({ entries: entries.length }, `${endpoint} mapped`);

    const chunks = chunk(entries, 1000);

    logger.info({ chunks: chunks.length }, `${endpoint} chunked`);

    chunks.forEach(async (chunk) => {
      try {
        switch (endpoint) {
          case IgdbResources.ARTWORKS:
            return igdbDbController.store<Artworks>(chunk, artworksTable);
          case IgdbResources.COMPANIES:
            return igdbDbController.store<Companies>(chunk, companiesTable);
          case IgdbResources.COVERS:
            return igdbDbController.store<Covers>(chunk, coversTable);
          case IgdbResources.GAME_MODES:
            return igdbDbController.store<GameModes>(chunk, gameModeTable);
          case IgdbResources.GAMES:
            return igdbDbController.store<Games>(chunk, gamesTable);
          case IgdbResources.INVOLVED_COMPANIES:
            return igdbDbController.store<InvolvedCompanies>(
              chunk,
              involvedCompaniesTable,
            );
          case IgdbResources.WEBSITES:
            return igdbDbController.store<Websites>(chunk, websitesTable);
          case IgdbResources.PLATFORMS:
            return igdbDbController.store<Platforms>(chunk, platformsTable);
          case IgdbResources.PLATFORM_LOGOS:
            return igdbDbController.store<PlatformLogos>(
              chunk,
              platformLogosTable,
            );
          case IgdbResources.PLATFORM_WEBSITES:
            return igdbDbController.store<PlatformWebsites>(
              chunk,
              platformWebsitesTable,
            );
          case IgdbResources.PLATFORM_FAMILIES:
            return igdbDbController.store<PlatformFamilies>(
              chunk,
              platformFamiliesTable,
            );
          case IgdbResources.PLATFORM_VERSION_COMPANIES:
            return igdbDbController.store<PlatformVersionCompanies>(
              chunk,
              platformVersionCompaniesTable,
            );
          case IgdbResources.PLATFORM_VERSIONS:
            return igdbDbController.store<PlatformVersions>(
              chunk,
              platformVersionsTable,
            );
          case IgdbResources.PLATFORM_VERSION_RELEASE_DATES:
            return igdbDbController.store<PlatformVersionReleaseDates>(
              chunk,
              platformVersionReleaseDatesTable,
            );
          case IgdbResources.GENRES:
            return igdbDbController.store<Genres>(chunk, genresTable);
          case IgdbResources.KEYWORDS:
            return igdbDbController.store<Keywords>(chunk, keywordsTable);
          case IgdbResources.THEMES:
            return igdbDbController.store<Themes>(chunk, themesTable);
          case IgdbResources.MULTIPLAYER_MODES:
            return igdbDbController.store<MultiplayerModes>(
              chunk,
              multiplayerModesTable,
            );
          case IgdbResources.SCREENSHOTS:
            return igdbDbController.store<Screenshots>(chunk, screenshotsTable);
          case IgdbResources.DATE_FORMAT:
            return igdbDbController.store<DateFormats>(chunk, dateFormatTable);
          case IgdbResources.GAME_TYPE:
            return igdbDbController.store<GameTypes>(chunk, gameTypesTable);
          case IgdbResources.GAME_STATUS:
            return igdbDbController.store<GameStatuses>(chunk, gameStatusTable);
          case IgdbResources.PLATFORM_TYPES:
            return igdbDbController.store<PlatformTypes>(
              chunk,
              platformTypesTable,
            );
          case IgdbResources.RELEASE_DATE_REGIONS:
            return igdbDbController.store<ReleaseDateRegions>(
              chunk,
              releaseDateRegionsTable,
            );
          case IgdbResources.WEBSITE_TYPES:
            return igdbDbController.store<WebsiteTypes>(
              chunk,
              websiteTypesTable,
            );
          default:
            throw new Error('Unhandled endpoint');
        }
      } catch (error) {
        logger.error(`Error inserting ${endpoint}: ${error}`);
      }
    });

    logger.info(`${endpoint} inserted`);
  }
  await seedResource<DateFormatDTO>(mapDateFormat, IgdbResources.DATE_FORMAT);
  await seedResource<GameTypeDTO>(mapGameType, IgdbResources.GAME_TYPE);
  await seedResource<GameStatusDTO>(mapGameStatus, IgdbResources.GAME_STATUS);
  await seedResource<PlatformTypeDTO>(
    mapPlatformType,
    IgdbResources.PLATFORM_TYPES,
  );
  await seedResource<ReleaseDateRegionDTO>(
    mapReleaseDateRegion,
    IgdbResources.RELEASE_DATE_REGIONS,
  );
  await seedResource<WebsiteTypeDTO>(
    mapWebsiteType,
    IgdbResources.WEBSITE_TYPES,
  );
  await seedResource<GameDTO>(mapGame, IgdbResources.GAMES);
  await seedResource<WebsiteDTO>(mapWebsite, IgdbResources.WEBSITES);
  await seedResource<ArtworkDTO>(mapArtwork, IgdbResources.ARTWORKS);
  await seedResource<CoversDTO>(mapArtwork, IgdbResources.COVERS);
  await seedResource<CompanyDTO>(mapCompany, IgdbResources.COMPANIES);
  await seedResource<InvolvedCompanyDTO>(
    mapInvolvedCompany,
    IgdbResources.INVOLVED_COMPANIES,
  );
  await seedResource<PlatformDTO>(mapPlatform, IgdbResources.PLATFORMS);
  await seedResource<PlatformLogoDTO>(
    mapPlatformLogo,
    IgdbResources.PLATFORM_LOGOS,
  );
  await seedResource<PlatformWebsiteDTO>(
    mapPlatformWebsite,
    IgdbResources.PLATFORM_WEBSITES,
  );
  await seedResource<PlatformFamilyDTO>(
    mapPlatformFamilies,
    IgdbResources.PLATFORM_FAMILIES,
  );
  await seedResource<PlatformVersionCompanyDTO>(
    mapPlatformVersionCompany,
    IgdbResources.PLATFORM_VERSION_COMPANIES,
  );
  await seedResource<PlatformVersionDTO>(
    mapPlatformVersion,
    IgdbResources.PLATFORM_VERSIONS,
  );
  await seedResource<PlatformVersionReleaseDateDTO>(
    mapPlatformVersionReleaseDate,
    IgdbResources.PLATFORM_VERSION_RELEASE_DATES,
  );
  await seedResource<GenreDTO>(mapGenre, IgdbResources.GENRES);
  await seedResource<KeywordDTO>(mapKeyword, IgdbResources.KEYWORDS);
  await seedResource<ThemeDTO>(mapTheme, IgdbResources.THEMES);
  await seedResource<MultiplayerModeDTO>(
    mapMultiplayerMode,
    IgdbResources.MULTIPLAYER_MODES,
  );
  await seedResource<GameModeDTO>(mapGameMode, IgdbResources.GAME_MODES);
  await seedResource<ScreenshotDTO>(mapScreenshot, IgdbResources.SCREENSHOTS);
};

async function main() {
  let step = 'Seed';
  try {
    await seed();
    step = 'Relations processing';
    await processRelations();
    step = 'Extracting Steam IDs';
    await igdbSteamLink();
    logger.info('Seed complete');
  } catch (error) {
    logger.error(`${step} failed: ${error}`);
    process.exit(1);
  }
}

main();
