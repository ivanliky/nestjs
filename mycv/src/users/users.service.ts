import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'; // Dodato za injektovanje repozitorijuma
import { User } from './user.entity'; // Importovanje User entiteta

@Injectable()

export class UsersService {
    // Konstruktor: injektuje TypeORM repozitorijum za `User` entitet.
    // @InjectRepository(User) — Nest/TypeORM dekorator koji obezbeđuje instancu `Repository<User>` registrovanu za entitet `User`.
    // `private repo: Repository<User>` — čuva instancu repozitorijuma u privatnom polju `repo` koje se koristi za operacije sa bazom (create, save, find, update, delete).
    // Telo konstruktora je prazno jer DI (dependency injection) obavlja injektovanje automatski pri kreiranju instance servisa.
    // Ovo omogućava da servis koristi `this.repo` za rad sa entitetima bez ručnog pravljenja ili konfigurisanja repozitorijuma.
    constructor(@InjectRepository(User) private repo: Repository<User>) {} 

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }
}
