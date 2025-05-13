import { config } from '@config/config';
import express from 'express';

import { IgdbResources } from '../../facade/subsystems/enum/IgdbResources';
import { IgdbDbController } from '../controller/IgdbDbController';
import { mapArtwork } from '../map/mapArtwork';
import { mapCompany } from '../map/mapCompany';
import { mapCompanyWebsite } from '../map/mapCompanyWebsite';
import { mapFranchise } from '../map/mapFranchise';
import { mapGame } from '../map/mapGame';
import { mapGenre } from '../map/mapGenre';
import { mapInvolvedCompany } from '../map/mapInvolvedCompany';
import { mapKeyword } from '../map/mapKeyword';
import { mapMultiplayerMode } from '../map/mapMultiplayerMode';
import { mapPlatform } from '../map/mapPlatform';
import { mapPlatformFamilies } from '../map/mapPlatformFamily';
import { mapPlatformLogo } from '../map/mapPlatformLogo';
import { mapPlatformVersion } from '../map/mapPlatformVersion';
import { mapPlatformVersionCompany } from '../map/mapPlatformVersionCompany';
import { mapPlatformVersionReleaseDate } from '../map/mapPlatformVersionReleaseDate';
import { mapPlatformWebsite } from '../map/mapPlatformWebsite';
import { mapScreenshot } from '../map/mapScreenshot';
import { mapTheme } from '../map/mapTheme';
import { mapWebsite } from '../map/mapWebsite';
import { mapWebsiteType } from '../map/mapWebsiteType';
import { Artworks, artworksTable } from '../schema/artworks';
import { Companies, companiesTable } from '../schema/companies';
import {
  CompanyWebsites,
  companyWebsitesTable,
} from '../schema/companyWebsites';
import { Covers, coversTable } from '../schema/covers';
import { Franchises, franchisesTable } from '../schema/franchise';
import {
  GameFranchises,
  GameGameModes,
  GameGenres,
  GameKeywords,
  GameMultiplayerModes,
  GamePlatforms,
  GameThemes,
  Games,
  SimilarGames,
  gameFranchises,
  gameGameModes,
  gameGenres,
  gameKeywords,
  gameMultiplayerModes,
  gamePlatforms,
  gameSimilarGames,
  gameThemes,
  gamesTable,
} from '../schema/games';
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
import { Screenshots, screenshotsTable } from '../schema/screenshots';
import { Themes, themesTable } from '../schema/themes';
import { WebsiteTypes, websiteTypesTable } from '../schema/websiteTypes';
import { Websites, websitesTable } from '../schema/websites';
const port = 7331;

const igdbDbController = new IgdbDbController();
const app = express();
app.use(express.json());

