import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto, ReportDto, ApproveReportDto } from './dtos';
import { SessionGuard } from '../guards/session.guard';
import { CurrentUser } from '../custom-decorators';
import { User } from '../users/user.entity';
import { SerializeInterceptor } from '../interceptors';
import { AdminGuard } from '../guards/admin.guard';

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

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  approve(
    @Body() approveReportDto: ApproveReportDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.reportsService.approve(approveReportDto, id);
  }
}
