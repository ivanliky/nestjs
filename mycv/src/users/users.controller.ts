import { Body, Controller, Post, Get, Patch, Param, Query, Delete, NotFoundException, UseGuards } from '@nestjs/common';
import { createUserDto } from './dtos/create-user-dto';
import { updateUserDto } from './dtos/update-user-dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { Session } from '@nestjs/common';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard'; // Importovanje AuthGuard-a

// Kontroler za autentifikaciju/registraciju korisnika
// Sve rute u ovom kontroleru imaju prefiks '/auth'
@Controller('auth')
@Serialize(UserDto) // Primena Serialize interceptor-a na ceo kontroler, što znači da će svi odgovori biti serijalizovani koristeći UserDto

export class UsersController {

    // Injektovanje servisa koji sadrži logiku za korisnike
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ){}

    @Get('/whoami')
    @UseGuards(AuthGuard) // Primena AuthGuard-a na ovu rutu, što znači da samo autentifikovani korisnici mogu pristupiti ovoj ruti
    whoAmI(@CurrentUser() user: User) {
        return user; // Vraća trenutno prijavljenog korisnika, koji je dobijen putem @CurrentUser dekoratora
    }

    // POST /auth/signup
    // Prima telo zahteva koje odgovara createUserDto (email i password)
    @Post('/signup')
    async createUser(@Body() body: createUserDto, @Session() session: any) {
       const user = await  this.authService.signup(body.email, body.password); // Poziva metodu signup iz AuthService-a sa emailom i lozinkom iz tela zahteva
       session.userId = user.id; // Čuva ID korisnika u sesiji nakon uspešne registracije
       return user; // Vraća kreiranog korisnika
    }

    @Post('/signin')
    async signin(@Body() body: createUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password); // Poziva metodu signin iz AuthService-a sa emailom i lozinkom iz tela zahteva
        session.userId = user.id; // Čuva ID korisnika u sesiji nakon uspešne prijave
        return user; // Vraća prijavljenog korisnika
    }

    @Post('/signout')
    signout(@Session() session: any) {
        session.userId = null; // Briše ID korisnika iz sesije, effectively logging them out
    }

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

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
        // Ažurira korisnika po ID-ju sa novim podacima iz tela zahteva
        return this.usersService.update(parseInt(id), body);    
    }
}
