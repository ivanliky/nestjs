import { Injectable, NotFoundException } from '@nestjs/common';
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
        const user = this.repo.create({ email, password }); // Kreira novi User entitet, ali ga još ne čuva u bazi
        return this.repo.save(user); // Čuva entitet u bazi podataka i vraća sačuvani entitet
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id }); // Pronalazi jednog korisnika po ID-u
    }

    find(email: string) {
        return this.repo.findBy({ email }); // Pronalazi sve korisnike sa datom email adresom
    }

    async update(id: number, attrs: Partial<User>) { // Ažurira korisnika sa datim ID-em i atributima
        const user = await this.repo.findOneBy({ id }); // Pronalazi korisnika po ID-u
        if (!user) {
            throw new NotFoundException('User not found'); // Ako korisnik nije pronađen, baca grešku
        }
        Object.assign(user, attrs); // Ažurira korisnika sa novim atributima
        return this.repo.save(user); // Čuva ažuriranog korisnika u bazi podataka

    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({ id }); // Pronalazi korisnika po ID-u
        if (!user) {
            throw new NotFoundException('User not found'); // Ako korisnik nije pronađen, baca grešku
        }   
        return this.repo.remove(user); // Uklanja korisnika iz baze podataka
    }
}
