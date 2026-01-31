import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller'; // Kontroler za računar
import { CpuModule } from 'src/cpu/cpu.module'; // Modul za CPU
import { DiskModule } from 'src/disk/disk.module'; // Modul za Disk

// @Module dekorator definiše metapodatke za modul.
// controllers: navodi sve kontrolere koji pripadaju ovom modulu.
// imports: navodi sve module koje ovaj modul koristi.

@Module({
  controllers: [ComputerController], // Registruje ComputerController
  imports: [CpuModule, DiskModule] // Uvozi module za CPU i Disk
})
export class ComputerModule {}
