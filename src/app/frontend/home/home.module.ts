import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { BannerComponent } from '../components/banner/banner.component';
import { HomeRoutingModule } from './home.routing';
import { CarrouselComponent } from '../components/carrousel/carrousel.component';
import { CarrouselRightComponent } from '../components/carrousel-right/carrousel-right.component';
import { CarrouselClasicos } from '../components/carrousel-clasicos/carrousel-clasicos.component';
import { PromoComponent } from '../components/promo/promo.component';
import { MovieListComponent } from '../components/movie-list/movie-list.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CarrouselRightComponent,
    CarrouselClasicos,
    PromoComponent,
    BannerComponent,
    CarrouselComponent,
    MovieListComponent,
  ],
})
export class HomeModule {}
