import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ImATeapotException, ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
dotenv.config();


const whitelist = [
  'https://www.urban-bd.com',
  'http://localhost:3000',
  'https://admin.urban-bd.com',
  'https://api.urban-bd.com',
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());



  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  console.log(`Listening on port ${process.env.PORT}`);
  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
