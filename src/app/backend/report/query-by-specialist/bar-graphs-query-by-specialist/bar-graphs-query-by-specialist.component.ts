import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bar-graphs-query-by-specialist',
  templateUrl: './bar-graphs-query-by-specialist.component.html',
  styleUrls: ['./bar-graphs-query-by-specialist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarGraphsQueryBySpecialistComponent implements OnInit, OnChanges {

  public barQuerySpecialistChartData: any[] = [];
  public barQuerySpecialistChartLabels: any[] = [];
  public barQuerySpecialistChartOptions: any = {};
  public barQuerySpecialistChartColors: any[] = [];
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

  ]

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
  ]

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

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.fillBarGraphsData();
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data.currentValue && changes.labels.currentValue) {
      this._data = changes.data.currentValue;
      this._labels = changes.labels.currentValue;
      this.fillBarGraphsData();
      this.cdref.markForCheck();

    }
  }


  /**
   * This method fill the data graphs from the api
   */
  public fillBarGraphsData(): void {


    this.barQuerySpecialistChartData = [
      {
        data: [...this._data],
        label: 'Account A',
        backgroundColor: '#7ac0f8',
      },
    ];

    this.barQuerySpecialistChartLabels = [...this._labels];

    this.barQuerySpecialistChartOptions = {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Consultas Atendidas por Categoría'
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'Cantidad',
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



    this.barQuerySpecialistChartColors = [
      { // grey
        borderColor: '#57b0f6',
        borderWidth: 1,

      },
    ]
    this.cdref.markForCheck();
  };

  /**
   * Action button, scroll data backward when bar graphs have many data for displaying on the screen
   */
  public onBackwardData(): void {
    // TODO
  }

  /**
   * Action button, scroll data forward when bar graphs have many data for displaying on the screen
   */
  public onForwardData(): void {
    // TODO

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
