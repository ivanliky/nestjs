import { Expose, Exclude } from 'class-transformer';

export class UserDto {
    @Expose() // Oznacava da se ovo polje treba uključiti prilikom serijalizacije
    id: number;
    @Expose()
    email: string;
}   