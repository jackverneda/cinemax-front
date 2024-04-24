import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../core/services/movie.service';
@Component({
  selector: 'app-carrousel',
  standalone: true,
  templateUrl: './carrousel.component.html',
  styleUrl: 'carrousel.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule],
})
export class CarrouselComponent {
  public dataImages!: any[];

  constructor(private movieService: MovieService) {
    register();
    this.movieService.getAll().subscribe((data: any) => {
      this.dataImages = data;
    });
  }
}
