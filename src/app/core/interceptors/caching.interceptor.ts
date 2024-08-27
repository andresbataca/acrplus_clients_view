import { HttpResponse, type HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { CacheService } from '../services/cache.service';
import { inject } from '@angular/core';
import { filter, of, tap } from 'rxjs';


export const cachingInterceptor: HttpInterceptorFn = (req, next) => {

  const cache = inject(CacheService);

  if (!cache.isCacheable(req)) {
    return next(req);
  }

  const cacheKey = req.urlWithParams;


  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse && cachedResponse.type !== 0) {
    // console.log((cachedResponse));
    return of(cachedResponse);
  }

  return next(req).pipe(
    // filter((event) => event instanceof HttpResponse && event.status === 200),
    tap((response) => {
      cache.set(cacheKey, response)
    })
  );
}


// const isCacheable = req.method === 'GET';
// console.log(isCacheable);

// if (!isCacheable) {
//   return next(req);
// }

// const cacheKey = req.urlWithParams;
// console.log(cacheKey);


// const cachedResponse = cache.get(cacheKey);
// console.log(cachedResponse);

// if (cachedResponse) {
//   return of(cachedResponse)
// }

//   return next(req).pipe(
//   filter((event)=> event instanceof HttpResponse && event.status === 200),
//   tap((response:any) => {
//     cache.set(cacheKey, response)
//   })
// );
