import { chunk } from '@util/chunk';
import { and, eq, inArray } from 'drizzle-orm';
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
import { keywordsTable } from 'src/infrastructure/igdb/db/schema/keywords';
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

import {
  igdbSteamConnect,
  igdbSteamRelations,
} from '../schema/igdbSteamConnect';
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
    igdbSteamConnect,
    igdbSteamRelations,
    involvedCompaniesTable,
    involvedCompanyRelations,
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
  const games = new Map();
  const sites = await db
    .select()
    .from(websitesTable)
    .leftJoin(gamesTable, eq(gamesTable.igdbId, websitesTable.game))
    .where(
      and(
        eq(websitesTable.type, 13),
        inArray(gamesTable.gameType, [9, 10, 11, 8, 5, 4, 0, 12]),
      ),
    );
  const vals = Object.values(sites);
  for (const e of vals) {
    const m = e.websites.url?.match(
      /https:\/\/store\.steampowered\.com\/app\/(\d*)\/?.*/,
    );
    if (m && m[1]) {
      if (!e.games || !e.games!.igdbId) continue;
      games.set(m[1], { igdbId: e.games!.igdbId, steamId: Number(m[1]) });
    }
  }
  const chunks = chunk(games.values(), 1000);
  chunks.forEach(async (chunk) => {
    await db.insert(igdbSteamConnect).values(chunk).onConflictDoNothing();
  });
};
