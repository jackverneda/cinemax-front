import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: 'movie.component.scss',
})
export class MovieComponent {
  movie = {
    desc: `Avatar: The Way of Water es una película estadounidense perteneciente al género de cine épico, ciencia
     ficción y aventura dirigida, producida y coescrita por James Cameron. Es la
    primera de las cuatro secuelas planificadas de su película Avatar. <br /><br />
    Jake Sully y Ney'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las
    regiones de Pandora cuando una antigua amenaza reaparece.`,
  };
}
