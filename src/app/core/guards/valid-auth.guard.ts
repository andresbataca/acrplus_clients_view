import type { CanMatchFn } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { inject } from '@angular/core';

export const validAuthGuard: CanMatchFn = () => {
  const authService = inject(AuthService);

  return authService.validationToken();
};
