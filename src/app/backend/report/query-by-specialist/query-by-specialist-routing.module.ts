import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QueryBySpecialistComponent } from './query-by-specialist.component';

const routes: Routes = [
  {
    path: '',
    component: QueryBySpecialistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QueryBySpecialistRoutingModule { }
