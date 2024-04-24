import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-carrousel-right',
  standalone: true,
  templateUrl: './carrousel-right.component.html',
  styleUrl: 'carrousel-right.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule, MatIconModule],
})
export class CarrouselRightComponent {
  public dataImages: any[];

  constructor() {
    register();
    this.dataImages = [
      {
        file: '../../../../assets/images/eventos/pexels-askar-abayev-6189930.jpg',
        desc: 'Para recordar los acontecimientos y personas importantes en la historia de la diáspora africana.',
        name: 'Mes de la Historia Negra',
      },
      {
        file: '../../../../assets/images/eventos/pexels-nicolas-2267348.jpg',
        desc: 'Evento creado para los amantes del buceo y la pesca, maximo de tres lineas no mas, y el tamaño del card se mantiene',
        name: 'La France à Cuba',
      },
      {
        file: '../../../../assets/images/eventos/pexels-anete-lusina-5721293.jpg',
        desc: 'En conmemoración al los disturbios de Stonewall de 1969, este Junio celebremos de qué nos setimos orgullosos',
        name: 'Mes del Orgullo',
      },
      {
        file: '../../../../assets/images/eventos/pexels-mehmet-turgut-kirkgoz-16580375.jpg',
        desc: 'Celebremos la Cultura cubana este octubre por lo alto con nuestra programacion ',
        name: 'Cuba en nuestra sangre',
      },
    ];
  }
}
