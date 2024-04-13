import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as games from '../infrastructure/igdb/db/schema/games';
import { config } from '@config/config';

export const client = new Client({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

client.connect();

export const db = drizzle(client, { schema: games });
