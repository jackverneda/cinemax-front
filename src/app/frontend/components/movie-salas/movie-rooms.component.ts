import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { MatButtonModule } from '@angular/material/button';
import Swiper from 'swiper';

@Component({
  selector: 'app-movie-rooms',
  standalone: true,
  templateUrl: './movie-rooms.component.html',
  styleUrl: './movie-rooms.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule],
})
export class MovieRoomsComponent {
  public config;
  public rooms: any[];

  constructor() {
    register();
    this.config = {
      slidesPerView: 5,
      direction: 'vertical',
      loop: true,
      spaceBetween: '0',
      navigation: true,
      pagination: { bulletActiveClass: 'swiper-pagination-bullet-active', clickable: true },
    };
    this.rooms = [
      {
        room: 1,
        seats: 5,
        hour: 18,
        day: 20,
        month: 2,
        year: 2024,
        desc: 'Dobly Atmos Sorrounding Sound',
        price: 15,
      },
      {
        room: 2,
        seats: 5,
        hour: 8,
        day: 20,
        month: 2,
        year: 2024,
        desc: 'Dobly Atmos Sorrounding Sound',
        price: 10,
      },
      {
        room: 3,
        seats: 5,
        hour: 8,
        day: 20,
        month: 2,
        year: 2024,
        desc: 'Dobly Atmos Sorrounding Sound',
        price: 20,
      },
      {
        room: 4,
        seats: 5,
        hour: 8,
        day: 20,
        month: 2,
        year: 2024,
        desc: 'Sin aire acondicionado, hay q joderse',
        price: 15,
      },
      {
        room: 5,
        seats: 5,
        hour: 8,
        day: 20,
        month: 2,
        year: 2024,
        desc: 'Sala 3D',
        price: 5,
      },
      {
        room: 6,
        seats: 5,
        hour: 8,
        day: 20,
        month: 2,
        year: 2024,
        desc: 'Sin asientos, es de pie',
        price: 15,
      },
    ];
  }
}
