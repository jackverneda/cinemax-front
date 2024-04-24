import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrl: 'home.component.scss',
})
export class HomeComponent {
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
