import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-carrousel',
  standalone: true,
  templateUrl: './carrousel.component.html',
  styleUrl: 'carrousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule],
})
export class CarrouselComponent {
  public dataImages: any[];

  constructor() {
    register();
    this.dataImages = [
      {
        file: '../../../../assets/images/movies/rwrb.jpeg',
      },
      {
        file: '../../../../assets/images/movies/saltburn.jpeg',
      },
      {
        file: '../../../../assets/images/movies/thehungergames.jpeg',
      },
      {
        file: '../../../../assets/images/movies/avatar.jpeg',
      },
      {
        file: '../../../../assets/images/movies/avatar.jpeg',
      },
    ];
  }
}
