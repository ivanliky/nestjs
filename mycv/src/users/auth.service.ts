import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
import e from 'express';

const scrypt = promisify(_script);

@Injectable()
export class AuthService {

    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string) {

        const users = await this.usersService.find(email); // Provera da li korisnik sa datim emailom već postoji

        if(users.length) {
            throw new BadRequestException('Email already in use'); // Ako korisnik postoji, bacamo grešku 
        }   

        const salt = randomBytes(8).toString('hex'); // Generisanje nasumičnog soli

        const hash = (await scrypt(password, salt, 32)) as Buffer; // Hashovanje lozinke sa soli

        const result = salt + '.' + hash.toString('hex'); // Kombinovanje soli i hash-a u jedan string

        const user = await this.usersService.create(email, result); // Kreiranje korisnika sa emailom i hash-ovanom lozinkom

        return user;
    }

    async signin(email: string, password: string){
        const [user] = await this.usersService.find(email); // Pronalazak korisnika po emailu

        if(!user) {
            throw new NotFoundException('Invalid email or password'); // Ako korisnik ne postoji, bacamo grešku
        }

        const [salt, storedHash] = user.password.split('.'); // Razdvajanje soli i hash-a iz baze

        const hash = (await scrypt(password, salt, 32)) as Buffer; // Hashovanje unete lozinke sa soli

        if(storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Invalid email or password'); // Ako se hash ne poklapa, bacamo grešku  
        }   
        return user; // Ako je sve u redu, vraćamo korisnika
    }
}