import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto, ApproveReportDto } from './dtos';
import { Report } from './report.entity';
import { User } from '../../src/users/user.entity';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  async create(
    createReportDto: CreateReportDto,
    user: User,
  ): Promise<Report> | null {
    const report = this.repo.create({ ...createReportDto, user });
    return await this.repo.save(report);
  }

  async findOne(id: number): Promise<Report> | null {
    const report = await this.repo.findOneBy({ id: id });
    if (!report) {
      throw new HttpException(
        `no such report with id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return report;
  }

  async approve(approveReportDto: ApproveReportDto, id: number) {
    const report = await this.findOne(id);
    report.approved = approveReportDto.approved;
    return await this.repo.save(report);
  }
}
