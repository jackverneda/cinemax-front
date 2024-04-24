import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MadeQueriesComponent } from './made-queries.component';

const routes: Routes = [
  {
    path:'',
    component: MadeQueriesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MadeQueriesRoutingModule { }
