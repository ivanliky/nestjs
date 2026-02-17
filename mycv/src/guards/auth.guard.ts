import { 
    CanActivate,
    ExecutionContext,
} from '@nestjs/common';
 
// Ovaj AuthGuard se koristi za zaštitu ruta koje zahtevaju autentifikaciju. Proverava da li postoji userId u sesiji, što znači da je korisnik prijavljen.
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest(); // Dobijanje HTTP request objekta iz ExecutionContext-a
        return request.session.userId; // Provera da li postoji userId u sesiji, što znači da je korisnik autentifikovan    
    }
}