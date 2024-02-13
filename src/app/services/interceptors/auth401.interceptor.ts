import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { EventData } from '../shared/event.class';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { AuthService } from '../auth.service';
import { EventBusService } from '../shared/event-bus.service';

export const auth401Interceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const authService = inject(AuthService);
  const eventBusService = inject(EventBusService);

  return next(req).pipe(catchError((error) => {
    if (error instanceof HttpErrorResponse
      && error.status === 401
      && !req.url.includes('authentication/refresh')) {
      // POST /refresh
      return authService.refreshToken()
        .pipe(
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 403) {
              eventBusService.emit(new EventData('logout', null));
            }
            return throwError(() => error);
          }),
          switchMap((data) => {
            storageService.saveTokens(data);
            req.headers.set('Authorization', `Bearer ${data.access.token}`);
            return next(req);
          }),
        );
    }
    return next(req);
  }));
};
