import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service'; // Servis za logiku CPU-a
import { PowerModule } from '../power/power.module'; // Modul za PowerService

// @Module dekorator definiše metapodatke za CpuModule.
// imports: navodi module koje CpuModule koristi, omogućavajući pristup njihovim servisima.
// providers: navodi sve servise koji će biti dostupni preko dependency injection-a unutar ovog modula.

@Module({
  imports: [PowerModule], // Uvozi PowerModule kako bi mogao da koristi PowerService
  providers: [CpuService], // Registruje CpuService kao provajder unutar CpuModule
  exports: [CpuService] // Omogućava izvoz CpuService za korišćenje u drugim modulima
})
export class CpuModule {}
