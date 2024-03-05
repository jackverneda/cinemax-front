import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
  public config: SwiperOptions;
  public dataImages: any[];

  constructor() {
    register();
    this.config = {
      slidesPerView: 2,
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
    this.dataImages = [
      {
        file: '../../../../assets/images/movies/wonka.jpeg',
        desc: 'Armado únicamente con muchos sueños y ganas de aventura, el joven chocolatero Willy Wonka conoce a los oompa-loompas y se dispone a cambiar el mundo.',
        logo: '../../../../assets/images/movies/wonka.png',
      },
      {
        file: '../../../../assets/images/movies/thecolorpurplEXP.jpeg',
        desc: 'Separada de su hermana y sus hijos, Celie enfrenta muchas dificultades, incluido un marido abusivo. Con el apoyo de una cantante y su hijastra, finalmente encuentra una fuerza extraordinaria en los lazos inquebrantables de un nuevo tipo de hermandad.',
        logo: '../../../../assets/images/movies/thecolorpurplelogo.png',
      },
    ];
  }
}
