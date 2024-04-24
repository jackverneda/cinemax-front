import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { MatButtonModule } from '@angular/material/button';
import Swiper from 'swiper';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-rooms',
  standalone: true,
  templateUrl: './movie-rooms.component.html',
  styleUrl: './movie-rooms.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule, CommonModule],
})
export class MovieRoomsComponent {
  public config;
  @Input() public showTitle = false;
  @Input() public rooms: any[] = [];

  constructor(private router: Router) {
    register();
    this.config = {
      slidesPerView: 5,
      direction: 'vertical',
      loop: true,
      spaceBetween: '0',
      navigation: true,
      pagination: { bulletActiveClass: 'swiper-pagination-bullet-active', clickable: true },
    };
  }
  onNvaigatePayment(projection: any) {
    this.router.navigate(['frontend/payments/' + projection.id]);
  }
}
