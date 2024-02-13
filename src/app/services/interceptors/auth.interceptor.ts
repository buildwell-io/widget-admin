import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { USER_TKNS } from '../../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('authentication/sign-in') || req.url.includes('authentication/sign-up')) {
    return next(req);
  }

  const ls = inject(DOCUMENT).defaultView!.sessionStorage;
  const token = ls.getItem(USER_TKNS) ? JSON.parse(ls.getItem(USER_TKNS)!).access.token : null;
  const refreshToken = ls.getItem(USER_TKNS) ? JSON.parse(ls.getItem(USER_TKNS)!).refresh.token : null;

  /*
      usage:
      this.http.get(url, {headers:{skip:"true"}});
   */
  if (req.url.includes('authentication/refresh')) {
    req.headers.set('Authorization', `Bearer ${refreshToken}`);
    return next(req);
  } else {
    if (req.headers.get('skip')) {
      return next(req);
    } else {
      if (token) {
        const cloned = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
        return next(cloned);
      } else {
        return next(req);
      }
    }
  }
};
