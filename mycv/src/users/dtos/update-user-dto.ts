import { IsEmail, IsString, IsOptional } from "class-validator";

export class updateUserDto {
    @IsEmail()
    @IsOptional() // Oznacava da je polje opcionalno, nije obavezno prilikom validacije
    email?: string;

    @IsString()
    @IsOptional() // Oznacava da je polje opcionalno, nije obavezno prilikom validacije
    password?: string;
}   