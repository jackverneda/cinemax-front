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
import { AdminCountryService } from '../../core/services/country.service';
import { AdminActorService } from '../../core/services/actor.service';
import { AdminDirectorService } from '../../core/services/director.service';
import { AdminGenreService } from '../../core/services/genre.service';
import { DURATION_REGEX, URL_REGEX } from '../../../core/constants/const';
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
  secundaryForm!: FormGroup;
  // languages: any[] = [];
  // imageUrl: any;
  // _unsubscribeAll: Subject<any>;
  selectedMovie: any;
  allCountries: any[] = [];
  allActors: any[] = [];
  allDirectors: any[] = [];
  allGenres: any[] = [];

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
    private countryService: AdminCountryService,
    private actorService: AdminActorService,
    private directorService: AdminDirectorService,
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
      summary: [this.selectedMovie?.description, [Validators.required]],
      trailerURL: [this.selectedMovie?.trailerURL, [Validators.required, Validators.pattern(URL_REGEX)]],
      iconURL: [this.selectedMovie?.iconURL, [Validators.required, Validators.pattern(URL_REGEX)]],
      coverURL: [this.selectedMovie?.coverURL, [Validators.required, Validators.pattern(URL_REGEX)]],
      imagenURL: [this.selectedMovie?.imageURL, [Validators.required, Validators.pattern(URL_REGEX)]],
      duration: [this.selectedMovie?.duration, [Validators.required, Validators.pattern(DURATION_REGEX)]],
      premiere: [this.selectedMovie?.premiere, [Validators.required]],
    });
    this.secundaryForm = this.fb.group({
      countries: [
        this.selectedMovie?.countries.map((item: any) => {
          return item.id;
        }),
        [Validators.required],
      ],
      actors: [
        this.selectedMovie?.actors.map((item: any) => {
          return item.id;
        }),
        [Validators.required],
      ],
      directors: [
        this.selectedMovie?.directors.map((item: any) => {
          return item.id;
        }),
        [Validators.required],
      ],
      genres: [
        this.selectedMovie?.genres.map((item: any) => {
          return item.id;
        }),
        [Validators.required],
      ],
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

  onNextSecond() {
    this.stepIndex = 1;
    this.actorService.getAll().subscribe((res: any) => (this.allActors = res));
    this.directorService.getAll().subscribe((res: any) => (this.allDirectors = res));
    this.countryService.getAll().subscribe((res: any) => (this.allCountries = res));
    this.genreService.getAll().subscribe((res: any) => (this.allGenres = res));
  }

  onSave(): void {
    //   if (!this.changeBasicInfo) {
    //     this.stepIndex = 1;
    //     return;
    //   }
    //   this.spinner.show();
    //   this.updateLanguageData();
    let data = {
      ...this.form.value,
      ...this.secundaryForm.value,
    };
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
  onSlectionChange(event: any) {
    this.stepIndex = event.selectedIndex;
  }
  // ///////////////////////////////////////////////////////////////////////////////////////////
}
