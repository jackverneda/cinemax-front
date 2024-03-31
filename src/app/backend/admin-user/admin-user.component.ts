// import { SubSink } from 'subsink';
import { SelectionModel } from '@angular/cdk/collections';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
// import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { Subject } from 'rxjs';
// import { environment } from '@environment/environment';
// import { ProgressBarService } from '@shared/progress-bar/progress-bar.service';
import { ROLES } from '../../core/constants/const';
import { UserService } from '../core/services/user.service';
import { ShowToastrService } from '../../core/service/show-toastr.service';
import { DialogAddEditUserComponent } from './create-user-dialog/create-user-dialog.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminUserComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>([]);
  public pageSizeOptions: number[] = [10, 15, 25, 50, 100];
  // public pageEvent: PageEvent;
  public query: any;
  selection = new SelectionModel<any>(true, []);
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  rowSelected: any;
  private unsubscribeAll$ = new Subject<any>();
  // private subSink = new SubSink();
  private apiUrl = environment.apiUrl;
  public searchConfig: any;

  public loading: boolean = false;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private showToastr: ShowToastrService,
    // public progressBarService: ProgressBarService,
    private chdref: ChangeDetectorRef,
  ) {
    // this.setProgressConfig();
  }

  ngOnInit(): void {
    this.loading = true;
    // this.progressBarService.show();
    this.initFilterConfig();
    this.initiPaginationModel();
    this.refreshPaginationFilter();
    this.displayedColumns = ['select', 'name', 'email', 'date', 'role'];
  }

  ngOnDestroy(): void {
    // this.subSink.unsubscribe();
  }

  public initFilterConfig(): void {
    this.searchConfig = {
      roles: [
        { label: 'Usuario', rol: ROLES.USER },
        { label: 'Moderador', rol: ROLES.MOD },
        { label: 'Administrador', rol: ROLES.ADMIN },
      ],
    };
  }

  initiPaginationModel(): void {
    this.query = {
      limit: 10,
      total: 10,
      offset: 0,
      order: '-createdAt',
      page: 1,
      filter: null,
    };
  }

  private initiPagination(total: number): void {
    this.query.page = 1;
    this.query.total = total;
  }

  private refreshPaginationFilter(): void {
    // this.refreshPaginationFromEvent(this.pageEvent);
    this.refreshData();
    this.cleanSelectedData();
  }

  private cleanSelectedData(): void {
    console.log('clear data here');
  }

  public refreshData(): void {
    this.selection.clear();
    this.userService.getAll().subscribe(
      (res: any) => {
        this.dataSource = new MatTableDataSource<any>(res);
        // this.query.total = res['total'];
        this.loading = false;
        // this.progressBarService.hide();
        this.chdref.markForCheck();
      },
      (err) => {
        console.log('hay un error al obetener los usuarios', err);
      },
    );
  }

  OnPaginatorChange(event?: PageEvent): PageEvent | undefined {
    // this.pageEvent = event;
    this.refreshPaginationFilter();
    return event;
  }

  private refreshPaginationFromEvent(pageEvent: PageEvent): void {
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

  /* Whether the number of selected elements matches the total number of rows. */
  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /* Selects all rows if they are not all selected; otherwise clear selection. */
  public masterToggle(): void {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  public onCreateUser(): void {
    const dialogRefCreate = this.dialog.open(DialogAddEditUserComponent, {
      width: '700px',
    });

    dialogRefCreate.afterClosed().subscribe((response) => {
      if (response) {
        this.refreshData();
      }
    });
  }

  public onEditUser(element: any): void {
    // const data = this.selection.selected[0];
    // const dialogRefEdit = this.dialog.open(EditUserDialogComponent, {
    //   width: '700px',
    //   data,
    // });
    // dialogRefEdit.afterClosed().subscribe((response: boolean) => {
    //   if (response) {
    //     this.refreshData();
    //     this.refreshPaginationFilter();
    //   }
    // });
  }

  async onRemoveUsers(elements: any[]) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: {
        title: 'Confirmación',
        question: 'Estás seguro de eliminar este(os) elemento(s)?',
      },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      try {
        if (result) {
          await Promise.all(elements.map((item) => this.userService.delete(item.id).toPromise()));
          this.showToastr.showSucces('Elemento(s) correctamente eliminado(s)', 'Éxito', 7500);
          this.refreshData();
        }
      } catch (error) {
        this.refreshData();
      }
    });
  }

  public onUpdateUser(): void {
    // TODO action on update table of users
    this.loading = true;
    // this.progressBarService.show();
    this.refreshData();
  }

  public checkBoxSelected(event: MouseEvent, row: any): void {
    this.rowSelected = row;
    // event.stopPropagation();
    const value = this.selection.isSelected(row);
    if (!value) {
      this.selection.select(row);
    } else {
      this.selection.deselect(row);
    }
  }

  public action(): boolean {
    return this.selection.selected.length === 1;
  }

  public getUrl(image: string): string {
    return this.apiUrl.concat(image);
  }

  public setProgressConfig(): void {
    // this.progressBarService.setMode('indeterminate');
    // this.progressBarService.show();
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
}
