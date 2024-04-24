import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressServiceService } from '@backend/services/models/address-service.service';
import { CategoryService } from '@backend/services/models/category.service';
import { SubjectService } from '@backend/services/models/subject.service';
import { UserService } from '@backend/services/models/user.service';
import { MadeQueriesService } from '@backend/services/reports/made-queries.service';
import { Roles } from '@core/enums/rol.enum';
import { ActiveFilterReport } from '@core/model/active-fIlter-report';
import { User } from '@core/model/user';
import { groupBy } from 'lodash';
import * as moment from 'moment';
import { Subject } from 'rxjs';

import { data_fake_made_querys_repository, MadeQuery } from './../../../mock_values/report/made-query';

@Component({
  selector: 'app-made-queries',
  templateUrl: './made-queries.component.html',
  styleUrls: ['./made-queries.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MadeQueriesComponent implements OnInit {

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
  public showMiddleContentFilter: boolean = false;
  public aux: any[]
  public firstCange: boolean;
  date: any

  public indexTabSelected: number = 3;
  public filtersActive: ActiveFilterReport = {
    range: true,
    specialist: true,
    payment: false,
    regions: true,
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
      range: 'annually'
    },
    specialist: '',
    category: '',
    subject: '',
    province: ''
  };
  public startDate: Date;
  public allUser: any[];
  public categories: any[];
  public subjects: any[];
  public allProvincesByName: any[];
  public allRegionResponseApi: any[]
  public labelsData: any[];
  public chartData: string[];
  public privoteDate: Date;
  public range: string

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private categoryService: CategoryService,
    private subjectService: SubjectService,
    private madeQueriesService: MadeQueriesService,
    private addressService: AddressServiceService,
    private cdref: ChangeDetectorRef
  ) {
    this.firstCange = true;
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
            this.range = 'annually';
            this.privoteDate = new Date();
          }
          this.getAllData();
        }
      },
      () => { }
    )
  }




  ngOnInit(): void {
  }

  getAllData() {
    this.initColumName();
    this.cleanEmptyParams();
    this.filterData()
    // this.refreshPaginationFilter();
    this.getAllUsers();
    this.getCategory();
    this.getAllAddress();

  }

  public initColumName() {
    this.displayedColumns = ['select', 'date', 'region', 'category', 'subject', 'user', 'totalQueries'];
    this.initPaginationModel();
  }

  public cleanEmptyParams() {
    for (let key in this.params) {
      if (this.params[key] === '' || this.params[key].initialDate === null) {
        delete this.params[key];
      }
    }
  }

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
    )
  }

  public getCategory() {
    this.categoryService.getAllCategory().subscribe(
      response => {
        this.categories = response.docs;
      }
    )
  }

  public getAllAddress() {
    this.addressService.getAllAdress().subscribe(
      response => {
        // this.allRegionResponseApi = response.docs;
        this.allProvincesByName = this.groupBy(response.docs, 'province');
        // this.categories = response.docs;
      }
    )
  }


  private groupBy(collection: any[], arg: string): any[] {
    let grouped: any = groupBy(collection, arg);
    let result: any[] = [];
    for (let p in grouped) {
      result.push({
        province: p,
        mun: grouped[p],
      })
    };
    return result;
  }

  /**
   * This method set this range year  beginning in january and ending in december if no range date found in parameters
   * @param rangeDate the range date to add to the search
   */
  public actualYearDate(rangeDate: any) {
    let year = moment(new Date()).format('YYYY');
    let beging = moment().month(0).date(1).hour(0).minute(0).second(0).year(Number(year));
    let end = beging.clone().add('1', 'year').subtract(1, 'second');
    rangeDate.initialDate = beging.toDate();
    rangeDate.endDate = end.toDate();
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
    this.refreshPaginationFromEvent(this.pageEvent);
    this.filterData();
    this.cleanSelectedData();
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
  public filterData() {
    // TODO: fill data from the api
    // this.dataSource = new MatTableDataSource<MadeQuery>(data_fake_made_querys_repository);
    let initialDateCharData = new Date(this.params.chartDate.initialDate).getTime() / 1000;
    let endDateChartData = new Date(this.params.chartDate?.endDate).getTime() / 1000;

    let chartParams = {
      initial_date: `>=:${initialDateCharData}`,
      final_date: `<=:${endDateChartData}`
    }

    //sumary data values
    let initialDateSumary = (new Date(this.params.sumaryDate.initialDate).getTime()) / 1000;
    let endDateSumaryData = (new Date(this.params.sumaryDate.endDate).getTime()) / 1000;

    let sumaryParams = {
      initial_date: `>=:${initialDateSumary}`,
      final_date: `<=:${endDateSumaryData}`
    };


    this.getActiveParamsWithoudDate(sumaryParams);
    this.getActiveParamsWithoudDate(chartParams);
    this.getCharData(chartParams, this.params.chartDate.range);
    this.getSummaryData(sumaryParams);
    this.getRegionalInformation(sumaryParams);
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

  public getCharData(params: any, range: string) {
    this.madeQueriesService.getChartData(params, range).subscribe(
      response => {
        this.labelsData = this.getValue('_id', response);
        this.chartData = this.getValue('total', response);
      },
      () => { console.log('error al obetener data en preguntas hechas') }
    )
  }

  public getSummaryData(params: any) {
    this.madeQueriesService.getSummaryData(params).subscribe(
      response => {
        this.dataSource = new MatTableDataSource(this.depureData(response.docs));
      },
      () => { },
    )
  }

  public depureData(response: any[]): any[] {
    let table: any[] = [];
    let index = 0;
    response.map((sumarryResponse) => {
      this.createAllValuesDataTable(table)
      if (this.params.specialist) {
        table[index].specialist = this.findUserById(this.params.specialist);
      }
      if (this.params.category) {
        table[index].category = this.findCategoryById(this.params.category);
      }
      if (this.params.subject) {
        table[index].subjects = this.findSubjectById(this.params.subject);
      }
      if (this.params.province) {
        table[index].provinces = this.params.province;
      }
      table[index].date = this.getMonth('' + sumarryResponse._id);
      table[index].total = sumarryResponse.total;
      index++;
    })
    return table;
  }

  private findSubjectById(id: string): any {
    const subject = this.subjects.filter(sub => sub.id === id);
    return subject[0].name;
  }

  private findCategoryById(category: any): string {
    const categ = this.categories.filter(cat => cat.id);
    return categ[0].name;
  }

  private findUserById(id: string): string {
    const result = this.allUser.filter(value => value.id === id);
    return result[0].firstName + ' ' + result[0].lastName;
  }

  private getMonth(_id: string): string {
    let month = '';
    switch (_id) {
      case '01':
        month = 'Enero';
        break;
      case '02':
        month = 'Febrero';
        break;
      case '03':
        month = 'Marzo';
        break;
      case '04':
        month = 'Abril';
        break;
      case '05':
        month = 'Mayo';
        break;
      case '06':
        month = 'Junio';
        break;
      case '07':
        month = 'Julio'
        break;
      case '08':
        month = 'Agosto';
        break;
      case '09':
        month = 'Septiembre';
        break;
      case '10':
        month = 'Octubre';
        break;
      case '11':
        month = 'Noviembre';
        break;

      default:
        month = 'Diciembre';
        break;
    }
    return month;
  }

  private createAllValuesDataTable(tableValues: any[]) {
    tableValues.push({
      date: '',
      provinces: 'Todas',
      category: 'Todas',
      subjects: 'Todas',
      specialist: 'Todos',
      total: 0
    })
  }

  public getRegionalInformation(params: any
  ) {
    this.madeQueriesService.getRegionalInformation(params).subscribe(
      response => {
        this.aux = response;
      },
      () => { },
    )
  }


  /**
   * This method return an array with all of arg matches in the arry param
   * @param arg string argument
   * @param array array to search
   */
  public getValue(arg: string, array: any[]): any[] {
    let result: any[] = [];
    if (array?.length) {
      array.map(value => {
        result.push(value[arg]);
      });
    }
    return result;
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

  public onPrint() {
    window.print()
  }

  public onUserIdReceived(event: any): void {
    this.showMiddleContentFilter = true;
    this.params.specialist = event.value;
    this.research();
  }


  public checkBoxSelected(row: any): void {

  }

  public onStartDateReceived(event): void {
    this.startDate = new Date(event.value);
  }
  public onEndDateReceived(event): void {
    let endDate = new Date(event.value);

    if (endDate.getTime() != 0) {
      // this.getCharData(this.startDate, endDate);
      console.log(this.startDate)
      this.params.sumaryDate['initialDate'] = this.startDate;
      this.params.sumaryDate['endDate'] = endDate;
      this.research();
    }
  }
  public onCategoryIdReceived(event): void {
    this.params.category = event.value;
    this.getSubject(event.value);
  }


  /**
   * Get the subject by category id
   * @param id category id
   */
  public getSubject(id: string) {
    let filter = {
      category: `=:${id}`
    }
    this.subjectService.getSubjectByFilter(filter).subscribe(
      response => {
        this.subjects = response.docs;
        this.research();
      },
      () => { }
    )
  }


  public onSubjectIdeReceived(event): void {
    this.params.subject = event.value
    this.research();
  }

  public onRegionReceived(event): void {
    this.params.province = event.value;
    this.research();
  }

  public research(): void {
    this.router.navigate(['backend/report/made-queries'], {
      queryParams: this.getParams()
    })
  }

  public getParams(): any {
    let _sumaryDate = JSON.stringify(this.params.sumaryDate);
    let _chartDate = JSON.stringify(this.params.chartDate);
    return {
      sumaryDate: _sumaryDate,
      chartDate: _chartDate,
      specialist: this.params.specialist,
      category: this.params.category,
      subject: this.params.subject,
      province: this.params.province

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
          initialDate = filterVale.startDate;
          endDate = filterVale.endDate;
        }
        else {
          initialDate = moment(new Date()).weekday(0).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add(1, 'days').subtract(1, 'second');
          initialDate = initialDate.toDate();
          endDate = endDate.toDate();
        }
        this.params.chartDate.range = this.range = 'weekly'
        break;

      case 1:
        //months
        if (filterVale) {
          initialDate = filterVale.startDate;
          endDate = filterVale.endDate;
          this.date = filterVale.startDate;
        }
        else {
          initialDate = moment(new Date()).date(1).hour(0).minute(0).second(0);
          endDate = initialDate.clone().add('1', 'month').subtract(1, 'second');
          this.params.chartDate.initialDate = initialDate.clone();
          this.params.chartDate.endDate = endDate.clone();
          this.date = initialDate.clone();
          initialDate = initialDate.toDate();
          endDate = endDate.toDate();
        }
        this.params.chartDate.range = this.range = 'monthly';

        break;

      default:
        //years
        if (filterVale) {
          initialDate = filterVale.startDate;
          endDate = filterVale.endDate;
        }
        else {
          let year = moment(new Date()).format('YYYY');
          let beging = moment().month(0).date(1).hour(0).minute(0).second(0).year(Number(year));
          let end = beging.clone().add('1', 'year').subtract(1, 'second');
          initialDate = beging.toDate();
          endDate = end.toDate();
        }
        this.params.chartDate.range = this.range = 'annually';
        break;
    }

    let convertInit = (initialDate.getTime()) / 1000;
    let convertEnd = (endDate.getTime()) / 1000;

    let param = {
      initial_date: `>=:${convertInit}`,
      final_date: `<=:${convertEnd}`,
    }
    this.getActiveParamsWithoudDate(param);
    this.params.chartDate.initialDate = moment(initialDate).toDate();
    this.params.chartDate.endDate = moment(endDate).toDate();
    this.getCharData(param, this.range);
  }

  public onFilterEmittedAction(filter: any): void {
    this.firstCange = false;
    this.onChange(this.indexTabSelected, filter);
  }

}
