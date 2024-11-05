import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectToMongo } from './utils/connectToMongo';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  await connectToMongo();

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Api NestJS Simples')
    .setDescription('API Simples com práticas boas em NestJS')
    .addServer('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);
}
bootstrap();
