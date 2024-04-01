import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnswerQualityComponent } from './answer-quality.component';

const routes: Routes = [
  {
    path: '',
    component: AnswerQualityComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswerQualityRoutingModule { }
