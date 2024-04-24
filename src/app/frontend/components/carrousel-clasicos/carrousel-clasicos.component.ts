import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { MatButtonModule } from '@angular/material/button';
import Swiper from 'swiper';
import { MovieService } from '../../core/services/movie.service';
import { da } from '../../../../../dist/cinemax-front/browser/chunk-T5IL2VME';

@Component({
  selector: 'app-carrusel-clasicos',
  standalone: true,
  templateUrl: './carrousel-clasicos.component.html',
  styleUrl: 'carrousel-clasicos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule],
})
export class CarrouselClasicos {
  public dataImagesU!: any[];
  public dataImagesD!: any[];

  constructor(private movieService: MovieService) {
    register();
    this.movieService.getAll().subscribe((data: any) => {
      let i = 0;
      this.dataImagesD = data.filter((movie: any) => {
        i & 1;
        i++;
        return i & 1;
      });
      this.dataImagesD = data.filter((movie: any) => {
        !(i & 1);
        i++;
        return i & 1;
      });
    });
  }
}
