import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import TwitchHandler from '../domain/twitch/handlers/twitchHandler';

const connectToTwitch = async () => {
  const twitchHandler = new TwitchHandler();
  const response = await twitchHandler.connect();
  console.log(response);
};

connectToTwitch();

// import db from './database/db';
