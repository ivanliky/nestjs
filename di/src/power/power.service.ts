import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
    supplyPower(watts: number): string {
        return 'Powering with ' + watts + ' watts!';
    }
}
