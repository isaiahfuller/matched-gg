import { config } from '@config/config';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      logLevels: ['log', 'fatal', 'error', 'warn', 'debug'],
      timestamp: true,
    }),
  });

  const redisClient = createClient({
    url: `redis://:${config.redis.password}@${config.redis.host}:${config.redis.port}`,
  });
  redisClient.connect().catch(console.error);
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: 'matched:',
  });

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: config.authSecrets.session,
      store: redisStore,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  console.log(config.port)
  await app.listen(config.port);
}
bootstrap();
