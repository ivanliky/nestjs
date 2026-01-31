import { Injectable } from '@nestjs/common';
import { PowerService } from '../power/power.service'; // Uvozimo PowerService iz Power modula

// @Injectable() dekorator označava da se ova klasa može koristiti za dependency injection.

@Injectable()
export class CpuService {
    
    constructor(private powerService: PowerService) {} // Injektuje PowerService u CpuService

    compute(a: number, b: number): number {
        console.log('Drawing 10 watts of powwer from PowerService...');
        this.powerService.supplyPower(10); // Koristi PowerService za oduzimanje snage
        return a + b;
    }
}
