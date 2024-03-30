import { Component } from '@angular/core';
import { MovieService } from '../../core/service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {
  movies: any[] = [];
  searchResults = [
    {
      title: 'Barbie',
      image: '../../../assets/images/movies/barbie.jpeg',
      year: 2023,
      time: '1h 45m',
      rate: 4,
      tags: ['Juvenil', 'Comedia', 'Live Actition'],
      desc: 'Después de ser expulsada de Barbieland por no ser una muñeca de aspecto perfecto, Barbie parte hacia el mundo humano para encontrar la verdadera felicidad.',
    },
    {
      title: 'Oppenheimer',
      year: 2023,
      time: '1h 45m',
      image: '../../../assets/images/movies/oppenheimer.jpeg',
      rate: 4,
      tags: ['Histórica', 'Triller'],
      desc: 'Durante la Segunda Guerra Mundial, el teniente general Leslie Groves designa al físico J. Robert Oppenheimer para un grupo de trabajo que está desarrollando el Proyecto Manhattan, cuyo objetivo consiste en fabricar la primera bomba atómica.',
    },
    {
      title: 'Rustin',
      image: './../../../assets/images/movies/rustin.jpeg',
      year: 2023,
      time: '1h 45m',
      rate: 4,
      tags: ['Histórica', 'Drama'],
      desc: 'Bayard Rustin, asesor de Martin Luther King Jr., dedica su vida a la búsqueda de la igualdad racial, los derechos humanos y la democracia mundial. Sin embargo, como negro abiertamente homosexual, ha sido prácticamente borrado del movimiento.',
    },
  ];
  constructor(private movieService: MovieService) {
    // let movie = {
    //   name: 'Lucy5',
    //   description: 'Best peli',
    //   Duration: '02:30:00',
    //   Premiere: '2024-04-01T00:00:00',
    //   IconURL: 'https://ejemplo.com/icon.png',
    //   TrailerURL: 'https://ejemplo.com/trailer.mp4',
    // };
    // this.movieService.postMovie(movie).subscribe(() => {});
    this.movieService.getAll().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
    });
  }
}
