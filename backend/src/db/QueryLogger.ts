import { Logger } from 'drizzle-orm/logger';
import { Logger as PinoLogger } from 'pino';

export interface QueryLoggerConfig {
  truncate?: boolean;
  logger: PinoLogger;
}

export class QueryLogger implements Logger {
  private _truncate: boolean;
  private _logger: PinoLogger;
  constructor({ truncate = false, logger }: QueryLoggerConfig) {
    this._truncate = truncate;
    this._logger = logger;
  }

  truncater(data: unknown[]): unknown[] {
    if (!this._truncate) {
      return data;
    }
    return data.slice(0, 100);
  }

  logQuery(query: string, params: unknown[]): void {
    this._logger.info({ query, params: this.truncater(params) });
  }
}
