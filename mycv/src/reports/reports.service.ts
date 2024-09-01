import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto } from './dtos';
import { Report } from './report.entity';
import { User } from '../../src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(createReportDto: CreateReportDto, user: User) {
    const report = this.repo.create({ ...createReportDto, user });
    return this.repo.save(report);
  }
}
