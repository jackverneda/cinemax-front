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
import { AdminRoomService } from '../../core/services/room.service';
import { AdminRoomTypeService } from '../../core/services/room-type.service';

@Component({
  selector: 'app-dialog-add-edit-room',
  templateUrl: './dialog-add-edit-room.component.html',
  styleUrls: ['./dialog-add-edit-room.component.scss'],
})
export class DialogAddEditRoomComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  // loggedInUser: any;
  form!: FormGroup;
  // _unsubscribeAll: Subject<any>;
  selectedRoom: any;
  allTypes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogAddEditRoomComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roomService: AdminRoomService,
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
    this.selectedRoom = data.selectedRoom;
    //   this.imageUrl = environment.imageUrl;
  }
  ngOnInit(): void {
    this.createForm();
    this.roomTypeService.getAll().subscribe((res: any) => (this.allTypes = res));
  }
  createForm(): void {
    this.form = this.fb.group({
      name: [this.selectedRoom?.name, [Validators.required]],
      roomTypes: [this.selectedRoom?.roomType, [Validators.required]],
      height: [this.selectedRoom?.height, [Validators.required]],
      width: [this.selectedRoom?.width, [Validators.required]],
    });
  }
  // ngOnDestroy(): void {
  //   this._unsubscribeAll.next();
  //   this._unsubscribeAll.complete();
  // }
  onSave(): void {
    let data = this.form.value;
    this.isSaving = true;
    if (!this.isEditing) {
      this.roomService.post(data).subscribe(
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
        id: this.selectedRoom.id,
        ...data,
      };
      // for (let key in data) {
      //   if (!this.utilsService.isObjectEquals(this.selectedAboutUs[key], data[key])) {
      //     dataOutput[key] = data[key];
      //   }
      // }
      this.roomService.update(dataOutput).subscribe(
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
