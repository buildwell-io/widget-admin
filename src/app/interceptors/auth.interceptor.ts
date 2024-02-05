import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('intercepted');
  /*
      usage:
      this.http.get(url, {headers:{skip:"true"}});
   */
  if (req.headers.get('skip')) {
    return next(req);
  } else {
    // do checking
    return next(req); // || unauthorize and redirect client to main page
  }
};
