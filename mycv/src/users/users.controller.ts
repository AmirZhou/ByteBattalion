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
  UseInterceptors,
  UseFilters,
  Session, // this works with session object.
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto, SignInDto } from './dtos';
import { UsersService } from './users.service';
import { SerializeInterceptor } from 'src/interceptors';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserExceptionsFilter } from 'src/exceptions';
import { CurrentUser } from 'src/custom-decorators';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Controller('auth')
@UseFilters(UserExceptionsFilter)
@UseInterceptors(new SerializeInterceptor<UserDto>(UserDto), CurrentUserInterceptor)
// @Serialize(UserDto)   the above long code could be simplified to this,
//if I do a easy custom decorator in the intercepter file
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  // @Get('/whoami')
  // async whoAmI(@Session() session: any) {
  //   if (!session || !session.userId) {
  //     throw new BadRequestException();
  //   }
  //   return this.usersService.findOneBy(session.userId);
  // }

  // Rather than dive into the session, we want to be declarative and use a custom decorator
  // CurrentUser to get the user object.
  @Get('/whoami')
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.signUp(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(
    @Body() signInDto: SignInDto,
    @Session() session: any,
  ): Promise<User> {
    const user = await this.authService.singIn(
      signInDto.email,
      signInDto.password,
    );
    session.userId = user.id;
    return user;
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
