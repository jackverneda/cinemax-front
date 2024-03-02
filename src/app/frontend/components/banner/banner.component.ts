import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent {
  public config: SwiperOptions;
  public dataImages: any[];

  constructor() {
    register();
    this.config = {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      spaceBetween: 0,
      navigation: true,
      autoplay: {
        delay: 3000,
      },
      pagination: { bulletActiveClass: 'swiper-pagination-bullet-active', clickable: true },
      scrollbar: { draggable: true },
    };
    this.dataImages = [{ file: '../../../../assets/images/movies/wonka.jpeg' }, { file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg' }];
  }
}
