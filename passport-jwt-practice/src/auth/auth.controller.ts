import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { LocalGuard } from './guards';

@Controller('auth')
export class AuthController {
  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    return req.user; // you have to install the type package for user.
  }
}
