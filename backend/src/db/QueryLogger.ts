import { Logger } from 'drizzle-orm/logger';
import { Logger as PinoLogger } from 'pino';

export interface QueryLoggerConfig {
  logger: PinoLogger;
  truncate?: boolean;
}

export class QueryLogger implements Logger {
  private _logger: PinoLogger;
  private _truncate: boolean;
  constructor({ logger, truncate = false }: QueryLoggerConfig) {
    this._truncate = truncate;
    this._logger = logger;
  }

  logQuery(query: string, params: unknown[]): void {
    this._logger.info({ params: this.truncater(params), query });
  }

  truncater(data: unknown[]): unknown[] {
    if (!this._truncate) {
      return data;
    }
    return data.slice(0, 100);
  }
}
