import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationRoutingModule } from './authentication.routing';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// --------MATERIAL MODULES------- //
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RegisterComponent } from './register/register.component';
// import { ActivateAccountComponent } from './activate-account/activate-account.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { CookieService } from 'ngx-cookie-service';
// import { SafeHtmlPipe } from './safe-html.pipe';
// import { RunScriptsDirective } from './runScript.directive';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,

    // Material Modules
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  exports: [],
  declarations: [
    AuthenticationComponent,
    // SafeHtmlPipe,
    LoginComponent,
    // ForgotPasswordComponent,
    // ActivateAccountComponent,
    RegisterComponent,
    // RunScriptsDirective,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
  // providers: [
  // CookieService,
  // SafeHtmlPipe,
  // RunScriptsDirective,
  // ],
})
export class AuthenticationModule {}
