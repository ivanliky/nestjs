import {
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable,
} from '@nestjs/common';

import { UsersService } from '../users.service';

@Injectable() // Oznaka da je ovo klasa koja se može injektovati kao provider u NestJS-u
export class CurrentUserInterceptor implements NestInterceptor {

    constructor(private usersService: UsersService) {}

    async intercept(context: ExecutionContext, handler: CallHandler) {

        const request = context.switchToHttp().getRequest(); // Dobija HTTP zahtev iz konteksta izvršenja
        const { userId } = request.session || {}; // Dobija userId iz sesije, ako postoji   

        if (userId) {
            const user = await this.usersService.findOne(userId); // Pronalazi korisnika po ID-ju
            request.currentUser = user; // Postavlja pronađenog korisnika u request objekat, što omogućava da se koristi u kontrolerima putem @CurrentUser dekoratora
        }

        return handler.handle(); // Nastavlja sa izvršenjem sledećeg handler-a u lancu
    }       
}