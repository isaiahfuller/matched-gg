import { pino, LoggerOptions } from 'pino';
import { config } from '@config/config';

const pinoOptions: LoggerOptions = {
  enabled: config.pinoOptions?.enabled || true,
  level: config.pinoOptions?.level || 'info',
  name: config.pinoOptions?.name || 'logger',
  transport: {
    options: {
      colorize: true,
    },
    target: 'pino-pretty',
  },
};

export const logger = pino(pinoOptions);
