import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs'; // Import Observable iz RxJS biblioteke
import { map } from 'rxjs/operators'; // Import operatora map iz RxJS biblioteke koji se koristi za transformaciju podataka u Observable streamu
import { plainToInstance } from 'class-transformer'; // Import funkcije plainToInstance iz class-transformer biblioteke koja se koristi za transformaciju običnih objekata u instance klasa (DTO)

// Definicija interfejsa ClassConstructor koji predstavlja konstruktor klase, koristi se za tipizaciju DTO klasa koje se prosleđuju Serialize dekoratoru
interface ClassConstructor {
    new (...args: any[]): {};
}

// Dekorator Serialize koji prima DTO klasu i koristi SerializeInterceptor za serijalizaciju podataka pre nego što se vrate klijentu
export function Serialize(dto: ClassConstructor) {   
    return UseInterceptors(new SerializeInterceptor(dto)); // Vraća funkciju koja koristi UseInterceptors sa instancom SerializeInterceptor-a
}

// Interceptor koji se koristi za serijalizaciju podataka pre nego što se vrate klijentu
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {} // Konstruktor prima DTO klasu koja se koristi za serijalizaciju
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Poziva se pre nego što se handler izvrši
        return next.handle().pipe(
            map((data: any) => {
  
                 // Nakon što handler vrati podatke, koristi se plainToInstance da se ti podaci transformišu u instance DTO klase
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true // Isključuje polja koja nisu označena sa @Expose u DTO klasi
                }); 
             
            })
        );
    }
}