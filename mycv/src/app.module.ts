/*
  Glavni modul aplikacije (AppModule)

  Objašnjenje (srpski):
  - U NestJS-u, aplikacija je organizovana kroz module. Svaki modul grupiše povezane kontrolere, servise
    i druge zavisnosti.
  - `AppModule` je korenski (root) modul aplikacije i ovde se učitavaju globalne zavisnosti kao što su
    TypeORM konfiguracija i feature moduli (`UsersModule`, `ReportsModule`).
*/

import { Module } from '@nestjs/common'; // Dekorator za definisanje NestJS modula
import { TypeOrmModule } from '@nestjs/typeorm'; // Integracija TypeORM-a sa NestJS
import { AppController } from './app.controller'; // Glavni kontroler aplikacije
import { AppService } from './app.service'; // Glavni servis aplikacije
import { UsersModule } from './users/users.module'; // Feature modul za rad sa korisnicima
import { ReportsModule } from './reports/reports.module'; // Feature modul za izveštaje
import { User } from './users/user.entity'; // Importovanje User entiteta
import { Report } from './reports/report.entity'; // Importovanje Report entiteta

@Module({
  // `imports` niz definiše module koje ovaj modul koristi. Ovi moduli mogu biti globalni (kao što je
  // TypeOrmModule.forRoot()) ili feature moduli (kao što su UsersModule i ReportsModule).
  imports: [
    // TypeOrmModule.forRoot() registruje globalnu konekciju ka bazi podataka.
    // Ovde prosleđujemo osnovne opcije za TypeORM.
    // - `type: 'sqlite'` -> koristimo SQLite fajl bazu (pogodno za razvoj i testiranje).
    // - `database: 'db.sqlite'` -> ime fajla koji sadrži bazu.
    // - `entities: []` -> mesto gde treba da navedete entity klase (tabele). Možete ovde importovati
    //     svoje entitete ili koristiti `autoLoadEntities: true` da se entiteti automatski učitaju
    //     iz modula koji pozivaju `TypeOrmModule.forFeature()`obris.
    // - `synchronize: true` -> automatski sinhronizuje shemu baze sa entitetima (dodaje/menja tabele).
    //     Ovo je zgodno tokom razvoja, ali NE preporučuje se u produkciji jer može dovesti do
    //     neželjenih promena ili gubitka podataka.

    TypeOrmModule.forRoot({  // Globalna konfiguracija TypeORM-a
      type: 'sqlite', // Tip baze podataka
      database: 'db.sqlite', 
      entities: [User,Report], // Registracija entiteta (tabela) u bazi podataka
      synchronize: true, // Automatska sinhronizacija sheme baze sa entitetima (pogodno za razvoj)
      // Savet: za početak možete dodati `autoLoadEntities: true` ovde da olakšate razvoj.
      // autoLoadEntities: true,
    }),

    // Feature moduli: organizuju logiku po domenima (korisnici, izveštaji itd.).
    UsersModule, // Modul za rad sa korisnicima
    ReportsModule // Modul za rad sa izveštajima
  ], 

  // Kontroleri su odgovorni za rukovanje HTTP zahtevima i vraćanje odgovora.
  controllers: [AppController],

  // Provideri su servisi i druge klase koje implementiraju poslovnu logiku i mogu se injektovati
  // u kontrolere ili druge servise.
  providers: [AppService],
})
export class AppModule {}

