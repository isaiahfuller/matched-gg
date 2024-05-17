import { pino, LoggerOptions } from 'pino';
import { config } from '@config/config';

const pinoOptions: LoggerOptions = {
  level: config.pinoOptions?.level || 'info',
  name: config.pinoOptions?.name || 'logger',
  enabled: config.pinoOptions?.enabled || true,
};

export const logger = pino(pinoOptions);

export default logger;
