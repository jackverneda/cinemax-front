import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DialogSelectSeat, PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment.routing';
import { ContactComponent } from '../shared/contact/contact.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [PaymentComponent, DialogSelectSeat],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    PaymentRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ContactComponent,
    MatDialogModule,
    MatToolbarModule,
  ],
})
export class PaymentModule {}
