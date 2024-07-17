import { HttpException, HttpStatus } from '@nestjs/common';

export class KingAmirException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
