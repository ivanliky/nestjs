// Ovaj DTO (Data Transfer Object) se koristi za validaciju podataka prilikom ažuriranja postojećeg korisnika.
import { IsEmail, IsString, IsOptional } from "class-validator";

// DTO (Data Transfer Object) koji se koristi za validaciju podataka prilikom ažuriranja postojećeg korisnika
export class updateUserDto {
    @IsEmail()
    @IsOptional() // Oznacava da je polje opcionalno, nije obavezno prilikom validacije
    email?: string;

    @IsString()
    @IsOptional() // Oznacava da je polje opcionalno, nije obavezno prilikom validacije
    password?: string;
}   