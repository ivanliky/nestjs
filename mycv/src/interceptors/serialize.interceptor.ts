import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';   
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {} // Konstruktor prima DTO klasu koja se koristi za serijalizaciju
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Poziva sledeći handler i transformiše rezultat pre nego što se pošalje klijentu
        console.log('Before serialization', context); // Loguje ime handlera pre serijalizacije
        return next.handle().pipe(
            map((data: any) => {
                // Transformiše običan objekat u instancu DTO klase koristeći class-transformer
                console.log('Data before serialization:', data); // Loguje podatke pre serijalizacije
                return plainToClass(this.dto, data, { excludeExtraneousValues: true });
            })
        );
    }
}