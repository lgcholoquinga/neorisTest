import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'environments/environment';

/**
 * Add extra headers to http requests
 *
 * @param req Request Http
 * @param next Next conditional
 * @returns Request with extra headers
 */
export const headersApiInterceptor: HttpInterceptorFn = (req, next) => {
  const authorId = environment.AUTHOR_ID;

  let clonedRequest = req.clone({
    setHeaders: {
      authorId: authorId,
    },
  });

  return next(clonedRequest);
};
