import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'movies/:id',
        loadChildren: () => import('./movie/movie.module').then((m) => m.MovieModule),
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'payments/:id',
        loadChildren: () => import('./payment/payment.module').then((m) => m.PaymentModule),
      },
      {
        path: 'projections',
        loadChildren: () => import('./projection/projection.module').then((m) => m.ProjectionModule),
      },
      { path: '**', redirectTo: '/frontend/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {}
