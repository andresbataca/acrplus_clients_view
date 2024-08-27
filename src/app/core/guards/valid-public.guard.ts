import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { map, tap } from 'rxjs';

export const validPublicGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

const checkAuthStatus = () => {
  const authService = inject(AuthService);
  const router = inject(Router)

  return authService.validationToken()
    .pipe(
      tap( ),
      tap( isAuthenticated => {
        if ( isAuthenticated ) {
          router.navigate(['./home'])
        }
      }),
     map( isAuthenticated => !isAuthenticated )
    )

}
