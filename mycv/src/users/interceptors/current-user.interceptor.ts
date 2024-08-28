import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';
// import { Observable } from 'rxjs';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UsersService) {}

  // I deleted the return type Observable here, what impact?
  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {}; // why make this OR assign

    // im not sure why we check session here, i think it feel more intuitive to put this in a guard?
    if (userId) {
      const user = await this.userService.findOneBy(userId);
      request.currentUser = user;
      // this id is not a number, what you gonna do
      // in a handler, i got parseint pipe, but right not i don't
    }

    return handler.handle();
  }
}
