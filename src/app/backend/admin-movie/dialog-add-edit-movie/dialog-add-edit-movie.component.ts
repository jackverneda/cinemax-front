// import { UtilsService } from 'src/app/core/services/utils/utils.service';
// import { environment } from 'src/environments/environment';
import { Component, Inject, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminMovieService } from '../../core/services/movie.service';
import { ShowToastrService } from '../../../core/service/show-toastr.service';
// import { NgxSpinnerService } from 'ngx-spinner';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';
// import { LoggedInUserService } from 'src/app/core/services/loggedInUser/logged-in-user.service'
import { ckEditorBasicConfig } from '../../../core/constants/ckeditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-add-edit-movie',
  templateUrl: './dialog-add-edit-movie.component.html',
  styleUrls: ['./dialog-add-edit-movie.component.scss'],
})
export class DialogAddEditMovieComponent implements OnInit {
  isSaving = false;
  isEditing = false;
  // loggedInUser: any;
  form!: FormGroup;
  // languages: any[] = [];
  // imageUrl: any;
  // _unsubscribeAll: Subject<any>;
  selectedMovie: any;
  public Editor = ClassicEditor;

  public onReady(editor: any) {
    console.log('CKEditor5 Angular Component is ready to use!', editor);
  }
  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log(data);
  }
  // allStatus: any[] = ['enabled', 'disabled', 'pending'];
  // /////////////////////////////////////////////////
  // languageData: any = {};
  stepIndex = 0;
  // changeBasicInfo = false;
  // newFile = undefined;
  constructor(
    public dialogRef: MatDialogRef<DialogAddEditMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private movieService: AdminMovieService,
    private showToastr: ShowToastrService,
    private fb: FormBuilder, //   private loggedInUserService: LoggedInUserService, //
  ) {
    //   public spinner: NgxSpinnerService,
    //   public utilsService: UtilsService,
    this.isEditing = data.isEditing;
    //   this.dialogRef.disableClose = true;
    //   this.loggedInUser = this.loggedInUserService.getLoggedInUser();
    //   this._unsubscribeAll = new Subject<any>();
    this.selectedMovie = data.selectedMovie;
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
      name: [this.selectedMovie?.name, [Validators.required]],
      description: [this.selectedMovie?.description, [Validators.required]],
      trailerURL: [this.selectedMovie?.trailerURL, [Validators.required]],
      iconURL: [this.selectedMovie?.iconURL, [Validators.required]],
      duration: [this.selectedMovie?.duration, [Validators.required]],
      premiere: [this.selectedMovie?.premier, [Validators.required]],
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
  onSave(): void {
    //   if (!this.changeBasicInfo) {
    //     this.stepIndex = 1;
    //     return;
    //   }
    //   this.spinner.show();
    //   this.updateLanguageData();
    let data = this.form.value;
    //   this.isSaving = true;
    if (!this.isEditing) {
      this.movieService.post(data).subscribe(
        (response: any) => {
          this.showToastr.showSucces('Elemento creado correctamente', 'Éxito');
          // this.spinner.hide();
          this.selectedMovie = response;
          this.stepIndex = 1;
          // this.changeBasicInfo = false;
          console.log('onSave -> this.selectedMovie', this.selectedMovie);
          this.isSaving = false;
          this.isEditing = true;
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
        id: this.selectedMovie.id,
        ...data,
      };
      // for (let key in data) {
      //   if (!this.utilsService.isObjectEquals(this.selectedAboutUs[key], data[key])) {
      //     dataOutput[key] = data[key];
      //   }
      // }
      this.movieService.update(dataOutput).subscribe(
        (response: any) => {
          this.showToastr.showSucces('Elemento editado correctanmete');
          // this.spinner.hide();
          this.stepIndex = 1;
          this.isSaving = false;
          // this.changeBasicInfo = false;
          this.selectedMovie = response;
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
  onSlectionChange(event: any) {
    this.stepIndex = event.selectedIndex;
  }
  // ///////////////////////////////////////////////////////////////////////////////////////////
  onFinish() {
    this.dialogRef.close();
  }
}
