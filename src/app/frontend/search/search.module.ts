import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search.routing';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, SearchRoutingModule, RouterModule, MatButtonModule, MatDividerModule, MatIconModule],
  exports: [SearchComponent],
})
export class SearchModule {}
