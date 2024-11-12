import { config } from '@config/config';
import logger from '@util/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as artworks from '../infrastructure/igdb/db/schema/artworks';
import * as companies from '../infrastructure/igdb/db/schema/companies';
import * as covers from '../infrastructure/igdb/db/schema/covers';
import * as franchises from '../infrastructure/igdb/db/schema/franchise';
import * as gameEngineLogos from '../infrastructure/igdb/db/schema/gameEngineLogos';
import * as gameModes from '../infrastructure/igdb/db/schema/gameMode';
import * as games from '../infrastructure/igdb/db/schema/games';
import * as genres from '../infrastructure/igdb/db/schema/genres';
import * as involvedCompanies from '../infrastructure/igdb/db/schema/involvedCompanies';
import * as keywords from '../infrastructure/igdb/db/schema/keywords';
import * as multiplayerModes from '../infrastructure/igdb/db/schema/multiplayerModes';
import * as platformFamilies from '../infrastructure/igdb/db/schema/platformFamilies';
import * as platformLogos from '../infrastructure/igdb/db/schema/platformLogos';
import * as platforms from '../infrastructure/igdb/db/schema/platforms';
import * as screenshots from '../infrastructure/igdb/db/schema/screenshots';
import * as themes from '../infrastructure/igdb/db/schema/themes';
import * as websites from '../infrastructure/igdb/db/schema/websites';
import * as igdbSteamConnect from '../infrastructure/steam/db/schema/igdbSteamConnect';
import * as steamUserOwnedGames from '../infrastructure/steam/db/schema/steamUserOwnedGames';
import { QueryLogger } from './QueryLogger';

export const client = new Client({
  database: config.db.database,
  host: config.db.host,
  password: config.db.password,
  port: config.db.port,
  user: config.db.user,
});

client.connect();

export const db = drizzle(client, {
  logger: new QueryLogger({ logger: logger, truncate: true }),
  schema: {
    ...artworks,
    ...companies,
    ...covers,
    ...franchises,
    ...gameEngineLogos,
    ...gameModes,
    ...games,
    ...genres,
    ...igdbSteamConnect,
    ...involvedCompanies,
    ...keywords,
    ...multiplayerModes,
    ...platformFamilies,
    ...platformLogos,
    ...platforms,
    ...screenshots,
    ...steamUserOwnedGames,
    ...themes,
    ...websites,
  },
});

export type DrizzleDB = typeof db;
