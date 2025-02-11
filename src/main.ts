/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
    app.useGlobalPipes(new ValidationPipe());
 app.enableCors({
    origin: ['http://localhost:3001'], // Ajoutez l'origine du frontend
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
