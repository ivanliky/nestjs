
// Importujemo dekorator za validaciju iz biblioteke class-validator.
import { IsString } from "class-validator"; 

// DTO (Data Transfer Object) klasa koja definiše strukturu i validaciju podataka za kreiranje poruke.
export class createMessageDto{
    // Dekorator @IsString() obezbeđuje da je content obavezno string.
    @IsString()
    content: string
}