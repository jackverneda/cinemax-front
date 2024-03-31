import { debounceTime, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
// import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service';
// import { environment } from 'src/environments/environment';
// import { BreadcrumbService } from '../../../common-layout-components/breadcrumd/service/breadcrumb.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IPagination } from '../../core/classes/pagination.class';
import { ShowToastrService } from '../../core/service/show-toastr.service';
import { DialogAddEditPaymentComponent } from './dialog-add-edit-payment/dialog-add-edit-payment.component';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { AdminPaymentService } from '../core/services/payment.service';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.scss'],
})
export class AdminPaymentComponent implements OnInit, OnDestroy {
  allPayments: any;
  formFilters!: FormGroup;
  dataSource: MatTableDataSource<any>;
  showFilterAboutUs: boolean = false;
  loggedInUser: any;
  _unsubscribeAll: Subject<any>;
  selection: SelectionModel<any>;
  imageUrl: any;
  showActionsBtn = false;
  initialPage = 10;
  pageSizeOptions: number[] = [this.initialPage, 25, 100, 1000];
  searchElementCount = 0;
  @ViewChild(MatPaginator, {
    static: true,
  })
  paginator?: MatPaginator;

  isLoading = false;
  query: IPagination = {
    limit: this.initialPage,
    offset: 0,
    total: 0,
    page: 0,
    order: 'id',
    filter: {
      filterText: '',
      properties: [],
    },
  };

  displayedColumns: string[] = ['select', 'name', 'actions'];
  displayedColumnsFilters: string[] = ['selectF', 'titleF', 'actionsF'];

  constructor(
    private fb: FormBuilder,
    // private loggedInUserService: LoggedInUserService,
    private paymentService: AdminPaymentService,
    // private breadcrumbService: BreadcrumbService,
    public dialog: MatDialog,
    private showToastr: ShowToastrService,
  ) {
    this._unsubscribeAll = new Subject<any>();
    this.dataSource = new MatTableDataSource<any>([]);
    this.selection = new SelectionModel<any>(true, []);
    // this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    this.imageUrl = 'environment.imageUrl';
  }

  ngOnInit() {
    this.createSearchForm();
    this.refreshData();

    // this.breadcrumbService.clearBreadcrumd();
    // this.breadcrumbService.setBreadcrumd('Sobre Nosotros', true);

    ///////////////////////////////////////////

    this.formFilters.valueChanges.pipe(debounceTime(500)).subscribe((data) => {
      this.refreshData();
    });
    //////////////////////////////////////////////
    this.fetchData();
  }

  fetchData() {
    /*Ponga aqui las peticiones para loas datos de Tipo REFERENCE*/
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }

  refreshData(): void {
    this.isLoading = true;
    this.paymentService.getAll().subscribe(
      (data: any) => {
        this.initTable(data);
        // this.query.total = data.meta.pagination.total;
        this.selection.clear();
        this.isLoading = false;
      },
      () => {
        this.selection.clear();
        this.isLoading = false;
      },
    );
  }

  initTable(data: any[]) {
    this.allPayments = data;
    console.log(this.allPayments);
    this.dataSource = new MatTableDataSource(data);
  }

  createSearchForm() {
    this.formFilters = this.fb.group({
      type: [null, []],
      summary: [null, []],
    });
  }

  //////////////////// Pagination Api ////////////////////////////
  OnPaginatorChange(event: any) {
    if (event) {
      this.query.limit = event.pageSize || this.initialPage;
      this.query.offset = event.pageIndex * event.pageSize;
      this.query.page = event.pageIndex;
    } else {
      this.query.limit = this.initialPage;
      this.query.offset = 0;
      this.query.page = 1;
    }
    this.refreshData();
  }
  /////////////////////////////////////
  /////// Select logic/////////////////

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  //////////////////////////////

  onCreatePayment(): void {
    let dialogRef: MatDialogRef<DialogAddEditPaymentComponent, any>;
    dialogRef = this.dialog.open(DialogAddEditPaymentComponent, {
      panelClass: 'app-dialog-add-edit-about-us',
      maxWidth: '60vw',
      maxHeight: '100vh',
      data: {
        isEditing: false,
        selectedPayment: null,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshData();
    });
  }

  onEditPayment(payment: any): void {
    this.paymentService.get(payment.id).subscribe(
      (data: any) => {
        let dialogRef: MatDialogRef<DialogAddEditPaymentComponent, any>;
        dialogRef = this.dialog.open(DialogAddEditPaymentComponent, {
          panelClass: 'app-dialog-add-edit-about-us',
          maxWidth: '60vw',
          maxHeight: '100vh',
          data: {
            isEditing: true,
            selectedPayment: data.data,
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          this.refreshData();
        });
      },
      (error: any) => {},
    );
  }

  async onRemovePayments(elements: any[]) {
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
          await Promise.all(elements.map((item) => this.paymentService.delete(item.id).toPromise()));
          this.showToastr.showSucces('Elemento(s) correctamente eliminado(s)', 'Éxito', 7500);
          this.refreshData();
        }
      } catch (error) {
        this.refreshData();
      }
    });
  }
}
