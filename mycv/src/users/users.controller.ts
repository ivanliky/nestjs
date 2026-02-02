import { Body, Controller, Post } from '@nestjs/common';
import { createUserDto } from './dtos/create-user-dto';
import { UsersService } from './users.service';

// Kontroler za autentifikaciju/registraciju korisnika
// Sve rute u ovom kontroleru imaju prefiks '/auth'
@Controller('auth')

export class UsersController {

    // Injektovanje servisa koji sadrži logiku za korisnike
    constructor(private usersService: UsersService) {}
    
    // POST /auth/signup
    // Prima telo zahteva koje odgovara createUserDto (email i password)
    @Post('/signup')
    createUser(@Body() body: createUserDto) {
        // Prosleđuje podatke servisu da kreira novog korisnika
        return this.usersService.create(body.email, body.password);
    }
}
