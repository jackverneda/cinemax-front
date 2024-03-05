import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cinemax-front';
  pages = [
    {
      name: 'Inicio',
      link: '/home',
    },
    {
      name: '¿Quiénes Somos?',
      link: '/about-us',
    },
    {
      name: 'Cartelera',
      link: '/movie',
    },
    {
      name: 'Eventos',
      link: '/news',
    },
  ];
}
