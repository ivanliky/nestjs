
// Importujemo potrebne dekoratore i klase iz NestJS-a.
import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
// Importujemo DTO (Data Transfer Object) za validaciju i strukturu podataka prilikom kreiranja poruke.
import { createMessageDto } from './dtos/create-message.dto';
// Importujemo servis koji sadrži logiku za rad sa porukama.
import { MessagesService } from './messages.service';

// Dekorator @Controller označava ovu klasu kao kontroler i postavlja osnovni URL path na 'messages'.
@Controller('messages')
// Kontroler služi kao posrednik između HTTP zahteva i servisnog sloja.
export class MessagesController {

    /**
     * Konstruktor prima instancu MessagesService preko dependency injection-a.
     * Ovo omogućava kontroleru da koristi metode servisa za rad sa porukama,
     * kao što su kreiranje, dohvatanje i listanje poruka.
     * NestJS automatski prosleđuje instancu MessagesService prilikom kreiranja kontrolera.
     */
    constructor(public messagesService: MessagesService){} //Koristimo dependency injection


    // @Get() dekorator mapira HTTP GET zahteve na ovu metodu.
    // Ova metoda vraća sve poruke pozivajući findAll() iz servisa.
    @Get()
    listMessages(){
        return this.messagesService.findAll();
    }


    // @Post() dekorator mapira HTTP POST zahteve na ovu metodu.
    // @Body() omogućava da preuzmemo podatke iz tela zahteva i validiramo ih pomoću createMessageDto.
    // Metoda kreira novu poruku koristeći servis.
    @Post()
    createMessage(@Body() body: createMessageDto){
        return this.messagesService.create(body.content);
    }


    // @Get('/:id') dekorator mapira GET zahteve sa parametrom 'id' na ovu metodu.
    // @Param('id') omogućava pristup vrednosti parametra iz URL-a.
    // Metoda pokušava da pronađe poruku po ID-ju i baca grešku ako ne postoji.
    @Get('/:id')
    async getMessage(@Param('id') id: string){
        const message = await this.messagesService.findOne(id);
        
        if(!message){
            // Ako poruka nije pronađena, baca se HTTP greška 404.
            throw new NotFoundException('message not found');
        }
        return message;
    }
}
