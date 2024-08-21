import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service' ;
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), NotificationsModule], // This forFeature Thing returns a module
  providers: [UsersService],
  controllers: [UsersController],
  exports: [],
})
export class UsersModule {}
