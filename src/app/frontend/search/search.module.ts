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

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatChipsModule,
    SearchRoutingModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MovieListComponent,
  ],
  exports: [SearchComponent],
})
export class SearchModule {}
