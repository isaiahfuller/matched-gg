import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import TwitchHandler from '../domain/twitch/handlers/twitchHandler';
import { config } from '@config/config';

const connectToTwitch = async () => {
  const twitchHandler = new TwitchHandler({
    clientId: config.twitch.clientId,
    clientSecret: config.twitch.clientSecret,
    apiUrl: config.twitch.apiUrl,
  });
  const response = await twitchHandler.connect();
  console.log(response);
};

connectToTwitch();

// import db from './database/db';
