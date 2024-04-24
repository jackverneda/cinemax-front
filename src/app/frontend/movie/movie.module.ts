import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MovieComponent } from './movie.component';
import { MovieRoutingModule } from './movie.routing';
import { MatChipsModule } from '@angular/material/chips';

import { MovieRoomsComponent } from '../components/movie-salas/movie-rooms.component';
import { ContactComponent } from '../shared/contact/contact.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MovieRoutingModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MovieRoomsComponent,
    ContactComponent,
  ],
})
export class MovieModule {}
