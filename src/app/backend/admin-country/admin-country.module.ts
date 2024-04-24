// import { FileUploadModule } from './../../file-upload/file-upload.module';
import { MatStepperModule } from '@angular/material/stepper';
import { DialogAddEditCountryComponent } from './dialog-add-edit-country/dialog-add-edit-country.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
////////// --------MATERIAL MODULES------- /////////////////////////
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { AdminCountryRoutingModule } from './admin-country.routing';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { MatNativeDateModule } from '@angular/material/core';
///////////////////////////////////////////////////////////////////
import { MatChipsModule } from '@angular/material/chips';
import { AdminCountryComponent } from './admin-country.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatDividerModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    AdminCountryRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    // PipesModule,
    CKEditorModule,
    MatStepperModule,
    // FileUploadModule,
    MatChipsModule,
    SharedModule,
  ],
  declarations: [AdminCountryComponent, DialogAddEditCountryComponent],
  //   entryComponents: [],
})
export class AdminCountryModule {}
