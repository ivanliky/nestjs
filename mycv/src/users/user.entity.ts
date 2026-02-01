import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Oznacava klasu kao TypeORM entitet (tabelu u bazi podataka)
export class User {
    @PrimaryGeneratedColumn() // Primarni ključ koji se automatski generiše
    id: number;
    @Column() // Obična kolona u tabeli
    email: string;
    @Column()
    password: string;
}