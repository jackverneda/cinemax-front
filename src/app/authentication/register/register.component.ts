import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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
  message: string;
  // form: FormGroup;
  // formPass: FormGroup;
  inLoading = false;
  passwordType = 'password';
  valueSpiner = 50;
  bufferValue = 75;
  captcha: any;
  uuid: any;
  // portalUrl = environment.portalUrl;
  // redirect: string;
  // email: string;
  genders = [
    {
      id: 'male',
      text: 'Hombre',
    },
    {
      id: 'female',
      text: 'Mujer',
    },
  ];
  // @ViewChild('username', { static: true }) username: ElementRef;
  // @ViewChild('pass', { static: true }) pass: ElementRef;

  constructor(
    private route: ActivatedRoute,
    // private spinner: NgxSpinnerService,
    // public authService: AuthenticationService,
    private router: Router,
    // private showToastr: ShowToastrService,
    private fb: FormBuilder,
  ) {
    this.message = '';

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
    // this.formPass = this.fb.group(
    //   {
    //     password: [null, Validators.required],
    //     repeat  : [null, Validators.required]
    //   },
    //   { validator: this.matchValidator.bind(this) }
    // );
    // this.form = this.fb.group({
    //   name         : [null, [Validators.required]],
    //   lastName     : [null, [Validators.required]],
    //   email        : [this.email, [Validators.email, Validators.required]],
    //   clientType   : [environment.clientType],
    //   clientVersion: [environment.version],
    //   redirect     : [this.redirect],
    //   uuid_: [this.uuid],
    //   captcha: [null],
    //   passwords    : this.formPass
    // });
  }

  matchValidator(group: FormGroup) {
    const pass = group.controls['password'].value;
    const repeat = group.controls['repeat'].value;
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

  // singUp(): boolean {
  //   this.spinner.show();
  //   localStorage.removeItem('user');
  //   let data       = this.form.value;
  //   data.password  = data.passwords.password;
  //   data.uuid_ = this.uuid;
  //   data.url       = this.redirect || environment.url;
  //   this.inLoading = true;
  //   this.authService.singUp(data).subscribe(
  //     (result: any) => {

  //       this.showToastr.showInfo(
  //         'Ha sido enviado un código de activación a su correo electrónico.',
  //         'Información',
  //         5500
  //       );

  //       this.router.navigate(['/authentication/activate-account'], {
  //         queryParams: {
  //           email   : data.email,
  //           redirect: this.redirect
  //         }
  //       });

  //       this.spinner.hide();
  //       this.inLoading = false;
  //     },
  //     (error) => {
  //       this.inLoading = false;
  //       this.spinner.hide();
  //       // this.utilsService.errorHandle(error);
  //     }
  //   );

  //   return false;
  // }
}
