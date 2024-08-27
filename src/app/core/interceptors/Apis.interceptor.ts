import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

export const apisInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  const token = auth.usuario.tokenUser;

  let headers: { [key: string]: string } = {
    'Token-Client': 'f1aa966c6bff1285cc4b052ef43a513f24337b790d106d5aec3e4a11525a2206',
    'ID-Client': 'MQ==',
    'Content-Type': 'application/x-www-form-urlencoded'
  }

  if (token) {
    headers['Authorization-token'] = token;
  }

  const newReq = req.clone({
    setHeaders: headers
  })

  return next(newReq);
};
