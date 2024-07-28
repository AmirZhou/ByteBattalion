import { Injectable } from '@nestjs/common';
import { DiskService } from 'src/disk/disk.service';
import { CpuService } from 'src/cpu/cpu.service';

@Injectable()
export class ComputerService {
  constructor(
    private diskService: DiskService,
    private cpuService: CpuService,
  ) {}

  run() {
    return [this.cpuService.compute(5, 6), this.diskService.getData()];
  }
}
