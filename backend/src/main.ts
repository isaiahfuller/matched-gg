import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from '@g4mr/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
