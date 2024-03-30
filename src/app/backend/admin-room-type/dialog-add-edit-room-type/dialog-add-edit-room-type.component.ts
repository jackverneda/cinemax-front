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
import { AdminRoomTypeService } from '../../core/services/room-type.service';

@Component({
  selector: 'app-dialog-add-edit-room-type',
  templateUrl: './dialog-add-edit-room-type.component.html',
  styleUrls: ['./dialog-add-edit-room-type.component.scss'],
})
export class DialogAddEditRoomTypeComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  // loggedInUser: any;
  form!: FormGroup;
  // _unsubscribeAll: Subject<any>;
  selectedRoomType: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditRoomTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomTypeService: AdminRoomTypeService,
    private showToastr: ShowToastrService,
    private fb: FormBuilder, //   private loggedInUserService: LoggedInUserService, //
  ) {
    //   public spinner: NgxSpinnerService,
    //   public utilsService: UtilsService,
    this.isEditing = data.isEditing;
    //   this.dialogRef.disableClose = true;
    //   this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    //   this._unsubscribeAll = new Subject<any>();
    this.selectedRoomType = data.selectedRoomType;
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
      name: [this.selectedRoomType?.name, [Validators.required]],
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
      this.roomTypeService.post(data).subscribe(
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
        id: this.selectedRoomType.id,
        ...data,
      };
      // for (let key in data) {
      //   if (!this.utilsService.isObjectEquals(this.selectedAboutUs[key], data[key])) {
      //     dataOutput[key] = data[key];
      //   }
      // }
      this.roomTypeService.update(dataOutput).subscribe(
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
