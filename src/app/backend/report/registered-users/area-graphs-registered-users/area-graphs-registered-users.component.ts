import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-area-graphs-registered-users',
  templateUrl: './area-graphs-registered-users.component.html',
  styleUrls: ['./area-graphs-registered-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AreaGraphsRegisteredUsersComponent implements OnInit, AfterViewInit {

  public arearegisteredUChartData: any[];
  public arearegisteredUChartLabels: any[] = [];
  public arearegisteredUChartOptions: any = {};
  public arearegisteredUChartColors: any[] = [];
  public typeGraphs: any = 'line';

  public ahora: string = 'jola';

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.arearegisteredUChartData = [];
    // setTimeout(() => {
    // });
  }

  ngAfterViewInit() {
    this.fillRegisteredUsers();
  }

  /**
   * Fill data for area graphs about registered users
   */
  public fillRegisteredUsers(): void {
    const canvas = <HTMLCanvasElement>document.getElementById('arearegisteredU');
    if (canvas !== null) {
      const chart = canvas.getContext('2d');
      const gradient = chart.createLinearGradient(0, 0, 0, 450);
      gradient.addColorStop(0, 'rgba(34,150,243, 1)');
      gradient.addColorStop(0.25, 'rgba(34,150,243, 0.5)');
      gradient.addColorStop(0.5, 'rgba(34,150,243, 0.25)');
      gradient.addColorStop(0.75, 'rgba(255,255,255, 0.10)');
      gradient.addColorStop(1, 'rgba(255,255,255, 0)');

      this.arearegisteredUChartData = [
        {
          data: [5, 10, 20, 30, 2, 12, 45, 2, 3, 74, 45, 2],
          label: 'Account A',
          backgroundColor: gradient,
        },
      ];

      this.arearegisteredUChartLabels = [
        'ENE',
        'FEB',
        'MAR',
        'ABR',
        'MAY',
        'JUN',
        'JUL',
        'AGO',
        'SEP',
        'OCT',
        'NOV',
        'DIC',
      ];

      this.arearegisteredUChartOptions = {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: 'Cantidad de Usuarios Registrados'
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



      this.arearegisteredUChartColors = [
        { // grey
          borderColor: '#57b0f6',
          borderWidth: 1,
        },
      ]

    }

    this.cdRef.markForCheck();
  }
}
