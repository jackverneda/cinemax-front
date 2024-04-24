import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bar-graph-avg-stars-awarded',
  templateUrl: './bar-graph-avg-stars-awarded.component.html',
  styleUrls: ['./bar-graph-avg-stars-awarded.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphAvgStarsAwardedComponent implements OnInit, OnChanges {

  public barGraphsAvgStarsChartData: any[] = [];
  public barGraphsAvgStarsChartLabels: any[] = [];
  public barGraphsAvgStarsChartOptions: any = {};
  public barGraphsAvgStarsChartColors: any[] = [];
  public typeGraphs: any = 'bar';
  private _data: any[] = [];
  private _labels: string[] = [];
  public weekDays: any[] = [
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo'

  ];

  public month: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  public years: number[] = [
    2012,
    2013,
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
  ];
  public default = 2;
  public indexDaySelected: number = 0;
  public indexMonthSelected: number = 0;
  public indexYearsSelected: number = 9;
  @Input() set data(v: any[]) {
    this._data = v;
  }

  @Input() set labels(l: string[]) {
    this._labels = l;
  }

  @Output() eventEmitTabChange: EventEmitter<number> = new EventEmitter();
  @Output() eventEmitFilter: EventEmitter<any> = new EventEmitter();
  public tabSelected: number = 0;

  constructor(
    private cdref: ChangeDetectorRef
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && changes.labels.currentValue) {
      this._data = changes.data.currentValue;
      this._labels = changes.labels.currentValue;
      this.fillGraphBarData();
      // this.cdref.markForCheck();


    }
  }

  ngOnInit(): void {
    // this.fillGraphBarData();
  }

  public fillGraphBarData(): void {
    this.barGraphsAvgStarsChartData = [
      {
        data: [...this._data],
        label: 'Account A',
        backgroundColor: '#fbbbb6',
      },
    ];

    this.barGraphsAvgStarsChartLabels = [...this._labels];

    this.barGraphsAvgStarsChartOptions = {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Promedio de las Estrellas Otorgadas'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Tiempo(h)',
          },
          ticks: {
            beginAtZero: true
          },
        }],
        xAxes: [{
          barThickness: 15,
          scaleLabel: {
            display: true,
            labelString: 'Categoría',

          },
          gridLines: {
            display: false
          }
        }]
      }
    };
    this.barGraphsAvgStarsChartColors = [
      { // red
        borderColor: '#fbbbb6',
        borderWidth: 1,

      },
    ];

    this.cdref.markForCheck();
  }

  public onBackwardData(): void {

  }

  public onForwardData(): void {

  }

  public onTabChange(event: any): void {
    this.reset();
    this.eventEmitTabChange.emit(event.index);
  }

  private reset(): void {
    this.indexMonthSelected = 0;
    // this.indexYearsSelected = 9;
  }

  public onBackDay(value: number): void {
    let aux = this.indexDaySelected + value;
    if (aux < 0) {
      this.indexDaySelected = 6;
    } else {
      this.indexDaySelected = aux;
    }
    this.eventEmitFilter.emit(this.indexDaySelected);
  }
  public onNextDay(value: number): void {
    let aux = this.indexDaySelected + value;
    if (aux > 6) {
      this.indexDaySelected = 0;
    } else {
      this.indexDaySelected = aux;
    }
    this.eventEmitFilter.emit(this.indexDaySelected);
  }

  public onMonthBack(value: number): void {
    let aux = this.indexMonthSelected + value;
    if (aux < 0) {
      this.indexMonthSelected = 11;
    } else {
      this.indexMonthSelected = aux;
    }
    this.eventEmitFilter.emit(this.indexMonthSelected);
  }

  public onMonthNext(value: number): void {
    let aux = this.indexMonthSelected + value;
    if (aux > 11) {
      this.indexMonthSelected = 0;
    } else {
      this.indexMonthSelected = aux;
    }
    this.eventEmitFilter.emit(this.indexMonthSelected);
  }

  public onYearsBack(value: number): void {
    let aux = this.indexYearsSelected + value;
    if (aux < 0) {
      this.indexYearsSelected = 9;
    } else {
      this.indexYearsSelected = aux;
    }
    const emitter = this.years[this.indexYearsSelected];
    this.eventEmitFilter.emit(emitter);

  }

  public onYearsNext(value: number): void {
    let aux = this.indexYearsSelected + value;
    if (aux > 9) {
      this.indexYearsSelected = 0;
    } else {
      this.indexYearsSelected = aux;
    }
    const emitter = this.years[this.indexYearsSelected];
    this.eventEmitFilter.emit(emitter);
  }
}
