// Ovaj DTO (Data Transfer Object) se koristi za validaciju podataka prilikom kreiranja novog korisnika.
import { IsEmail, IsString } from 'class-validator';

// DTO (Data Transfer Object) koji se koristi za validaciju podataka prilikom kreiranja novog korisnika
export class createUserDto {
    
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}               