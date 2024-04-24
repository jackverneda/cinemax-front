import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-graphs-amount-collected',
  templateUrl: './bar-graphs-amount-collected.component.html',
  styleUrls: ['./bar-graphs-amount-collected.component.scss'],
})
export class BarGraphsAmountCollectedComponent implements OnInit {
  public barAmountChartData: any[] = [];
  public barAmountChartLabels: any[] = [];
  public barAmountChartOptions: any = {};
  public typeGraphs: any = 'bar';

  constructor() {}

  ngOnInit(): void {
    this.fillGraphsAmount();
  }

  public fillGraphsAmount() {
    this.barAmountChartData = [
      {
        data: [5, 10, 20, 30, 2, 12, 45, 2, 3, 74, 45, 56],
        label: 'Económico',
        backgroundColor: '#7fc2f8',
      },
      {
        data: [5, 10, 2, 30, 2, 20, 35, 47, 53, 94, 15, 46],
        label: 'Óptimo',
        backgroundColor: '#95d095',
      },
      {
        data: [15, 24, 54, 78, 8, 12, 8, 56, 87, 74, 85, 56],
        label: 'Profesional',
        backgroundColor: '#fe9085',
      },
    ];

    this.barAmountChartLabels = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

    this.barAmountChartOptions = {
      responsive: true,
      legend: {
        display: true,
        position: 'right',
        labels: {
          boxWidth: 10,
          boxHeight: 5,
          textAlign: 'left',
        },
      },
      title: {
        display: true,
        text: 'Importe Recaudado en CUP',
      },
      scales: {
        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: 'Cantidad',
            },
          },
        ],
        xAxes: [
          {
            barThickness: 15,
            scaleLabel: {
              display: true,
              labelString: 'Fecha',
            },
            gridLines: {
              display: false,
            },
          },
        ],
      },
    };
  }
}
