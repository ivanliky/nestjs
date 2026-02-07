import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { createUserDto } from './dtos/create-user-dto';
import { updateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

// Kontroler za autentifikaciju/registraciju korisnika
// Sve rute u ovom kontroleru imaju prefiks '/auth'
@Controller('auth')

export class UsersController {

    // Injektovanje servisa koji sadrži logiku za korisnike
    constructor(private usersService: UsersService) {}
    
    // POST /auth/signup
    // Prima telo zahteva koje odgovara createUserDto (email i password)
    @UseInterceptors(SerializeInterceptor)
    @Post('/signup')
    createUser(@Body() body: createUserDto) {
        // Prosleđuje podatke servisu da kreira novog korisnika
        return this.usersService.create(body.email, body.password);
    }

    @UseInterceptors(SerializeInterceptor) // Koristi interceptor koji omogućava serijalizaciju objekata (npr. za isključivanje polja sa @Exclude)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('Handler is running'); // Loguje kada se handler pokrene
        // Pronalazi korisnika po ID-ju
        const user = await this.usersService.findOne(parseInt(id));

        if (!user) {
            throw new NotFoundException('User not found'); // Ako korisnik nije pronađen, baca grešku
        }   
        return user; // Vraća pronađenog korisnika
    }

    @UseInterceptors(SerializeInterceptor)
    @Get()
    findAllUsers(@Query('email') email: string) {
        // Pronalazi sve korisnike sa datom email adresom
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        // Uklanja korisnika po ID-ju
        return this.usersService.remove(parseInt(id));
    }

    @UseInterceptors(SerializeInterceptor)
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
        // Ažurira korisnika po ID-ju sa novim podacima iz tela zahteva
        return this.usersService.update(parseInt(id), body);    
    }
}
