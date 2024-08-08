import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto.email, createUserDto.password);
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.findBy(email);
  }

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneBy(id);
  }
}
