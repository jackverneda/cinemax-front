import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-bar-grap-avg-reply-time',
  templateUrl: './bar-grap-avg-reply-time.component.html',
  styleUrls: ['./bar-grap-avg-reply-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGrapAvgReplyTimeComponent implements OnInit, OnChanges {

  public barGraphAvgReplyTimeChartData: any[] = [];
  public barGraphAvgReplyTimeChartLabels: any[] = [];
  public barGraphAvgReplyTimeChartOptions: any = {};
  public barGraphAvgReplyTimeChartColors: any[] = [];
  public typeGraphs: any = 'bar';
  public _labels: any[];
  public _data: any[];
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
    private cdref: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.fillGraphData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    if (changes.data.currentValue && changes.labels.currentValue) {
      this._data = changes.data.currentValue;
      this._labels = changes.labels.currentValue;
      this.fillGraphData();
      this.cdref.markForCheck();

    }
  }

  public fillGraphData(): void {
    this.barGraphAvgReplyTimeChartData = [
      {
        data: [...this._data],
        label: 'Account A',
        backgroundColor: '#fbbbb6',
      },
    ];

    this.barGraphAvgReplyTimeChartLabels = [...this._labels];

    this.barGraphAvgReplyTimeChartOptions = {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Promedio de Tiempo de Respuesta'
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



    this.barGraphAvgReplyTimeChartColors = [
      { // red
        borderColor: '#fbbbb6',
        borderWidth: 1,

      },
    ]

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

  private reset() {
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
    };
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
