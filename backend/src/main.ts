import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import session from 'express-session';

ConfigModule.forRoot({
  envFilePath: '../.env',
});

import { config } from '@config/config';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(config.port);
}
bootstrap();
