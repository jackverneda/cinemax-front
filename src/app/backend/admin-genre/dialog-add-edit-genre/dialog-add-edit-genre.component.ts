// import { UtilsService } from 'src/app/core/services/utils/utils.service';
// import { environment } from 'src/environments/environment';
import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ShowToastrService } from '../../../core/service/show-toastr.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service'
import { AdminGenreService } from '../../core/services/genre.service';

@Component({
  selector: 'app-dialog-add-edit-genre',
  templateUrl: './dialog-add-edit-genre.component.html',
  styleUrls: ['./dialog-add-edit-genre.component.scss'],
})
export class DialogAddEditGenreComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  // loggedInUser: any;
  form!: FormGroup;
  // _unsubscribeAll: Subject<any>;
  selectedGenre: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditGenreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private genreService: AdminGenreService,
    private showToastr: ShowToastrService,
    private fb: FormBuilder, //   private loggedInUserService: LoggedInUserService, //
  ) {
    //   public spinner: NgxSpinnerService,
    //   public utilsService: UtilsService,
    this.isEditing = data.isEditing;
    //   this.dialogRef.disableClose = true;
    //   this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    //   this._unsubscribeAll = new Subject<any>();
    this.selectedGenre = data.selectedGenre;
    //   this.imageUrl = environment.imageUrl;
  }
  ngOnInit(): void {
    this.createForm();
    //   //////////////////////////////////////////////
    //   this.fetchData();
    //   this.form.valueChanges.subscribe(() => {
    //     this.changeBasicInfo = true;
    //   });
  }
  createForm(): void {
    this.form = this.fb.group({
      name: [this.selectedGenre?.name, [Validators.required]],
    });
  }
  // ngOnDestroy(): void {
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }
  // //////////////////////////////////////////
  // //////////////////////////////////////////
  // onNewFileLoaded(event) {
  //   this.newFile = event;
  // }
  onSave(): void {
    let data = this.form.value;
    this.isSaving = true;
    if (!this.isEditing) {
      this.genreService.post(data).subscribe(
        (response: any) => {
          this.showToastr.showSucces('Elemento creado correctamente', 'Éxito');
          // this.spinner.hide();
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
        id: this.selectedGenre.id,
        ...data,
      };
      // for (let key in data) {
      //   if (!this.utilsService.isObjectEquals(this.selectedAboutUs[key], data[key])) {
      //     dataOutput[key] = data[key];
      //   }
      // }
      this.genreService.update(dataOutput).subscribe(
        (response: any) => {
          this.showToastr.showSucces('Elemento editado correctanmete');
          // this.spinner.hide();
          this.isSaving = false;
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
  // ///////////////////////////////////////////////////////////////////////////////////////////
  onClose() {
    this.dialogRef.close();
  }
}
