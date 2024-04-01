import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ProjectionComponent } from './projection.component';
import { PaymentRoutingModule } from './projection.routing';
import { ContactComponent } from '../shared/contact/contact.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MovieRoomsComponent } from '../components/movie-salas/movie-rooms.component';

@NgModule({
  declarations: [ProjectionComponent],
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
    MatToolbarModule,
    MatDatepickerModule,
    MovieRoomsComponent,
  ],
  providers: [provideNativeDateAdapter()],
})
export class ProjectionModule {}
