import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoomComponent } from './admin-room.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoomRoutingModule {}
