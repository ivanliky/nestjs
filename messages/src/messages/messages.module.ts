
// Importujemo Module dekorator iz NestJS-a, kao i potrebne klase za ovaj modul.
import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service'; // Servis za logiku poruka
import { MessagesRepository } from './messages.repository'; // Repozitorijum za rad sa podacima

// @Module dekorator definiše metapodatke za modul.
// controllers: navodi sve kontrolere koji pripadaju ovom modulu.
// providers: navodi sve servise i repozitorijume koji će biti dostupni preko dependency injection-a.
@Module({
  controllers: [MessagesController], // Registruje MessagesController
  providers: [MessagesService, MessagesRepository] // Registruje servis i repozitorijum kao provajdere
})
// Klasa koja predstavlja modul za rad sa porukama.
export class MessagesModule {}
