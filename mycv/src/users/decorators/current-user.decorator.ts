// Ovaj dekorator se koristi za dobijanje trenutno prijavljenog korisnika u kontrolerima.
import {
    createParamDecorator, // Funkcija za kreiranje prilagođenog dekoratora
    ExecutionContext, // Interfejs koji pruža informacije o trenutnom kontekstu izvršenja (npr. HTTP zahtev)
} from '@nestjs/common';

// Dekorator koji se koristi za dobijanje trenutno prijavljenog korisnika u kontrolerima
export const CurrentUser = createParamDecorator(
    (data: never, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest(); // Dobija HTTP zahtev iz konteksta izvršenja
        return request.currentUser; // Vraća trenutno prijavljenog korisnika, koji je postavljen u middleware-u
    }       
);