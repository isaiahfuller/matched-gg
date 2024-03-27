import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import TwitchHandler from '../domain/twitch/handlers/twitchHandler';
import { config } from '@config/config';
import { logger } from 'src/util/logger';

const connectToTwitch = async () => {
  const twitchHandler = new TwitchHandler(
    {
      clientId: config.twitch.clientId,
      clientSecret: config.twitch.clientSecret,
      apiUrl: config.twitch.apiUrl,
    },
    logger,
  );
  await twitchHandler.connect();
};

connectToTwitch();

// import db from './database/db';
