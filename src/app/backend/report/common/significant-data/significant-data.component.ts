import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-significant-data',
  templateUrl: './significant-data.component.html',
  styleUrls: ['./significant-data.component.scss'],
})
export class SignificantDataComponent implements OnInit {
  public topLeftGraphsTitle!: string;
  public topLeftGraphsSubTitle!: string;
  public topLeftGraphsAmount!: number;
  public topLeftGraphsPercent!: number;
  public topLeftGraphsDataGraph!: any;

  public topRigthGraphsTitle!: string;
  public topRigthGraphsSubTitle!: string;
  public topRigthGraphsAmount!: number;
  public topRigthGraphsPercent!: number;
  public topRigthGraphsDataGraphs!: any;

  public middleLeftGraphsTitle!: string;
  public middleLeftGraphsSubTitle!: string;
  public middleLeftGraphsAmount!: number;
  public middleLeftGraphsPercent!: number;
  public middleLeftGraphsDataGraphs: any;

  public middleRigthGraphsTitle!: string;
  public middleRigthGraphsSubTitle!: string;
  public middleRigthGraphsAmount!: number;
  public middleRigthGraphsPercent!: number;
  public middleRigthGraphsDataGraphs: any;

  constructor() {}

  ngOnInit(): void {
    this.initAreaGraphsInformation();
  }

  public onInformationShow() {}

  private initAreaGraphsInformation() {
    this.topLeftGraphsTitle = 'Crecimiento de los ingresos';
    this.topLeftGraphsSubTitle = '2019-2020';
    this.topLeftGraphsAmount = 500;
    this.topLeftGraphsPercent = 5;
    this.topLeftGraphsDataGraph = [
      {
        data: [5, 10, 5, 2],
        label: 'Ingresos',
        backgroundColor: '#7fc2f8',
      },
    ];

    this.topRigthGraphsTitle = 'Matemática';
    this.topRigthGraphsTitle = '2019-2020';
    this.topRigthGraphsAmount = 3000;
    this.topRigthGraphsPercent = 2;
    this.topRigthGraphsDataGraphs = [
      {
        data: [5, 10, 20, 30],
        label: 'Ingresos',
        backgroundColor: '#7fc2f8',
      },
    ];

    this.middleLeftGraphsTitle = 'Plan de pago Económico';
    this.middleLeftGraphsSubTitle = '2019-2020';
    this.middleLeftGraphsAmount = 90000;
    this.middleLeftGraphsPercent = -1;
    this.middleLeftGraphsDataGraphs = [
      {
        data: [5, 10, 20, 30],
        label: 'Ingresos',
        backgroundColor: '#7fc2f8',
      },
    ];

    this.middleRigthGraphsTitle = 'Plan de pago Óptimo';
    this.middleRigthGraphsSubTitle = '2019-2020';
    this.middleRigthGraphsAmount = 6500;
    this.middleRigthGraphsPercent = 7;
    this.middleRigthGraphsDataGraphs = [
      {
        data: [5, 10, 20, 30],
        label: 'Ingresos',
        backgroundColor: '#7fc2f8',
      },
    ];
  }
}
