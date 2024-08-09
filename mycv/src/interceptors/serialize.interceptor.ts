import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { LogClassName } from 'src/custom-decorators';

@LogClassName()
@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Run something before a request is handled
    // be the request handler
    console.log('SerializeInterceptor is running\n');

    return next.handle().pipe(
      map((data: any) => {
        //Run something before the response is sent out
        console.log("\nI'm running before response is sent out");
      }),
    );
  }
}
