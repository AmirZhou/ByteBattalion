import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Controller('users')
export class UsersController {
  // GET /users/id
  // POST /users
  // PATCH /users/id
  // DELETE /users/id
  // GET /users or /users?role=value1&age=value2
  constructor(private usersServices: UsersService) {}

  @Get()
  findAll(@Query('role') role?: `INTERN` | 'ADMIN' | 'SDE') {
    return this.usersServices.findAll(role);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.findById(id);
  }

  @Post()
  create(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    this.usersServices.create(createUserDto);
    return createUserDto;
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
  ) {
    this.usersServices.update(id, userUpdate);
    return { id, ...userUpdate };
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersServices.delete(id);
  }
}
