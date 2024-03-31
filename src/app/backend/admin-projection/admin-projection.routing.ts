import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminProjectionComponent } from './admin-projection.component';

const routes: Routes = [
  {
    path: '',
    component: AdminProjectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProjectionRoutingModule {}
