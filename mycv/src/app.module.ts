import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
// import { CookieSessionModule } from 'nestjs-cookie-session';

@Module({
  imports: [
    UsersModule,
    ReportsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    // CookieSessionModule.forRoot({
    //   session: {secret: 'amir'}
    // })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
