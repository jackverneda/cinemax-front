import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
////////// --------MATERIAL MODULES------- /////////////////////////

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
///////////////////////////////////////////////////////////////////
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatMenuModule,

    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  declarations: [ConfirmationDialogComponent, MenuListItemComponent],
  exports: [ConfirmationDialogComponent, MenuListItemComponent],
})
export class SharedModule {}
