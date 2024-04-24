import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';
import { MovieService } from '../../core/services/movie.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.component.html',
  styleUrl: 'banner.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule],
})
export class BannerComponent {
  public config: SwiperOptions;
  public dataImages!: any[];

  constructor(
    private movieService: MovieService,
    private router: Router,
  ) {
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
    this.movieService.getAll().subscribe((data: any) => {
      this.dataImages = data;
    });
  }
  onNavigateMovie(movie: any) {
    this.router.navigate([`frontend/movies/${movie.id}`]);
  }
}
