// import { UtilsService } from 'src/app/core/services/utils/utils.service';
// import { environment } from 'src/environments/environment';
import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminProjectionService } from '../../core/services/projection.service';
import { ShowToastrService } from '../../../core/service/show-toastr.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service'
import { DURATION_REGEX, URL_REGEX } from '../../../core/constants/const';
import { AdminMovieService } from '../../core/services/movie.service';
import { AdminRoomService } from '../../core/services/room.service';

@Component({
  selector: 'app-dialog-add-edit-projection',
  templateUrl: './dialog-add-edit-projection.component.html',
  styleUrls: ['./dialog-add-edit-projection.component.scss'],
})
export class DialogAddEditProjectionComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  // loggedInUser: any;
  form!: FormGroup;
  // _unsubscribeAll: Subject<any>;
  selectedProjection: any;
  allMovies: any[] = [];
  allRooms: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditProjectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectionService: AdminProjectionService,
    private movieService: AdminMovieService,
    private roomService: AdminRoomService,
    private showToastr: ShowToastrService,
    private fb: FormBuilder, //   private loggedInUserService: LoggedInUserService, //
  ) {
    //   public spinner: NgxSpinnerService,
    //   public utilsService: UtilsService,
    this.isEditing = data.isEditing;
    //   this.dialogRef.disableClose = true;
    //   this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    //   this._unsubscribeAll = new Subject<any>();
    this.selectedProjection = data.selectedProjection;
  }

  ngOnInit(): void {
    this.createForm();
    this.onLoadData();
  }

  createForm(): void {
    this.form = this.fb.group({
      movie: [this.selectedProjection?.movie, [Validators.required]],
      room: [this.selectedProjection?.room, [Validators.required]],
      price: [this.selectedProjection?.price, [Validators.required]],
      date: [this.selectedProjection?.date, [Validators.required]],
    });
  }
  // fetchData() {
  //   /*Ponga aqui las peticiones para loas datos de Tipo REFERENCE*/
  // }
  // ngOnDestroy(): void {
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }
  // //////////////////////////////////////////
  // //////////////////////////////////////////
  // onNewFileLoaded(event) {
  //   this.newFile = event;
  // }

  onLoadData() {
    this.movieService.getAll().subscribe((res: any) => (this.allMovies = res));
    this.roomService.getAll().subscribe((res: any) => (this.allRooms = res));
  }

  onSave(): void {
    //   this.spinner.show();
    let data = this.form.value;
    //   this.isSaving = true;
    if (!this.isEditing) {
      this.projectionService.post(data).subscribe(
        (response: any) => {
          this.showToastr.showSucces('Elemento creado correctamente', 'Éxito');
          // this.spinner.hide();
          this.selectedProjection = response;
          console.log('onSave -> this.selectedProjection', this.selectedProjection);
          this.isSaving = false;
          this.isEditing = true;
          this.dialogRef.close();
        },
        (error) => {
          // this.spinner.hide();
          this.isSaving = false;
          if (error.status == 404 || error.status == 403) {
            this.dialogRef.close();
          }
        },
      );
    } else {
      let dataOutput = {
        id: this.selectedProjection.id,
        ...data,
      };
      // for (let key in data) {
      //   if (!this.utilsService.isObjectEquals(this.selectedAboutUs[key], data[key])) {
      //     dataOutput[key] = data[key];
      //   }
      // }
      this.projectionService.update(dataOutput).subscribe(
        (response: any) => {
          this.showToastr.showSucces('Elemento editado correctanmete');
          // this.spinner.hide();
          this.isSaving = false;
          this.selectedProjection = response;
          this.dialogRef.close();
        },
        (error) => {
          // this.spinner.hide();
          this.isSaving = false;
          if (error.status == 404 || error.status == 403) {
            this.dialogRef.close();
          }
        },
      );
    }
  }
}
