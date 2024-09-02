import {
  CanActivate,
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';

export interface Session {
  userId?: number;
  isAdmin?: boolean;
}

@Injectable()
export class SessionGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Observable<boolean> | Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { session?: Session }>();

    return new Observable((subscriber) => {
      console.log('Nestjs subscribed to a guard');

      if (!request.session || !request.session.userId) {
        subscriber.error(new BadRequestException('go back home plz'));
        return;
      }

      setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      }, 5000);
    });
    // if(!request.session || !request.session.userId) {
    //   throw new BadRequestException("go back home plz")
    // }

    // return true;
  }
}

// @Injectable()
// export class SessionGuard<T extends Record<string, any> = {}>
//   implements CanActivate
// {
//   constructor(private readonly requiredProperty: keyof T) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context
//       .switchToHttp()
//       .getRequest<Request & { session: T }>();
//     const session = request.session;

//     if (!session || !session[this.requiredProperty]) {
//       throw new BadRequestException(
//         `${String(this.requiredProperty)} not found in session`,
//       );
//     }
//     return true;
//   }
// }
