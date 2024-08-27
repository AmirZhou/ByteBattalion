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
    // By using filter, The following code is not necessary
    // try {
    //   return await this.authService.signUp(
    //     createUserDto.email,
    //     createUserDto.password,
    //   );
    // } catch (err) {
    //   if (err instanceof EmailAlreadyExistsException) {
    //     throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    //   }
    //   throw new HttpException(
    //     'Internal server error',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  @Post('/signin')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.singIn(signInDto.email, signInDto.password);

    // commented out due to filter
    // try {
    //   return await this.authService.singIn(signInDto.email, signInDto.password);
    // } catch (error) {
    //   if (error instanceof PasswordIncorrectException) {
    //     throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    //   } else {
    //     throw new HttpException(
    //       error.message,
    //       HttpStatus.INTERNAL_SERVER_ERROR,
    //     );
    //   }
    // }
  }

  @Get()
  async findAllUsers(@Query('email') email: string) {
    return await this.usersService.findBy(email);
  }

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOneBy(id);

    // try {
    //   return await this.usersService.findOneBy(id);
    // } catch (error) {
    //   if (error instanceof UserNotFoundException) {
    //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    //   }
    //   throw new HttpException(
    //     'Something wrong internally',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);

    // try {
    //   return await this.usersService.remove(id);
    // } catch (error) {
    //   if (error instanceof UserNotFoundException) {
    //     throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    //   }
    //   throw new HttpException(
    //     'Something went wrong from our side',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(id, updateUserDto);
  }
}
