import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoomTypeComponent } from './admin-room-type.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRoomTypeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoomTypeRoutingModule {}
