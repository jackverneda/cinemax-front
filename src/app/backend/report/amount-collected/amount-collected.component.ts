import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-amount-collected',
  templateUrl: './amount-collected.component.html',
  styleUrls: ['./amount-collected.component.scss'],
})
export class AmountCollectedComponent implements OnInit {
  public displayedColumns: string[] = [];
  public selection = new SelectionModel<any>(true, []);
  public dataSource = new MatTableDataSource<any>([]);
  public pageSizeOptions: number[] = [10, 15, 25, 50, 100];
  // public pageEvent: PageEvent;
  public query: any;
  // @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  // public selectedId: number;
  public selectedData: any;
  private unsubscribeAll$ = new Subject<any>();
  public showMiddleContentFilter: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns = ['select', 'date', 'economicPlan', 'optimalPlan', 'professionalPlan', 'totalRaised'];
    this.initPaginationModel();
    this.refreshPaginationFilter();
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
    let data_fake = [
      { id: 2, date: new Date(), economiPlanAmount: 455, optimalPlanAmount: 5667, professionalPlanAmount: 4520, totalAmount: 19000 },
      { id: 3, date: new Date(), economiPlanAmount: 454, optimalPlanAmount: 896, professionalPlanAmount: 4782, totalAmount: 20000 },
      { id: 7, date: new Date(), economiPlanAmount: 450, optimalPlanAmount: 453, professionalPlanAmount: 4120, totalAmount: 25000 },
      { id: 8, date: new Date(), economiPlanAmount: 355, optimalPlanAmount: 4589, professionalPlanAmount: 4560, totalAmount: 36000 },
      { id: 1, date: new Date(), economiPlanAmount: 35, optimalPlanAmount: 5667, professionalPlanAmount: 45456, totalAmount: 40000 },
      { id: 9, date: new Date(), economiPlanAmount: 205, optimalPlanAmount: 5667, professionalPlanAmount: 4520, totalAmount: 19000 },
      { id: 12, date: new Date(), economiPlanAmount: 455, optimalPlanAmount: 5667, professionalPlanAmount: 4520, totalAmount: 19000 },
      { id: 32, date: new Date(), economiPlanAmount: 455, optimalPlanAmount: 5667, professionalPlanAmount: 4520, totalAmount: 19000 },
      { id: 12, date: new Date(), economiPlanAmount: 455, optimalPlanAmount: 5667, professionalPlanAmount: 4520, totalAmount: 19000 },
    ];
    this.dataSource = new MatTableDataSource<any>(data_fake);
  }

  public cleanSelectedData() {
    // TODO: clear selection if exist
  }

  public paginateData(event?: PageEvent) {
    // this.pageEvent = event;
    this.refreshPaginationFilter();
    return event;
  }

  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  public toggle(row: any): void {
    if (!this.selection.isSelected(row)) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
  }

  public actions(): boolean {
    if (this.selection.selected.length === 1) {
      return true;
    } else return false;
  }

  public onReciveEventFromFilter(event: any): void {
    this.showMiddleContentFilter = true;
  }

  public onPrint(): void {
    // window.print();
  }

  public checkBoxSelected(row: any): void {}
}
