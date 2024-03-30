import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminCountryComponent } from './admin-country.component';

const routes: Routes = [
  {
    path: '',
    component: AdminCountryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminCountryRoutingModule {}
