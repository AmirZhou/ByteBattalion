import { Injectable } from '@nestjs/common';
import { PowerService } from 'src/power/power.service';

@Injectable()
export class CpuService {
  constructor(public powerService: PowerService) {}

  compute(a: number, b: number) {
    console.log(`drawing ${a + b} watts from power service`);
    this.powerService.supplyPower(a + b);
    return a + b;
  }
}
