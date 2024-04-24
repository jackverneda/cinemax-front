import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReplyTimeComponent } from './reply-time.component';

const routes: Routes = [
  {
    path: '',
    component: ReplyTimeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReplyTimeRoutingModule { }
