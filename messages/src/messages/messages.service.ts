
// Importujemo Injectable dekorator iz NestJS-a i repozitorijum za poruke.
import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable() // oznacavamo da se klasa koristi za dependency injection
// Servis sadrži poslovnu logiku za rad sa porukama i koristi repozitorijum za pristup podacima.
export class MessagesService{

    /**
     * Konstruktor prima instancu MessagesRepository preko dependency injection-a.
     * Omogućava servisu da koristi metode repozitorijuma za rad sa podacima.
     */
    constructor(public messagesRepo: MessagesRepository){} //Koristimo dependency injection


    // Vraća jednu poruku na osnovu ID-ja pozivajući metodu iz repozitorijuma.
    findOne(id: string){
        return this.messagesRepo.findOne(id);
    }



    // Vraća sve poruke pozivajući metodu findAll iz repozitorijuma.
    findAll(){
        return this.messagesRepo.findAll();
    }


    // Kreira novu poruku sa prosleđenim sadržajem koristeći repozitorijum.
    create(content: string){
        return this.messagesRepo.create(content);
    }

}