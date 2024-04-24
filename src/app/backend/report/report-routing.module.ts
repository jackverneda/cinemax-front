import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'made-queries',
  //   loadChildren: () => import('./made-queries/made-queries.module').then((m) => m.MadeQueriesModule),
  // },
  {
    path: 'amount-collected',
    loadChildren: () => import('./amount-collected/amount-collected.module').then((m) => m.AmountCollectedModule),
  },
  // {
  //   path: 'registered-users',
  //   loadChildren: () => import('./registered-users/registered-users.module').then((m) => m.RegisteredUsersModule),
  // },
  // {
  //   path: 'query-by-specalist',
  //   loadChildren: () => import('./query-by-specialist/query-by-specialist.module').then((m) => m.QueryBySpecialistModule),
  // },
  // {
  //   path: 'reply-time',
  //   loadChildren: () => import('./reply-time/reply-time.module').then((m) => m.ReplyTimeModule),
  // },
  // {
  //   path: 'answer-quality',
  //   loadChildren: () => import('./answer-quality/answer-quality.module').then((m) => m.AnswerQualityModule),
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