app.post('/igdb/:endpoint/:type', async (req, res) => {
  const { endpoint, type } = req.params;
  if (type === 'delete') {
    return;
  }
  if (req.headers['x-secret'] !== config.authSecrets.jwt.replaceAll('+', ' ')) {
    console.log("secret doesn't match");
    return;
  }
  let data;
  switch (endpoint) {
    case IgdbResources.GAMES:
      data = mapGame(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Games>(data, gamesTable);
      } else {
        igdbDbController.store<Games>(data, gamesTable);
        const gameKeywordsRelations = processRelation(data, 'keywords');
        const gameFranchisesRelations = processRelation(data, 'franchises');
        const gamePlatformsRelations = processRelation(data, 'platforms');
        const gameGenresRelations = processRelation(data, 'genres');
        const gameThemesRelations = processRelation(data, 'themes');
        const gameMultiplayerModesRelations = processRelation(
          data,
          'multiplayerModes',
        );
        const gameGameModesRelations = processRelation(data, 'gameModes');
        const similarGames = processRelation(data, 'similarGames');
        if (gameKeywordsRelations.length) {
          igdbDbController.storeManyToMany<GameKeywords>(
            gameKeywordsRelations,
            gameKeywords,
          );
        }
        if (gameFranchisesRelations.length) {
          igdbDbController.storeManyToMany<GameFranchises>(
            gameFranchisesRelations,
            gameFranchises,
          );
        }
        if (gamePlatformsRelations.length) {
          igdbDbController.storeManyToMany<GamePlatforms>(
            gamePlatformsRelations,
            gamePlatforms,
          );
        }
        if (gameGenresRelations.length) {
          igdbDbController.storeManyToMany<GameGenres>(
            gameGenresRelations,
            gameGenres,
          );
        }
        if (gameThemesRelations.length) {
          igdbDbController.storeManyToMany<GameThemes>(
            gameThemesRelations,
            gameThemes,
          );
        }
        if (gameMultiplayerModesRelations.length) {
          igdbDbController.storeManyToMany<GameMultiplayerModes>(
            gameMultiplayerModesRelations,
            gameMultiplayerModes,
          );
        }
        if (gameGameModesRelations.length) {
          igdbDbController.storeManyToMany<GameGameModes>(
            gameGameModesRelations,
            gameGameModes,
          );
        }
        if (similarGames.length) {
          igdbDbController.storeManyToMany<SimilarGames>(
            similarGames,
            gameSimilarGames,
          );
        }
      }
      res.sendStatus(200);
      break;
    case IgdbResources.WEBSITES:
      data = mapWebsite(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Websites>(data, websitesTable);
      } else {
        igdbDbController.store<Websites>(data, websitesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.ARTWORKS:
      data = mapArtwork(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Artworks>(data, artworksTable);
      } else {
        igdbDbController.store<Artworks>(data, artworksTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.COMPANIES:
      data = mapCompany(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Companies>(data, companiesTable);
      } else {
        igdbDbController.store<Companies>(data, companiesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.COMPANY_WEBSITES:
      data = mapCompanyWebsite(req.body);
      if (type === 'delete') {
        igdbDbController.delete<CompanyWebsites>(data, companyWebsitesTable);
      } else {
        igdbDbController.store<CompanyWebsites>(data, companyWebsitesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.COVERS:
      data = mapArtwork(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Covers>(data, coversTable);
      } else {
        igdbDbController.store<Covers>(data, coversTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.FRANCHISES:
      data = mapFranchise(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Franchises>(data, franchisesTable);
      } else {
        igdbDbController.store<Franchises>(data, franchisesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.GENRES:
      data = mapGenre(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Genres>(data, genresTable);
      } else {
        igdbDbController.store<Genres>(data, genresTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.INVOLVED_COMPANIES:
      data = mapInvolvedCompany(req.body);
      if (type === 'delete') {
        igdbDbController.delete<InvolvedCompanies>(
          data,
          involvedCompaniesTable,
        );
      } else {
        igdbDbController.store<InvolvedCompanies>(data, involvedCompaniesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.KEYWORDS:
      data = mapKeyword(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Keywords>(data, keywordsTable);
      } else {
        igdbDbController.store<Keywords>(data, keywordsTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.MULTIPLAYER_MODES:
      data = mapMultiplayerMode(req.body);
      if (type === 'delete') {
        igdbDbController.delete<MultiplayerModes>(data, multiplayerModesTable);
      } else {
        igdbDbController.store<MultiplayerModes>(data, multiplayerModesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORM_FAMILIES:
      data = mapPlatformFamilies(req.body);
      if (type === 'delete') {
        igdbDbController.delete<PlatformFamilies>(data, platformFamiliesTable);
      } else {
        igdbDbController.store<PlatformFamilies>(data, platformFamiliesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORM_LOGOS:
      data = mapPlatformLogo(req.body);
      if (type === 'delete') {
        igdbDbController.delete<PlatformLogos>(data, platformLogosTable);
      } else {
        igdbDbController.store<PlatformLogos>(data, platformLogosTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORM_VERSION_COMPANIES:
      data = mapPlatformVersionCompany(req.body);
      if (type === 'delete') {
        igdbDbController.delete<PlatformVersionCompanies>(
          data,
          platformVersionCompaniesTable,
        );
      } else {
        igdbDbController.store<PlatformVersionCompanies>(
          data,
          platformVersionCompaniesTable,
        );
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORM_VERSION_RELEASE_DATES:
      data = mapPlatformVersionReleaseDate(req.body);
      if (type === 'delete') {
        igdbDbController.delete<PlatformVersionReleaseDates>(
          data,
          platformVersionReleaseDatesTable,
        );
      } else {
        igdbDbController.store<PlatformVersionReleaseDates>(
          data,
          platformVersionReleaseDatesTable,
        );
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORM_VERSIONS:
      data = mapPlatformVersion(req.body);
      if (type === 'delete') {
        igdbDbController.delete<PlatformVersions>(data, platformVersionsTable);
      } else {
        igdbDbController.store<PlatformVersions>(data, platformVersionsTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORM_WEBSITES:
      data = mapPlatformWebsite(req.body);
      if (type === 'delete') {
        igdbDbController.delete<PlatformWebsites>(data, platformWebsitesTable);
      } else {
        igdbDbController.store<PlatformWebsites>(data, platformWebsitesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.PLATFORMS:
      data = mapPlatform(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Platforms>(data, platformsTable);
      } else {
        igdbDbController.store<Platforms>(data, platformsTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.SCREENSHOTS:
      data = mapScreenshot(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Screenshots>(data, screenshotsTable);
      } else {
        igdbDbController.store<Screenshots>(data, screenshotsTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.THEMES:
      data = mapTheme(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Themes>(data, themesTable);
      } else {
        igdbDbController.store<Themes>(data, themesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.WEBSITE_TYPES:
      data = mapWebsiteType(req.body);
      if (type === 'delete') {
        igdbDbController.delete<WebsiteTypes>(data, websiteTypesTable);
      } else {
        igdbDbController.store<WebsiteTypes>(data, websiteTypesTable);
      }
      res.sendStatus(200);
      break;
    case IgdbResources.WEBSITES:
      data = mapWebsite(req.body);
      if (type === 'delete') {
        igdbDbController.delete<Websites>(data, websitesTable);
      } else {
        igdbDbController.store<Websites>(data, websitesTable);
      }
      res.sendStatus(200);
      break;
    default:
      res.sendStatus(404);
  }
});

function processRelation(data: Games, key: string) {
  if (!data[key] || !data[key].length) return [];
  const res: any = [];

  for (const e of data[key]) {
    const newEntry = { gameId: data.igdbId, resourceId: e };
    res.push(newEntry);
  }
  return res;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
