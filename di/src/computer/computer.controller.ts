import { Controller, Get } from '@nestjs/common';
import { CpuService } from 'src/cpu/cpu.service'; // Importujemo CpuService
import { DiskService } from 'src/disk/disk.service'; // Importujemo DiskService

@Controller('computer') // Dekorator @Controller postavlja osnovni URL path na 'computer'
export class ComputerController {
    constructor(
        private cpuService: CpuService, // Injectujemo CpuService
        private diskService: DiskService // Injectujemo DiskService
    ){}

    @Get() // Mapiramo GET zahteve na ovu metodu
    run(){
        return [
            this.cpuService.compute(1, 2), // Pozivamo metodu compute iz CpuService
            this.diskService.getData() // Pozivamo metodu getData iz DiskService
        ]
    }
}
