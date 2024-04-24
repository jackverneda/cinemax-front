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
  public dataImagesU: any[];
  public dataImagesD: any[];

  constructor() {
    register();
    this.dataImagesU = [
      { file: '../../../../assets/images/movies/avatarexp.jpeg' },
      { file: '../../../../assets/images/movies/mascara.jfif' },
      { file: '../../../../assets/images/movies/barbie.jpeg' },
      { file: '../../../../assets/images/movies/oppenheimer.jpeg' },
      { file: '../../../../assets/images/movies/wonka.jpeg' },
      { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' },
      { file: '../../../../assets/images/movies/rustin.jpeg' },
    ];
    this.dataImagesD = [
      { file: '../../../../assets/images/movies/indiana.jpg' },
      { file: '../../../../assets/images/movies/inception.jpeg' },
      { file: '../../../../assets/images/movies/startwarscover.jpeg' },
      { file: '../../../../assets/images/movies/saw.jpeg' },
      { file: '../../../../assets/images/movies/themaskcover.jpeg' },
      { file: '../../../../assets/images/movies/rustin.jpeg' },
      { file: '../../../../assets/images/movies/forrestgump.jfif' },
    ];
  }
}
