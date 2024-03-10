import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-promo',
  standalone: true,
  templateUrl: './promo.component.html',
  styleUrl: 'promo.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [MatButtonModule, MatIcon],
})
export class Promo {
  public data: any[];

  constructor() {
    register();

    this.data = [
      { logo: 'phone', desc: 'Mas de 15000 clientes subscritos' },
      { logo: 'location_on', desc: 'Mas de 15000 clientes subscritos' },
      { logo: 'location_on', desc: 'Mas de 15000 clientes subscritos' },
      { logo: 'location_on', desc: 'Mas de 15000 clientes subscritos' },
      { logo: 'phone', desc: 'Mas de 15000 clientes subscritos' },
      { logo: 'phone', desc: 'Mas de 15000 clientes subscritos' },
    ];
  }
}
