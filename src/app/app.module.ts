import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { BannerComponent } from './frontend/components/banner/banner.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MovieModule } from './frontend/movie/movie.module';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MovieModule,
    FooterComponent,
    AppRoutingModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    BannerComponent,
    NavbarComponent,
    MatSidenavModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync('noop')],
})
export class AppModule {}
