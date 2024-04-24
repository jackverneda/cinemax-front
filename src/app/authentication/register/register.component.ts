import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { EMAIL_REGEX } from '../../core/constants/const';
import { AuthenticationService } from '../../core/service/authentication.service';
import { ShowToastrService } from '../../core/service/show-toastr.service';
import { LoggedInUserService } from '../../core/service/logged-in-user.service';
// import { NgxSpinnerService }                  from 'ngx-spinner';
// import { AuthenticationService }              from 'src/app/core/services/authentication/authentication.service';
// import { ShowToastrService }                  from 'src/app/core/services/show-toastr/show-toastr.service';
// import { environment }                        from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  formPass!: FormGroup;
  inLoading = false;
  passwordType = 'password';
  valueSpiner = 50;
  bufferValue = 75;
  // portalUrl = environment.portalUrl;
  // redirect: string;
  // email: string;
  // @ViewChild('username', { static: true }) username: ElementRef;
  // @ViewChild('pass', { static: true }) pass: ElementRef;

  constructor(
    private route: ActivatedRoute,
    // private spinner: NgxSpinnerService,
    public authService: AuthenticationService,
    private router: Router,
    private showToastr: ShowToastrService,
    private fb: FormBuilder,
    private loggedInUserService: LoggedInUserService,
  ) {
    // this.route.queryParams.subscribe((params) => {
    //   this.redirect = params['redirect'];
    //   this.email = params['email'];
    // });
  }

  // @HostListener('keypress', ['$event']) onKeyPress(event) {
  //   if (event.code === 'Enter') {
  //     this.passwordType = 'password';
  //     if (this.form.controls['username'].valid) {
  //       this.pass.nativeElement.focus();
  //     }
  //   }
  // }

  ngOnInit() {
    // this.authService.getCaptcha().subscribe((data)=>{
    //   this.captcha = data.captcha;
    //   this.uuid  = data.uuid
    // })
    // this.createForm();
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.username.nativeElement.focus();
    // });
  }

  createForm() {
    this.formPass = this.fb.group(
      {
        password: [null, Validators.required],
        repeat: [null, Validators.required],
      },
      // { validator: this.matchValidator.bind(this) },
    );
    this.form = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.pattern(EMAIL_REGEX), Validators.required]],
      birthday: [null],
      passwords: this.formPass,
    });
  }
  getControl(control: AbstractControl) {
    return control as FormControl;
  }

  matchValidator(group: FormGroup) {
    const pass = group?.get('password')?.value;
    const repeat = group?.get('repeat')?.value;
    if (pass === repeat) {
      return null;
    }
    return {
      mismatch: true,
    };
  }

  // onRefreshCaptcha(){
  //   this.authService.getCaptcha().subscribe((data)=>{
  //     this.captcha = data.captcha;
  //     this.uuid  = data.uuid
  //   })
  // }

  singUp(): boolean {
    // this.spinner.show();
    localStorage.removeItem('user');
    let data = this.form.value;
    data.password = data.passwords.password;
    this.inLoading = true;
    this.authService.singUp(data).subscribe(
      (result: any) => {
        this.loggedInUserService.updateUserProfile(result);
        this.showToastr.showSucces('Bienvenido a la Familia de Cinemax', 'Exito', 5500);
        this.inLoading = false;
        this.router.navigate(['/frontend/home']);
        // this.spinner.hide();
        this.inLoading = false;
      },
      (error) => {
        this.inLoading = false;
        // this.spinner.hide();
        // this.utilsService.errorHandle(error);
      },
    );

    return false;
  }
}
