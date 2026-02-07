import { AfterInsert, AfterRemove, AfterUpdate, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Oznacava klasu kao TypeORM entitet (tabelu u bazi podataka)
export class User {
    @PrimaryGeneratedColumn() // Primarni ključ koji se automatski generiše
    id: number;
    @Column() // Obična kolona u tabeli
    email: string;
    @Column()
    password: string;

    @AfterInsert() // Dekorator koji označava metodu koja se poziva nakon umetanja entiteta u bazu podataka
    logInsert(){
        console.log(`New user inserted with id: ${this.id}`);
    }

    @AfterUpdate() // Dekorator koji označava metodu koja se poziva nakon ažuriranja entiteta u bazi podataka
    logUpdate(){
        console.log(`User updated with id: ${this.id}`);
    }

    @AfterRemove() // Dekorator koji označava metodu koja se poziva nakon uklanjanja entiteta iz baze podataka
    logRemove(){
        console.log(`User removed with id: ${this.id}`);
    }
}