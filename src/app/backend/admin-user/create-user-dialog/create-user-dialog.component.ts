import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EMAIL_REGEX, ROLES } from '../../../core/constants/const';
import { UserService } from '../../core/services/user.service';
import { ShowToastrService } from '../../../core/service/show-toastr.service';

@Component({
  selector: 'app-dialog-add-edit-user',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
})
export class DialogAddEditUserComponent implements OnInit {
  userForm!: FormGroup;
  public roles = [ROLES.ADMIN, ROLES.USER, ROLES.MOD];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddEditUserComponent>,
    private userService: UserService,
    private toasterService: ShowToastrService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      roles: [['USER'], [Validators.required]],
      birthDay: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onClose(): void {
    this.dialogRef.close(false);
  }

  public onCreateUser(): void {
    let data = this.userForm.value;
    this.userService.post(data).subscribe(
      () => {
        this.dialogRef.close();
      },
      (err: any) => {
        this.dialogRef.close();
        console.log('este es el erro que dio al crear el usuario', err);
      },
      () => {
        this.toasterService.showSucces('Usuario creado satisfactoriamente', 'Éxito');
        this.dialogRef.close(true);
      },
    );
  }
}
