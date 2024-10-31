import { chunk } from '@util/chunk';
import { eq, like } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { client } from 'src/db/db';
import { artworksTable } from 'src/infrastructure/igdb/db/schema/artworks';
import {
  companiesTable,
  companyRelations,
} from 'src/infrastructure/igdb/db/schema/companies';
import {
  coverRelations,
  coversTable,
} from 'src/infrastructure/igdb/db/schema/covers';
import {
  franchiseRelations,
  franchisesTable,
} from 'src/infrastructure/igdb/db/schema/franchise';
import {
  gamesRelations,
  gamesTable,
} from 'src/infrastructure/igdb/db/schema/games';
import {
  genreRelations,
  genresTable,
} from 'src/infrastructure/igdb/db/schema/genres';
import {
  involvedCompaniesTable,
  involvedCompanyRelations,
} from 'src/infrastructure/igdb/db/schema/involvedCompanies';
import {
  keywordRelations,
  keywordsTable,
} from 'src/infrastructure/igdb/db/schema/keywords';
import {
  multiplayerModesRelations,
  multiplayerModesTable,
} from 'src/infrastructure/igdb/db/schema/multiplayerModes';
import {
  platformFamiliesTable,
  platformFamilyRelations,
} from 'src/infrastructure/igdb/db/schema/platformFamilies';
import {
  platformLogosRelations,
  platformLogosTable,
} from 'src/infrastructure/igdb/db/schema/platformLogos';
import {
  platformVersionCompaniesTable,
  platformVersionCompanyRelations,
} from 'src/infrastructure/igdb/db/schema/platformVersionCompanies';
import {
  platformVersionReleaseDateRelations,
  platformVersionReleaseDatesTable,
} from 'src/infrastructure/igdb/db/schema/platformVersionReleaseDate';
import {
  platformVersionRelations,
  platformVersionsTable,
} from 'src/infrastructure/igdb/db/schema/platformVersions';
import {
  platformWebsiteRelations,
  platformWebsitesTable,
} from 'src/infrastructure/igdb/db/schema/platformWebsites';
import {
  platformRelations,
  platformsTable,
} from 'src/infrastructure/igdb/db/schema/platforms';
import {
  themeRelations,
  themesTable,
} from 'src/infrastructure/igdb/db/schema/themes';
import {
  websiteRelations,
  websitesTable,
} from 'src/infrastructure/igdb/db/schema/websites';

import { IgdbSteamConnect } from '../schema/IgdbSteamConnect';
const db = drizzle(client, {
  schema: {
    artworksTable,
    companiesTable,
    companyRelations,
    coverRelations,
    coversTable,
    franchiseRelations,
    franchisesTable,
    gamesRelations,
    gamesTable,
    genreRelations,
    genresTable,
    involvedCompaniesTable,
    involvedCompanyRelations,
    keywordRelations,
    keywordsTable,
    multiplayerModesRelations,
    multiplayerModesTable,
    platformFamiliesTable,
    platformFamilyRelations,
    platformLogosRelations,
    platformLogosTable,
    platformRelations,
    platformVersionCompaniesTable,
    platformVersionCompanyRelations,
    platformVersionRelations,
    platformVersionReleaseDateRelations,
    platformVersionReleaseDatesTable,
    platformVersionsTable,
    platformWebsiteRelations,
    platformWebsitesTable,
    platformsTable,
    themeRelations,
    themesTable,
    websiteRelations,
    websitesTable,
  },
});
export const igdbSteamLink = async () => {
  const games: IgdbSteamConnect[] = [];
  const sites = await db.query.websitesTable.findMany({
    columns: { url: true },
    where:
      eq(websitesTable.websiteCategory, 'steam') &&
      like(websitesTable.url, 'https://store.steampowered.com/app/%'),
    with: {
      game: {
        columns: {
          igdbId: true,
        },
      },
    },
  });
  const vals = Object.values(sites);
  for (const e of vals) {
    const m = e.url?.match(
      /https:\/\/store\.steampowered\.com\/app\/(\d*)\/?.*/,
    );
    if (m && m[1]) {
      games.push({ igdbId: e.game!.igdbId, steamId: Number(m[1]) });
    }
  }
  const chunks = chunk(games, 1000);
  chunks.forEach(async (chunk) => {
    await db.insert(IgdbSteamConnect).values(chunk).onConflictDoNothing();
  });
};
