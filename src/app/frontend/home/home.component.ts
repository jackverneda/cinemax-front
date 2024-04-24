import { Component } from '@angular/core';
import { MovieService } from '../core/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {
  movies: any[] = [];
  searchResults = [];
  constructor(private movieService: MovieService) {
    this.movieService.getAll().subscribe((data: any) => {
      this.movies = data.slice(0, 5);
    });
  }
}
