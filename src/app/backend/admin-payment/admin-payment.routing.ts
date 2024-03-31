import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPaymentComponent } from './admin-payment.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPaymentRoutingModule {}
