import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apisInterceptor } from './core/interceptors/Apis.interceptor';
import { cachingInterceptor } from './core/interceptors/caching.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([apisInterceptor,cachingInterceptor]
    ))

  ]
};
