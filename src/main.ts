import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { AppLogger } from './shared/app.logger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup logger
  const logger = new AppLogger();
  logger.setContext('MainApplication');
  app.useLogger(logger);

  // Init application
  await app.init();

  app.enableCors();

  await app.listen(process.env.API_PORT || 3000, '0.0.0.0');

  if (!fs.existsSync('.env')) {
    logger.error('.env file is not present!');
    await app.close();
    process.exit(1);
  }

  logger.log(`HTTP application is running on: ${await app.getUrl()}`);
  logger.log(`GraphQL playground endpoint: ${await app.getUrl()}/graphql`);
}

bootstrap().then();
