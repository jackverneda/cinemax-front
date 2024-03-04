import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MovieComponent } from './movie.component';

@NgModule({
  declarations: [MovieComponent],
  imports: [BrowserModule, RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
  exports: [MovieComponent],
})
export class MovieModule {}
