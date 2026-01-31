import { NestFactory } from '@nestjs/core';
import { ComputerModule } from './computer/computer.module'; // Glavni modul aplikacije

async function bootstrap() {
  const app = await NestFactory.create(ComputerModule); // Kreira NestJS aplikaciju koristeći ComputerModule
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
