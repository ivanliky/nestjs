import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Integracija TypeORM-a sa NestJS
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service'; // Importovanje AuthService-a
import { User } from './user.entity'; // Importovanje User entiteta

@Module({
  imports: [
    // Registracija User entiteta sa TypeOrmModule-om
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController], // Registracija kontrolera za korisnike
  providers: [UsersService, AuthService] // Registracija servisa za korisnike
})
export class UsersModule {}
