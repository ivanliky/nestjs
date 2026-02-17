import { Injectable } from '@nestjs/common'; // Dekorator koji označava da je klasa servis koji se može injektirati u druge delove aplikacije

@Injectable() // Oznaka da je klasa servis koji se može koristiti u drugim delovima aplikacije
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
