import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthPayloadDto } from './dtos';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  login(@Body() authPayload: AuthPayloadDto) {
    console.log('login: ');
    const userJwt = this.authService.validateUser(authPayload);
    if (!userJwt) {
      throw new HttpException('false credential', HttpStatus.UNAUTHORIZED);
    }
    return userJwt;
  }
}
