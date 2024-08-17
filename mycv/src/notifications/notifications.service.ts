import { Injectable } from '@nestjs/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class NotificationsService {
  getNotifications(): Observable<string> {
    return interval(1000).pipe(map((val) => `Notification ${val + 1}`));
  }
}
