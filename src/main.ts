import {
  BadRequestException,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/response-mapping.interceptor';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { filterMessages } from './common/utils/validationUtils';
import { initializeTransactionalContext } from 'typeorm-transactional';

async function bootstrap() {
  initializeTransactionalContext();
  const app: INestApplication = await NestFactory.create(AppModule);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(filterMessages(errors));
      },
    }),
  );
  const configService = app.get(ConfigService);
  app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new HttpErrorFilter());
  if (configService.get('NODE_ENV') !== 'production-demo') {
    const config = new DocumentBuilder()
      .setTitle('shopify admin api example')
      .setDescription('API Documentation description')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  app.use(json({ limit: '16mb' }));
  app.use(urlencoded({ extended: true, limit: '16mb' }));
  const defaultPort = configService.get('PORT') || 3100;
  await app.listen(defaultPort);
}
bootstrap();
