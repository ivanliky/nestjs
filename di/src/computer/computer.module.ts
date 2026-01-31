import { Module } from '@nestjs/common';
import { ComputerController } from './computer.controller'; // Kontroler za računar

@Module({
  controllers: [ComputerController] // Registruje ComputerController
})
export class ComputerModule {}
