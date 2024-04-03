import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import TwitchHandler from '../infrastructure/twitch/handlers/twitchHandler';
import { config } from '@config/config';
import { logger } from 'src/util/logger';
import { IgdbFacade } from 'src/infrastructure/igdb/facade/igdbFacade';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
});

const initDrizzle = async () => {
  await client.connect();
  const db = drizzle(client);
  return db;
};

const connectToTwitch = async () => {
  const twitchHandler = new TwitchHandler(
    {
      clientId: config.twitch.clientId,
      clientSecret: config.twitch.clientSecret,
      apiUrl: config.twitch.apiUrl,
    },
    logger,
  );
  const response = await twitchHandler.connect();
  return response;
};

const seed = async (): Promise<void> => {
  const twitch = await connectToTwitch();
  const igdb = new IgdbFacade(
    { accessToken: twitch.access_token, clientId: config.twitch.clientId },
    logger,
    twitch.access_token,
  );

  const games = await igdb.seedGames({ concurrency: 4 });
  console.log(games);

  process.exit(0);
};

seed();

// import db from './database/db';
