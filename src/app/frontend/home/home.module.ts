import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BannerComponent } from '../components/banner/banner.component';
import { HomeRoutingModule } from './home.routing';
import { CarrouselComponent } from '../components/carrousel/carrousel.component';
import { CarrouselClasicos } from '../components/carrousel-clasicos/carrousel-clasicos.component';
import { Promo } from '../components/promo/promo.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule,CarrouselClasicos, Promo, BannerComponent, CarrouselComponent],
  exports: [HomeComponent],
})
export class HomeModule {}