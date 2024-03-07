import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { MatButtonModule } from '@angular/material/button';
import Swiper from 'swiper';

@Component({
  selector: 'app-carrusel-clasicos',
  standalone: true,
  templateUrl: './carrousel-clasicos.component.html',
  styleUrl: 'carrousel-clasicos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule],
  
})
export class CarrouselClasicos {
  public config;
  public dataImages: any[];

  constructor() {
    register();
    this.config = {
      slidesPerView: 5,
      direction: 'horizontal',
      loop: true,
      spaceBetween: '30px',
      navigation: true,
      pagination: { bulletActiveClass: 'swiper-pagination-bullet-active', clickable: true },
      
    };
    this.dataImages = [
      { file: '../../../../assets/images/movies/wonka.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' },
      { file: '../../../../assets/images/movies/wonka.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' },
      { file: '../../../../assets/images/movies/wonka.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' },
      { file: '../../../../assets/images/movies/wonka.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' }
    ];
  }
  
}
