import { Routes } from '@angular/router';
import { validPublicGuard } from './core/guards/valid-public.guard';
import { validAuthGuard } from './core/guards/valid-auth.guard';
// import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
// import { PageNotFoundComponent } from './auth/pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES),
    canActivate:[validPublicGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.routes').then(m => m.HOME_ROUTES),
    canMatch:[validAuthGuard]
  },
  // {
  //   component:PageNotFoundComponent,
  //   path: '404',
  // },
  // {
  //   component:ResetPasswordComponent,
  //   path: 'reset-password',
  // },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

