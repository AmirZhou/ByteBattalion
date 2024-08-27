import {
  CanActivate,
  Injectable,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class SessionGuard<T extends Record<string, any> = {}>
  implements CanActivate
{
  constructor(private readonly requiredProperty: keyof T) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<Request & { session: T }>();
    const session = request.session;

    if (!session || !session[this.requiredProperty]) {
      throw new BadRequestException(
        `${String(this.requiredProperty)} not found in session`,
      );
    }
    return true;
  }
}
