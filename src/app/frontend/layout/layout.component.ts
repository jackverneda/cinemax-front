import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: 'layout.component.html',
  styleUrl: 'layout.component.scss',
})
export class LayoutComponent {
  pages = [
    {
      name: 'Inicio',
      link: '/frontend/home',
    },
    {
      name: '¿Quiénes Somos?',
      link: '/frontend/about-us',
    },
    {
      name: 'Cartelera',
      link: '/frontend/movie',
    },
    {
      name: 'Eventos',
      link: '/frontend/news',
    },
  ];
}
