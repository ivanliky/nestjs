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
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; // Feature modul za rad sa korisnicima
import { ReportsModule } from './reports/reports.module'; // Feature modul za izveštaje

@Module({
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
    TypeOrmModule.forRoot({ 
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
      // Savet: za početak možete dodati `autoLoadEntities: true` ovde da olakšate razvoj.
      // autoLoadEntities: true,
    }),

    // Feature moduli: organizuju logiku po domenima (korisnici, izveštaji itd.).
    UsersModule,
    ReportsModule
  ], 

  // Kontroleri su odgovorni za rukovanje HTTP zahtevima i vraćanje odgovora.
  controllers: [AppController],

  // Provideri su servisi i druge klase koje implementiraju poslovnu logiku i mogu se injektovati
  // u kontrolere ili druge servise.
  providers: [AppService],
})
export class AppModule {}

