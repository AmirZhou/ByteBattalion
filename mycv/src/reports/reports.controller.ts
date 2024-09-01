import { Controller, Post, Body, UseGuards, Get, UseInterceptors } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dtos';
import { SessionGuard } from '../guards/session.guard';
import { CurrentUser } from '../custom-decorators';
import { User } from '../users/user.entity';
import { SerializeInterceptor } from '../interceptors';
import { ReportDto} from './dtos'

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  @UseGuards(SessionGuard)
  @UseInterceptors(new SerializeInterceptor<ReportDto>(ReportDto))
  create(@Body() createReportDto: CreateReportDto, @CurrentUser() user: User) {
    return this.reportsService.create(createReportDto, user);
  }

  @Get()
  hello() {
    return 'hello world';
  }
}
