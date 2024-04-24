import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminActorComponent } from './admin-actor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminActorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminActorRoutingModule {}
