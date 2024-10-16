import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { ValidationPipe } from '@nestjs/common';
import winstonConfig from '@/winstom/winstom.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: process.env.LOG_LEVEL === 'debug',
    }),
  );
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
