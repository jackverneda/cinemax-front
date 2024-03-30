import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMoviesComponent } from './admin-movies.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMoviesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminMoviesRoutingModule {}
