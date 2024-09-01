import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos';
import { SessionGuard } from '../guards/session.guard';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(SessionGuard)
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportsService.create(createReportDto);
  }

  @Get()
  hello() {
    return 'hello world';
  }
}
