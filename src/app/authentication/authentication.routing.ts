import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
// import { ActivateAccountComponent } from './activate-account/activate-account.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
      },
      {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
