import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Dekorator koji označava klasu kao TypeORM entitet (tabelu u bazi podataka)
export class Report {

    @PrimaryGeneratedColumn() // Dekorator koji označava primarni ključ koji se automatski generiše
    id: number;

    @Column() // Dekorator koji označava kolonu u bazi podataka
    price: number;
}