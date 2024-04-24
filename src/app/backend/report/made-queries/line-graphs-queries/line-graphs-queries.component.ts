import { Component, OnInit, AfterViewInit, ViewChild, OnChanges, AfterViewChecked, DoCheck, AfterContentInit, SimpleChanges, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { BaseChartDirective } from 'ng2-charts';
import { FilterLineGraphic } from 'src/app/backend/mock_values/report/usert-statictics';

@Component({
  selector: 'app-line-graphs-queries',
  templateUrl: './line-graphs-queries.component.html',
  styleUrls: ['./line-graphs-queries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineGraphsQueriesComponent implements OnInit {

  public lineMadeQChartData: any[] = [];
  public lineMadeQfilterQuestion: FilterLineGraphic[];
  public lineMadeQChartLabels: any[] = [];
  public lineMadeQChartOptions: any = {};
  public lineMadeQChartColors: any[] = [];
  public typeGraphs: any = 'line';

  private _data: any[] = [];
  private _labels: string[] = [];
  private baseDate = new Date();
  public yearDate: number;
  public monthDate: string;
  public weekDateStart: string;
  public weekDateEnd: string;
  public weekDateYear: string;
  public _range: string;
  _updatedDate: Date;

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
    if (v) {
      this._data = v;
      this.cdref.markForCheck();
      this.fillLineGrapsMadeQueries();
    }
  }

  @Input() set labels(l: string[]) {
    if (l) {
      this._labels = l;
      this.cdref.markForCheck();
      this.fillLineGrapsMadeQueries();
    }
  }

  @Input() set updatedDate(v: any) {
    if (v) {
      this._updatedDate = v;
      this.cdref.markForCheck();
      this.setDate();
    }
  }

  // @Input() set range(r: any) {
  //   if (r) {
  //     this._range = r;
  //     if (r === 'weekly') {
  //       this.default = 0;
  //     } else if (r === 'monthly') {
  //       this.default = 1;
  //     } else {
  //       this.default = 2;
  //     }
  //   }
  // }


  @Output() eventEmitTabChange: EventEmitter<number> = new EventEmitter();
  @Output() eventEmitFilter: EventEmitter<any> = new EventEmitter();
  public tabSelected: number = 0;

  @ViewChild("baseChart") chart: BaseChartDirective;

  constructor(
    private cdref: ChangeDetectorRef
  ) {
    this.setDate();
  }

  public setDate() {
    moment().locale('es');
    this.yearDate = Number(moment(new Date()).format("YYYY"));
    this.monthDate = moment(new Date()).format('MMMM YYYY');
    let v = moment(new Date()).weekday(0).minute(0).hour(0).second(0);
    this.weekDateStart = moment(v.toDate()).format("DD MMMM");
    this.weekDateEnd = v.clone().add('6', 'days').format("DD MMMM YYYY");
  }



  ngOnInit(): void {
    this.fillLineGrapsMadeQueries()
    // this.waitToParen();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


  /**
  *  This is why the child need  wait to the parent do after view checked hook, if not time out set, then this class throw an exception
  * */
  private waitToParen() {
    setTimeout(() => {
      this.fillLineGrapsMadeQueries();
    });
  }




  /**
   * Fill data for line graphs about the made queries by user name as specialist
   */
  public fillLineGrapsMadeQueries() {
    const canvas = <HTMLCanvasElement>document.getElementById('lineChartMadeQ');
    if (canvas !== null) {
      const chart = canvas.getContext('2d');
      const gradient = chart.createLinearGradient(0, 0, 0, 450);
      gradient.addColorStop(0, 'rgba(34,150,243, 1)');
      gradient.addColorStop(0.25, 'rgba(34,150,243, 0.5)');
      gradient.addColorStop(0.5, 'rgba(34,150,243, 0.25)');
      gradient.addColorStop(0.75, 'rgba(255,255,255, 0.10)');
      gradient.addColorStop(1, 'rgba(255,255,255, 0)');

      this.lineMadeQChartData = [
        {
          data: [...this._data],
          label: 'Account A',
          backgroundColor: gradient,
        },
      ];

      this.lineMadeQChartLabels = [...this._labels];

      this.lineMadeQChartOptions = {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Cantidad de preguntas'
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Cantidad',
            },


          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Fecha',

            },
            gridLines: {
              display: false
            }
          }]
        }
      };



      this.lineMadeQChartColors = [
        { // grey
          borderColor: '#57b0f6',
          borderWidth: 1,
        },
      ]
      this.cdref.markForCheck();
    }
  }

  public onTabChange(event: any): void {
    // this.reset();
    this.setDate();
    this.eventEmitTabChange.emit(event.index);
  }

  private reset(): void {
    this.indexMonthSelected = 0;
    // this.indexYearsSelected = 9;
  }

  public onBackDay(): void {
    let start = moment(this.weekDateStart, 'DD MMMM').subtract('6', 'days').hour(0).minute(0).second(0);
    let end = moment(this.weekDateEnd, 'DD MMMM YYYY').subtract('6', 'days').hour(23).minute(59).second(59);
    this.weekDateStart = moment(start.toDate()).format('DD MMMM');
    this.weekDateEnd = moment(end.toDate()).format('DD MMMM YYYY');

    this.eventEmitFilter.emit({
      startDate: start.toDate(),
      endDate: end.toDate()
    });
  }

  public onNextDay(): void {
    let start = moment(this.weekDateStart, 'DD MMMM').add('6', 'days').hour(0).minute(0).second(0);
    let end = moment(this.weekDateEnd, 'DD MMMM').add('6', 'days').hour(23).minute(59).second(59);
    this.weekDateStart = moment(start.toDate()).format('DD MMMM');
    this.weekDateEnd = moment(end.toDate()).format('DD MMMM')
    this.weekDateYear = moment(end.toDate()).format('YYYY')
    this.eventEmitFilter.emit({
      startDate: start.toDate(),
      endDate: end.toDate()
    });
  }

  public onMonthBack(): void {
    let monthBack = moment(this.monthDate, 'MMMM YYYY').subtract('1', 'month');
    this.monthDate = moment(monthBack.toDate()).format('MMMM YYYY');
    let start = monthBack.clone().date(1).hour(0).minute(0).second(0);
    let end = monthBack.clone().add('1', 'month').subtract('1', 'second');
    this.eventEmitFilter.emit({
      startDate: start.toDate(),
      endDate: end.toDate()
    });
  }

  public onMonthNext(): void {
    let monthNex = moment(this.monthDate, 'MMMM YYYY').add('1', 'month');
    this.monthDate = moment(monthNex.toDate()).format('MMMM YYYY');
    let start = monthNex.clone().date(1).hour(0).minute(0).second(0);
    let end = monthNex.clone().add('1', 'month').subtract('1', 'second');
    this.eventEmitFilter.emit({
      startDate: start.toDate(),
      endDate: end.toDate()
    });
  }

  public onYearsBack(): void {
    let yearBack = moment().year(Number(this.yearDate)).subtract('1', 'year');
    this.yearDate = + moment(yearBack.toDate()).format('YYYY');
    this.cdref.markForCheck();
    let start = moment().month(0).date(1).hour(0).minute(0).second(0).year(Number(this.yearDate));
    let end = start.clone().add('1', 'year').subtract('1', 'second');
    this.eventEmitFilter.emit({
      startDate: start.toDate(),
      endDate: end.toDate()
    });

  }

  public onYearsNext(): void {
    let yearNext = moment().year(Number(this.yearDate)).add('1', 'year');
    this.yearDate = + moment(yearNext.toDate()).format('YYYY');
    this.cdref.markForCheck();
    let start = moment().month(0).date(1).hour(0).minute(0).second(0).year(Number(this.yearDate));
    let end = start.clone().add('1', 'year').subtract('1', 'second');
    this.eventEmitFilter.emit({
      startDate: start.toDate(),
      endDate: end.toDate()
    });
  }



}
