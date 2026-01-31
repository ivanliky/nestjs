import { Module } from '@nestjs/common';
import { DiskService } from './disk.service'; // Servis za logiku diska
import { PowerModule } from 'src/power/power.module';

// @Module dekorator definiše metapodatke za DiskModule.
// providers: navodi sve servise koji će biti dostupni preko dependency injection-a unutar ovog modula.

@Module({
  imports: [PowerModule], // Uvozi PowerModule kako bi DiskService mogao da koristi njegove servise
  providers: [DiskService], // Registruje DiskService kao provajder unutar DiskModule
  exports: [DiskService] // Omogućava izvoz DiskService za korišćenje u drugim modulima
})
export class DiskModule {}
