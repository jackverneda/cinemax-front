import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminUserComponent } from './admin-user.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
