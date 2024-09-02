import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Session } from './session.guard';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { session?: Session }>();

    return new Observable((subscriber) => {
      if (!request.session || !request.session.isAdmin) {
        subscriber.error(
          new HttpException("you ain't an admin", HttpStatus.FORBIDDEN),
        );
      }
      subscriber.next(true);
      subscriber.complete();
    });

  }
}
