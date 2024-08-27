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
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto, SignInDto } from './dtos';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserExceptionsFilter } from 'src/exceptions';

@Controller('auth')
@UseFilters(UserExceptionsFilter)
@UseInterceptors(new SerializeInterceptor<UserDto>(UserDto))
// @Serialize(UserDto)   the above long code could be simplified to this,
//if I do a easy custom decorator in the intercepter file
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signUp(
      createUserDto.email,
      createUserDto.password,
    );
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.singIn(signInDto.email, signInDto.password);
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.findBy(email);
  }

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneBy(id);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
