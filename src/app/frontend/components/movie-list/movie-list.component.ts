import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  templateUrl: './movie-list.component.html',
  styleUrl: 'movie-list.component.scss',
  imports: [MatChipsModule, MatIconModule, CommonModule],
})
export class MovieListComponent {
  rates = [1, 2, 3, 4, 5];
  @Input() data!: any[];

  constructor() {}
}
