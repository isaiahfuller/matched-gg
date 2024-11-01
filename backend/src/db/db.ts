import { config } from '@config/config';
import logger from '@util/logger';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import * as games from '../infrastructure/igdb/db/schema/games';
import * as keywords from '../infrastructure/igdb/db/schema/keywords';
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
  schema: { ...games, ...keywords },
});
