import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // Globalni pipe za validaciju podataka
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ // Konfiguracija globalnog ValidationPipe
    whitelist: true, // Uklanja sve nevalidne (neopisane) osobine iz DTO objekata
  })); // Globalna validacija podataka
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
