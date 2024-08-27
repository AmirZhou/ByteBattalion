import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  UserNotFoundException,
  PasswordIncorrectException,
  EmailAlreadyExistsException,
} from './index';
import { Request, Response } from 'express';

@Catch(
  UserNotFoundException,
  PasswordIncorrectException,
  EmailAlreadyExistsException,
)
export class UserExceptionsFilter implements ExceptionFilter {
  catch(
    exception:
      | UserNotFoundException
      | PasswordIncorrectException
      | EmailAlreadyExistsException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number;

    switch (exception.constructor) {
      case UserExceptionsFilter:
        status = HttpStatus.NOT_FOUND;
        break;
      case PasswordIncorrectException:
        status = HttpStatus.BAD_REQUEST;
        break;
      case EmailAlreadyExistsException:
        status = HttpStatus.CONFLICT;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
