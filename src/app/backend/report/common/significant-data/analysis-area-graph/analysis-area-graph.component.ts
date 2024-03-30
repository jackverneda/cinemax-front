import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-analysis-area-graph',
  templateUrl: './analysis-area-graph.component.html',
  styleUrls: ['./analysis-area-graph.component.scss'],
})
export class AnalysisAreaGraphComponent implements OnInit {
  public _title!: string;
  public _subTitle!: string;
  public _amount!: number;
  public _percent!: number;
  public _data: any;

  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() amount!: number;
  @Input() percent!: number;
  @Input() data: any;

  // This varibale have the control of trending
  public trending: boolean = false;

  public areaChartLabels: any[] = [];
  public areaChartOptions: any;
  public areaChartColors: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.fillDatagraps();
  }

  public fillDatagraps(): void {
    this.areaChartLabels = ['ENE', 'FEB', 'MAR', 'ABR'];

    this.areaChartOptions = {
      responsive: true,
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: false,
            },
            gridLines: {
              display: false, // this will remove the horizontal background line
            },
            ticks: {
              display: false, // this will remove only the label
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              display: false,
            },
            gridLines: {
              display: false, // this will remove the vertical background line
            },
            ticks: {
              display: false, //this will remove only the label
            },
          },
        ],
      },
    };

    this.areaChartColors = [
      {
        // blue
        borderColor: '#57b0f6',
        borderWidth: 1,
      },
    ];
  }

  public checkPercentValue(): string {
    return this.percent < 0 ? 'down' : 'up';
  }
}
