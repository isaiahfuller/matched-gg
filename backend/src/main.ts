import { config } from '@config/config';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ['log', 'fatal', 'error', 'warn', 'debug'],
      timestamp: true,
    }),
  });

  const PostgresStore = connectPgSimple(session);
  const sessionStore = new PostgresStore({
    conObject: config.db,
    createTableIfMissing: false,
    pruneSessionInterval: 900,
    tableName: 'sessions',
    ttl: 86400,
  });

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.authSecrets.session,
      store: sessionStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  console.log(config.port);
  await app.listen(config.port);
}
bootstrap();
