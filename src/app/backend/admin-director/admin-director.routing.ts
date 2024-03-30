import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDirectorComponent } from './admin-director.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDirectorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDirectorRoutingModule {}
