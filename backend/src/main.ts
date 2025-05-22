import { config } from '@config/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';
import { createClient } from 'redis';

import { AppModule } from './app.module';

async function bootstrap() {
  const adapter = new ExpressAdapter();
  adapter.set('trust proxy', 1);

  const app = await NestFactory.create(AppModule, adapter);

  const redisClient = createClient({
    url: `redis://:${config.redis.password}@localhost:${config.redis.port}`,
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
  await app.listen(config.port);
}
bootstrap();
