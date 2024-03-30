import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmountCollectedComponent } from './amount-collected.component';

const routes: Routes = [
  {
    path: '',
    component: AmountCollectedComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmountCollectedRoutingModule { }
