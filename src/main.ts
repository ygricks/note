import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('▓ BOOTSTRAP');
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.APP_PORT, 10);
  logger.log(`listen on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
