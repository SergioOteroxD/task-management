import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rTracer = require('cls-rtracer');
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const configService = app.get(ConfigService);
  //Configuración libreria para validación de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  //Configuración libreria para generación de indentificador de solicitud
  app.use(rTracer.expressMiddleware());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const module = configService.get('MODULE');
  app.setGlobalPrefix(module);

  //Configuración de documentación con swagger
  const config = new DocumentBuilder().setTitle('Task example').build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  const PORT = configService.get<number>('PORT');

  await app.listen(PORT, async () =>
    Logger.log(
      'INFO',
      `Application is running on: port: ${await app.getUrl()}`,
      'main',
    ),
  );
}
bootstrap();
