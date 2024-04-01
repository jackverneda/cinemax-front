import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../core/services/movie.service';
import { ProjectionService } from '../core/services/projection.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: 'movie.component.scss',
})
export class MovieComponent {
  movie: any;
  projection: any[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private movieService: MovieService,
    private projectionService: ProjectionService,
  ) {
    this.activeRoute.params.subscribe((data) => {
      this.onLoadData(data['id']);
    });
  }
  onLoadData(id: string) {
    this.movieService.get(id).subscribe((data: any) => {
      this.movie = data;
    });
    this.projectionService.getProjectionsByMovieID(id).subscribe((data: any) => {
      this.projection = data;
    });
  }

  getYear(date: any) {
    let data = date as Date;
    return data;
  }
}
