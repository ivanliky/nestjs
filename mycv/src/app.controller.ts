import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  
  constructor(private readonly appService: AppService) {} // koristi se dependency injection da bi se dobila instanca AppService klase

  @Get()
  getHello(): string {
    return this.appService.getHello(); // poziva se metoda getHello() iz AppService klase i vraća njen rezultat kao odgovor na GET zahtev
  }
}
