import { Module } from '@nestjs/common';
import { PowerService } from './power.service';

@Module({
  providers: [PowerService], // Registruje PowerService kao provajder unutar PowerModule
  exports: [PowerService], // Omogućava drugim modulima da koriste PowerService
})
export class PowerModule {}
