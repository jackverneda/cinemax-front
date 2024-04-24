import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './admin-user.routing';

// import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { DialogAddEditUserComponent } from './create-user-dialog/create-user-dialog.component';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialUtilsModule } from '../shared/material-utils/material-utils.module';
import { AdminUserComponent } from './admin-user.component';

@NgModule({
  declarations: [AdminUserComponent, DialogAddEditUserComponent],

  imports: [CommonModule, UsersRoutingModule, MaterialUtilsModule, FormsModule, ReactiveFormsModule],
  providers: [
    // {
    // provide: MatPaginatorIntl,
    // useClass: CustomMatPaginatorIntl,
    // },
  ],
})
export class AdminUserModule {}
