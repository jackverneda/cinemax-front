// import { HttpErrorInterceptorService } from './../core/services/interceptors/http-error-interceptor.service';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
// import { BackendGuard } from './backend.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'movies',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-movie/admin-movies.module').then((m) => m.AdminMoviesModule),
      },
      {
        path: 'actors',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-actor/admin-actor.module').then((m) => m.AdminActorModule),
      },
      {
        path: 'directors',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-director/admin-director.module').then((m) => m.AdminDirectorModule),
      },
      {
        path: 'countries',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-country/admin-country.module').then((m) => m.AdminCountryModule),
      },
      {
        path: 'genres',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-genre/admin-genre.module').then((m) => m.AdminGenreModule),
      },
      {
        path: 'roomTypes',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-room-type/admin-room-type.module').then((m) => m.AdminRoomTypeModule),
      },
      {
        path: 'rooms',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-room/admin-room.module').then((m) => m.AdminRoomModule),
      },
      {
        path: 'report',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./report/report.module').then((m) => m.ReportModule),
      },
      {
        path: 'projections',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-projection/admin-projection.module').then((m) => m.AdminProjectionsModule),
      },
      {
        path: 'payment',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-payment/admin-payment.module').then((m) => m.AdminPaymentModule),
      },
      {
        path: 'discount',
        // canActivate: [BackendGuard],
        // data: {
        //   permissionName: [0],
        // },
        loadChildren: () => import('./admin-discount/admin-discount.module').then((m) => m.AdminDiscountModule),
      },
      // {
      //   path: 'logs',
      //   // canActivate: [BackendGuard],
      //   data: {
      //     permissionName: [0],
      //   },
      //   loadChildren: () =>
      //     import('./appBackoffice/admin-logs/admin-logs.module').then(
      //       (m) => m.AdminLogsModule
      //     ),
      // },
      {
        path: 'users',
        loadChildren: () => import('./admin-user/admin-user.module').then((m) => m.AdminUserModule),
      },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('./appBackoffice/profile/profile.module').then(
      //       (m) => m.ProfileModule
      //     ),
      // },
      // {
      //   path: 'error',
      //   loadChildren: () =>
      //     import('../error/error.module').then((m) => m.ErrorModule),
      // },
      // {
      //   path: 'configuration',
      //   loadChildren: () =>
      //     import('./appBackoffice/configuration/configuration.module').then(
      //       (m) => m.ConfigurationModule
      //     ),
      // },
      // {
      //   path: 'client-service',
      //   // canActivate: [BackendGuard],
      //   data: {
      //     permissionName: [0],
      //   },
      //   // tslint:disable-next-line: max-line-length
      //   loadChildren: () =>
      //     import(
      //       './appBackoffice/admin-service-client/admin-service-client.module'
      //     ).then((m) => m.AdminServiceClientModule),
      // },
    ],
  },
  {
    path: '**',
    redirectTo: 'movies',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     // useClass: HttpErrorInterceptorService,
  //     multi: true,
  //   },
  // ],
})
export class BackendRoutingModule {}
