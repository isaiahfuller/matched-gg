import { pino, LoggerOptions } from 'pino';
import { config } from '@config/config';

const pinoOptions: LoggerOptions = {
  level: config.pinoOptions?.level || 'info',
  name: config.pinoOptions?.name || 'logger',
  enabled: config.pinoOptions?.enabled || true,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
};

export const logger = pino(pinoOptions);
