import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'; // Globalni pipe za validaciju podataka
import { AppModule } from './app.module';
const cookieSession = require('cookie-session'); // Middleware za rad sa sesijama baziranim na kolačićima

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieSession({ // Konfiguracija cookie-session middleware-a  
    keys: ['mysecretkey'], // Ključevi za potpisivanje kolačića
  }));  

  app.useGlobalPipes(new ValidationPipe({ // Konfiguracija globalnog ValidationPipe
    whitelist: true, // Uklanja sve nevalidne (neopisane) osobine iz DTO objekata
  })); // Globalna validacija podataka
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
