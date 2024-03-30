import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGenreComponent } from './admin-genre.component';

const routes: Routes = [
  {
    path: '',
    component: AdminGenreComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminGenreRoutingModule {}
