import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search.routing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MovieListComponent } from '../components/movie-list/movie-list.component';
import { ContactComponent } from '../shared/contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatChipsModule,
    SearchRoutingModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MovieListComponent,
    MatFormFieldModule,
    MatInputModule,
    ContactComponent,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
