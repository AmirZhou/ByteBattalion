import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReportDto, ApproveReportDto } from './dtos';
import { Report } from './report.entity';
import { User } from '../../src/users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

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

  async createEstimate(getEstimateDto: GetEstimateDto) {
    const { model, make, lng, lat, year, mileage } = getEstimateDto;
    const result = await this.repo
      .createQueryBuilder('report')
      .select('AVG(report.price)', 'averagePrice')
      .where({ make: make, model: model })
      .andWhere('report.lng BETWEEN :lngStart AND :lngEnd', {
        lngStart: lng - 5,
        lngEnd: lng + 5,
      })
      .andWhere('report.lat BETWEEN :latStart AND :latEnd', {
        latStart: lat - 5,
        latEnd: lat + 5,
      })
      .andWhere('report.year BETWEEN :yearStart AND :yearEnd', {
        yearStart: year - 3,
        yearEnd: year + 3,
      })
      .orderBy('ABS(report.mileage - :reportMileage)', 'ASC')
      .setParameter('reportMileage', mileage)
      .limit(3)
      .getRawOne();

    if (!result) {
      throw new HttpException('no matching reports', HttpStatus.NOT_FOUND);
    }
    return result;
  }
}
