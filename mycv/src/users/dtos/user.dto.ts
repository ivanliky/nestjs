// Ovaj DTO (Data Transfer Object) se koristi za definisanje strukture podataka koji se šalju klijentu prilikom dobijanja informacija o korisniku. Koristi se zajedno sa class-transformer biblioteku za serijalizaciju i deserializaciju objekata.
import { Expose, Exclude } from 'class-transformer';
// DTO (Data Transfer Object) koji se koristi za definisanje strukture podataka koji se šalju klijentu prilikom dobijanja informacija o korisniku. Koristi se zajedno sa class-transformer biblioteku za serijalizaciju i deserializaciju objekata.
export class UserDto {
    @Expose() // Oznacava da se ovo polje treba uključiti prilikom serijalizacije
    id: number;
    @Expose()
    email: string;
}   