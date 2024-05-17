import dotenv from 'dotenv';
import path from 'path';

import { Config } from './interfaces';

dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const validateEnvVars = (requiredVars: string[], optionalVars: string[]) => {
  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });
  optionalVars.forEach((key) => {
    if (!process.env[key]) {
      console.warn(`Missing optional environment variable: ${key}`);
    }
  });
};

const requiredVars: string[] = [
  'PORT',
  'DB_HOST',
  'DB_USER',
  'DB_PASSWORD',
  'DB_PORT',
  'TWITCH_API_URL',
  'TWITCH_CLIENT_ID',
  'TWITCH_CLIENT_SECRET',
  'STEAM_API_KEY',
];

const optionalVars: string[] = ['PINO_LEVEL', 'PINO_NAME', 'PINO_ENABLED'];

validateEnvVars(requiredVars, optionalVars);

export const config: Config = {
  db: {
    database: process.env.DB_NAME || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    password: process.env.DB_PASSWORD || 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER || 'postgres',
  },
  pinoOptions: {
    enabled: process.env.PINO_ENABLED === 'true',
    level: process.env.PINO_LEVEL || 'info',
    name: process.env.PINO_NAME || 'logger',
  },
  port: Number(process.env.PORT) || 3000,
  redis: {
    password: process.env.REDIS_PASSWORD || 'redis',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  sessionSecret: process.env.SESSION_SECRET || 'uV2GckuLeRSeLGH9vtx4',
  steam: {
    apiKey: process.env.STEAM_API_KEY || '',
  },
  twitch: {
    apiUrl: process.env.TWITCH_API_URL || 'https://id.twitch.tv/',
    clientId: process.env.TWITCH_CLIENT_ID || '',
    clientSecret: process.env.TWITCH_CLIENT_SECRET || '',
  },
};

module.exports = { config };
