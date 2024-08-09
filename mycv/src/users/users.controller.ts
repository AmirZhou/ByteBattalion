import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Query,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';
import { UserNotFoundException } from 'src/exceptions';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

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

  @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    console.log('handler is running');
    try {
      return await this.usersService.findOneBy(id);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Something wrong internally',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.usersService.remove(id);
    } catch (error) {
      if (error instanceof UserNotFoundException) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(
        'Something went wrong from our side',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
