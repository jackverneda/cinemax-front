import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-cuban-regional-map-queries',
  templateUrl: './cuban-regional-map-queries.component.html',
  styleUrls: ['./cuban-regional-map-queries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CubanRegionalMapQueriesComponent implements OnInit {

  public pinarProvinceData: any;
  public artemisaProvinceData: string;
  public havanaProvinceData: string;
  public mayabequeProvinceData: string;
  public matanzasProvinceData: string;
  public villaCProvinceData: string;
  public cienfuegosProvinceData: string;
  public sanctiSProvinceData: string;
  public ciegoAProvinceData: string;
  public camagueyProvinceData: string;
  public tunasProvinceData: string;
  public holguinProvinceData: string;
  public granmaProvinceData: string;
  public santiagoProvinceData: string;
  public islaJProvinceData: string;
  public guantanamoProvinceData: string;
  public vaue: any[];

  algo;

  @Input() set data(v: any[]) {
    if (v) {
      this.vaue = v;
      this.algo = 800;
    }
  }
  constructor(
    private cdref: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.fillProvincesData();
  }

  public onInformationShow() {

  }


  public fillProvincesData(): void {
    this.pinarProvinceData = "Pinar del Río";
    this.artemisaProvinceData = "Artemisa";
    this.havanaProvinceData = "La Habana";
    this.mayabequeProvinceData = "Mayabeque";
    this.matanzasProvinceData = "Matanzas";
    this.villaCProvinceData = "Villa Clara";
    this.cienfuegosProvinceData = "Cienfuegos";
    this.sanctiSProvinceData = "Sanctis Spiritus";
    this.ciegoAProvinceData = "Ciego de Ávila";
    this.camagueyProvinceData = "Camagüey";
    this.tunasProvinceData = "Las Tunas";
    this.holguinProvinceData = "Holguín";
    this.granmaProvinceData = "Granma";
    this.santiagoProvinceData = "Santiago de Cuba";
    this.islaJProvinceData = "Isla de la Juventud";
    this.guantanamoProvinceData = "Guantánamo";
  }
}
