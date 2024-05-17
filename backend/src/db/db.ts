import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as games from '../infrastructure/igdb/db/schema/games';
import { config } from '@config/config';

export const client = new Client({
  database: config.db.database,
  host: config.db.host,
  password: config.db.password,
  port: config.db.port,
  user: config.db.user,
});

client.connect();

export const db = drizzle(client, { schema: games });
