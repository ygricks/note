import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port: number = parseInt(process.env.APP_PORT, 10);
  console.log(`listen on http://localhost:${port}`);
  await app.listen(port);
}
bootstrap();
