import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service'; // Importujemo PowerService za dependency injection    

@Injectable()
export class DiskService {
    constructor(private powerService: PowerService) {} //Dependency Injection

    getData(){
      console.log('Drawing 20 wats of power from the power service...');
      this.powerService.supplyPower(20); // Koristimo PowerService da obezbedimo snagu
      return "Data!";
    }
}
