import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BannerComponent } from './frontend/components/banner/banner.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, MatButtonModule, MatDividerModule, MatIconModule, BannerComponent],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync('noop')],
})
export class AppModule {}
