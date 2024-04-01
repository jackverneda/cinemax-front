import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '@backend/services/models/subject.service';
import { CategoryService } from '@backend/services/models/category.service';
import { UserService } from './../../../services/models/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseQualityService } from '@backend/services/reports/response-quality.service';
import { ActiveFilterReport } from '@core/model/active-fIlter-report';
import { Subject } from 'rxjs';
import * as moment from 'moment';


import { AnswerQuality, data_fake_answer_quality } from './../../../mock_values/report/answer-quality';
import { Roles } from '@core/enums/rol.enum';
import { User } from '@core/model/user';

export interface QuanyeryParams {
  initialDate?: any,
  endDate?: any,
  userId?: string,
  categoryId?: string,
  subjectId?: string
}

@Component({
  selector: 'app-answer-quality',
  templateUrl: './answer-quality.component.html',
  styleUrls: ['./answer-quality.component.scss']
})
export class AnswerQualityComponent implements OnInit {

  public displayedColumns = [];
  public selection = new SelectionModel<any>(true, []);
  public dataSource = new MatTableDataSource<any>([]);
  public pageSizeOptions: number[] = [10, 15, 25, 50, 100];
  public pageEvent: PageEvent;
  public query: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public selectedId: number;
  public selectedData: any;
  private unsubscribeAll$ = new Subject<any>();
  private startDate: any;
  public filtersActive: ActiveFilterReport = {
    range: true,
    specialist: true,
    payment: false,
    regions: false,
    teachType: true,
    category: true
  }

  public params: any = {
    sumaryDate: {
      initialDate: null,
      endDate: null,
    },
    chartDate: {
      initialDate: null,
      endDate: null,
    },
    specialist: '',
    category: '',
    subject: ''
  };
  public indexTabSelected: number = 0;
  public labelsData: any[];
  public chartData: string[];
  public allUser: any[];
  public categories: any[];
  public subjects: any[];

  constructor(
    private responseQualityService: ResponseQualityService,
    private userService: UserService,
    private categoryService: CategoryService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(
      (params) => {

        if (params) {
          if (params?.sumaryDate) {
            this.params.sumaryDate = JSON.parse(params.sumaryDate);
          } else {
            this.actualYearDate(this.params.sumaryDate);
          }
          if (params?.specialist) {
            this.params['specialist'] = params.specialist;
          }
          if (params?.subject) {
            this.params['subject'] = params.subject;
          }
          if (params?.category) {
            this.params['category'] = params.category;
          }
          if (params?.chartDate) {
            this.params.chartDate = JSON.parse(params.chartDate);
          } else {
            this.actualYearDate(this.params.chartDate);
          }
          this.getAllData();
        }
      },
      () => { }
    );
  }



  ngOnInit(): void {
  }


  /**
   * This method set this range year  beginning in january and ending in december if no range date found in parameters
   * @param rangeDate the range date to add to the search
   */
  actualYearDate(rangeDate: any) {
    let year = moment(new Date()).format('YYYY');
    let beging = moment().month(0).date(1).hour(0).minute(0).second(0).year(Number(year));
    let end = beging.clone().add('1', 'year').subtract(1, 'second');

    rangeDate.initialDate = beging['_d'];
    rangeDate.endDate = end['_d'];
  }

  public getAllData() {
    this.initColumName();
    this.cleanEmptyParams();
    this.filterData()
    // this.refreshPaginationFilter();
    this.getAllUsers();
    this.getCategory();
  }


  public initColumName() {
    this.displayedColumns = ['select', 'specialist', 'teachType', 'category', 'date', 'starsObtained'];
    this.initPaginationModel();
  }

  private cleanEmptyParams(): void {
    for (let key in this.params) {
      if (this.params[key] === '' || this.params[key].initialDate === null) {
        delete this.params[key];
      }
    }
    console.log('esta es la salida de los parametros del celan params', this.params)
  }

  public initPaginationModel() {
    this.query = {
      limit: 10,
      total: 10,
      offset: 0,
      order: '-createdAt',
      page: 1,
      filter: null,
    };
  }
  public refreshPaginationFilter() {
    // this.refreshPaginationFromEvent(this.pageEvent);
    // this.filterData();
    // this.cleanSelectedData();
  }

  public refreshPaginationFromEvent(pageEvent: PageEvent) {
    if (pageEvent) {
      this.query.limit = pageEvent.pageSize || 10;
      this.query.offset = pageEvent.pageIndex * pageEvent.pageSize;
      this.query.page = pageEvent.pageIndex;
    } else {
      this.query.limit = 10;
      this.query.offset = 0;
      this.query.page = 1;
    }
  }

  public getFilterValue(filters): any {
    // throw new Error('Method not implemented.');
  }
  public filterData() {
    // TODO: fill data from the api
    // chart data values
    let initialDateCharData = new Date(this.params.chartDate.initialDate).getTime();
    initialDateCharData = initialDateCharData / 1000;
    let endDateChartData = new Date(this.params.chartDate?.endDate).getTime();
    endDateChartData = endDateChartData / 1000;

    let chartParams = {
      initial_date: `>=:${initialDateCharData}`,
      final_date: `<=:${endDateChartData}`
    };


    // sumary data values
    let initialDateSumary = new Date(this.params.sumaryDate.initialDate).getTime();
    initialDateSumary = initialDateSumary / 1000;
    let endDateSumaryData = new Date(this.params.sumaryDate.endDate).getTime();
    endDateSumaryData = endDateSumaryData / 1000;

    let sumaryParams = {
      initial_date: `>=:${initialDateSumary}`,
      final_date: `<=:${endDateSumaryData}`
    };

    this.getActiveParamsWithoudDate(sumaryParams);
    this.getActiveParamsWithoudDate(chartParams);

    this.getCharData(chartParams);
    this.getSummaryData(sumaryParams);
  }

