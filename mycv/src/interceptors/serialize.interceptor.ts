import {
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';   
import { plainToClass } from 'class-transformer';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {} // Konstruktor prima DTO klasu koja se koristi za serijalizaciju
    
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // Poziva se pre nego što se handler izvrši
        return next.handle().pipe(
            map((data: any) => {
  
                // Nakon što handler vrati podatke, koristi plainToClass da ih transformiše u instancu DTO klase
                return plainToClass(UserDto, data, {
                    excludeExtraneousValues: true // Isključuje polja koja nisu označena sa @Expose u DTO klasi
                }); 
             
            })
        );
    }
}