import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registro',
        component: RegisterComponent
      },
      {
        path: 'recovery',
        component: PasswordRecoveryComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
