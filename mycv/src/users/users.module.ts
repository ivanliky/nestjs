import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Integracija TypeORM-a sa NestJS
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Importovanje User entiteta

@Module({
  imports: [
    // Registracija User entiteta sa TypeOrmModule-om
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController], // Registracija kontrolera za korisnike
  providers: [UsersService] // Registracija servisa za korisnike
})
export class UsersModule {}
