
// Importujemo Injectable dekorator iz NestJS-a i metode za rad sa fajlovima iz Node.js.
import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

// @Injectable() dekorator označava da se ova klasa može koristiti za dependency injection.
@Injectable() // oznacavamo da se klasa koristi za dependency injection
// Repozitorijum sadrži metode za rad sa podacima o porukama (čuvanje, čitanje, kreiranje).
export class MessagesRepository{


    /**
     * Vraća jednu poruku na osnovu ID-ja.
     * Čita sve poruke iz fajla, parsira ih i vraća poruku sa zadatim ID-jem.
     */
    async findOne(id: string){
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        return messages[id];
    }


    /**
     * Vraća sve poruke.
     * Čita i parsira ceo JSON fajl sa porukama.
     */
    async findAll(){
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        return messages;
    }


    /**
     * Kreira novu poruku sa prosleđenim sadržajem.
     * Generiše nasumičan ID, dodaje poruku u objekat i upisuje sve poruke nazad u fajl.
     */
    async create(content: string){
        const contents = await readFile('messages.json', 'utf8');
        const messages = JSON.parse(contents);
        const id = Math.floor(Math.random() * 999);
        messages[id] = { id, content };

        await writeFile('messages.json', JSON.stringify(messages));
    }

}