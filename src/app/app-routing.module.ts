import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./frontend/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'movie',
    loadChildren: () => import('./frontend/movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./frontend/search/search.module').then((m) => m.SearchModule),
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
