import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild , ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { data_fake_registered_users, RegisteredUsers } from './../../../mock_values/report/registered-users';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisteredUsersComponent implements OnInit {

  public displayedColumns: string[];
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

  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'date', 'client', 'specialist', 'admins', 'totalRegisteredUsers'];
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
    this.dataSource = new MatTableDataSource<RegisteredUsers>(data_fake_registered_users);
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
    this.showMiddleContentFilter = true;
  }

  public checkBoxSelected(row: any): void{

  }
}