  /**
   * This method return all active params that the search need
   * @param params the params object with the date start and date end
   *
   */
  private getActiveParamsWithoudDate(_params: any): any {
    for (let key in this.params) {
      if (key != 'sumaryDate' && key != 'chartDate') {
        _params[key] = `=:${this.params[key]}`;
      }
    }
    return _params;
  }

  /**
   * Get all users from db
   */
  public getAllUsers() {
    let filter = {
      roles: `in:${Roles.SPECIALIST}`
    };
    this.userService.getUsersByFilter(filter).subscribe(
      response => {
        this.allUser = (response.docs as User[]);
      },
      err => { },
      () => console.log('bien'),
    );
  }

  /**
   * Get the subject by category id
   * @param id category id
   */
  public getSubject(id: string) {
    let filter = {
      category: `=:${id}`
    };
    this.subjectService.getSubjectByFilter(filter).subscribe(
      response => {
        this.subjects = response.docs;
      },
      () => { }
    );
  }

  /**
   * Get all category
   */
  public getCategory() {
    // throw new Error('Method not implemented.');
    this.categoryService.getAllCategory().subscribe(
      response => {
        this.categories = response.docs;
      }
    );
  }

  public getCharData(params: any): void {
    this.responseQualityService.getChartData(params).subscribe(
      response => {
        this.labelsData = this.getValue('_id', response);
        this.chartData = this.getValue('avg', response);
      }
    );

  }

  public getSummaryData(params: any): void {
    this.responseQualityService.getSummaryData(params).subscribe(
      response => {
        console.log(response);
        this.dataSource = new MatTableDataSource<any>(response.docs);
      },
      () => { },
    );
  }

  public cleanSelectedData() {
    // TODO: clear selection if exist
  }

  public paginateData(event?: PageEvent) {
    this.pageEvent = event;
    this.refreshPaginationFilter();
    return event;
  }


  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));

  }

  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1
      }`;
  }

  public toggle(row): void {
    if (!this.selection.isSelected(row)) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
  }

  public actions(): boolean {
    if (this.selection.selected.length === 1) {
      return true;
    } else
      return false;
  }


  public onReciveEventFromFilter(event: any): void {
    this.params.specialist = event.value;
    this.research();
  }

  public checkBoxSelected(row: any): void {

  }

  public onStartDateReceived(event: any): void {
    this.startDate = new Date(event.value);
  }

  public onEndDateReceived(event: any): void {
    let endDate = new Date(event.value);

    if (endDate.getTime() != 0) {
      // this.getCharData(this.startDate, endDate);
      console.log(this.startDate)
      this.params.sumaryDate['initialDate'] = this.startDate;
      this.params.sumaryDate['endDate'] = endDate;
      this.research();
    }
  }

  /**
   *
   * @param event the value of selected tabs
   * @param filterVale the value of selected filter
   * @example event: 1, filter: 1, thas means the search is in month, and the month is january
   */
  public onChange(event: any, filterVale?: any): void {
    this.indexTabSelected = event;
    let initialDate;
    let endDate;
    switch (event) {
      case 0:
        //weeks ;
        if (filterVale) {
          initialDate = moment().weekday(filterVale).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add(1, 'days').subtract(1, 'second');
        } else {
          initialDate = moment().weekday(0).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add(1, 'days').subtract(1, 'second');
        }

        break;

      case 1:
        //months
        if (filterVale) {
          initialDate = moment().month(filterVale).date(1).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add('1', 'month').subtract(1, 'second');
        } else {
          initialDate = moment().month(0).date(1).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add('1', 'month').subtract(1, 'second');
        }

        break;

      default:
        //years
        if (filterVale) {
          initialDate = moment().month(0).date(1).hour(0).minute(0).second(0).year(filterVale);
          endDate = initialDate.clone().add('1', 'year').subtract(1, 'second');
        } else {
          initialDate = moment().month(0).date(1).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add('1', 'year').subtract(1, 'second');
        }

        break;
    }

    let init = ((initialDate._d).getTime()) / 1000;
    let end = ((endDate._d).getTime()) / 1000;
    let param = {
      initial_date: `>=:${init}`,
      final_date: `<=:${end}`,
    };
    this.getActiveParamsWithoudDate(param);
    this.params.chartDate.initialDate = initialDate._d;
    this.params.chartDate.endDate = endDate._d;
    this.getCharData(param);
  }

  public onFilterEmittedAction(filter: any): void {
    this.onChange(this.indexTabSelected, filter);
  }

  /**
   * This method return an array with all of arg matches in the arry param
   * @param arg string argument
   * @param array array to search
   */
  public getValue(arg: string, array: any[]): any[] {
    let result: any[] = [];
    array.map(value => {
      result.push(value[arg]);
    });
    return result;
  }

  public onCategoryIdReceived(id: any): void {
    this.getSubject(id.value);
  }

  public onSubjectIdeReceived(id: any): void {
    this.params.subject = id.value
    this.research();
  }

  private research(): void {
    this.router.navigate(['backend/report/answer-quality'], {
      queryParams: this.getParams()
    });
  }

  private getParams(): any {
    let _sumaryDate = JSON.stringify(this.params.sumaryDate);
    let _chartDate = JSON.stringify(this.params.chartDate);
    return {
      sumaryDate: _sumaryDate,
      chartDate: _chartDate,
      specialist: this.params.specialist,
      category: this.params.category,
      subject: this.params.subject
    };
  }

}
