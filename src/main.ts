import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession =  require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ['fefw32rfds']
  }));
  app.useGlobalPipes();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
