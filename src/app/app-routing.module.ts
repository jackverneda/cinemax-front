import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: 'frontend',
    loadChildren: () => import('./frontend/frontend.module').then((m) => m.FrontendModule),
  },
  {
    path: 'backend',
    loadChildren: () => import('./backend/backend.module').then((m) => m.BackendModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  { path: '**', redirectTo: '/frontend' },
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
