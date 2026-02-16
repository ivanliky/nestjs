import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Integracija TypeORM-a sa NestJS
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service'; // Importovanje AuthService-a
import { User } from './user.entity'; // Importovanje User entiteta
import { CurrentUserInterceptor } from './interceptors/current-user-interceptor'; // Importovanje CurrentUserInterceptor-a
import { APP_INTERCEPTOR } from '@nestjs/core'; // Importovanje APP_INTERCEPTOR tokena za globalnu registraciju interceptor-a


@Module({
  imports: [
    // Registracija User entiteta sa TypeOrmModule-om
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController], // Registracija kontrolera za korisnike
  providers: [
    UsersService, 
    AuthService, 
   { 
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor 
  }
  ] // Registracija servisa za korisnike
})
export class UsersModule {}
