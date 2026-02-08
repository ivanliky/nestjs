import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';   
import { plainToInstance } from 'class-transformer';

interface ClassConstructor {
    new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {   
    return UseInterceptors(new SerializeInterceptor(dto)); // Vraća funkciju koja koristi UseInterceptors sa instancom SerializeInterceptor-a
}

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