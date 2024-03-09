import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: 'search.component.scss',
})
export class SearchComponent {
  rates = [1, 2, 3, 4, 5];
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
}
