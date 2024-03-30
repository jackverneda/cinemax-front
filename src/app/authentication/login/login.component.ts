// import { NgxSpinnerService }                  from 'ngx-spinner';
// import { environment }                        from 'src/environments/environment';
import { Component, OnInit, HostListener, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavigationService } from '../../backend/core/services/navigation.service';
// import { AuthenticationService }              from 'src/app/core/services/authentication/authentication.service';
// import { LoggedInUserService }                from 'src/app/core/services/loggedInUser/logged-in-user.service';
// import { ShowToastrService }                  from 'src/app/core/services/show-toastr/show-toastr.service';
// import { UtilsService }                       from 'src/app/core/services/utils/utils.service';
// import { map }                                from 'rxjs/internal/operators/map';
// import { CookieService }                      from 'ngx-cookie-service';

// import { EncryptDecryptService } from 'src/app/core/services/encrypt-decrypt/encrypt-decrypt.service';
// import { ClientPublicService }   from '../../core/services/client-public/client-public.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  // message: string;
  loginForm: FormGroup = new FormGroup({});
  inLoading = false;
  showUsername = true;
  showPassword = false;
  passwordType = 'password';
  // valueSpiner  = 50;
  // bufferValue  = 75;
  redirect: string = '';

  clients: any[] = [];
  portalUrl = 'environment.portalUrl';
  // version        = environment.version + '.' + environment.subversion;

  // private usernameElement: ElementRef;
  // private passElement: ElementRef;

  // @ViewChild('username', { static: false }) set contentUsername(
  //   content: ElementRef
  // ) {
  //   if (content) {
  //     this.usernameElement = content;
  //   }
  // }

  // @ViewChild('pass', { static: false }) set contentPass(content: ElementRef) {
  //   if (content) {
  //     this.passElement = content;
  //   }
  // }

  constructor(
    private router: Router,
    // public authService: AuthenticationService, // private spinner: NgxSpinnerService, // private route: ActivatedRoute,
    // private showToastr: ShowToastrService,
    private fb: FormBuilder,
    // private encryptDecryptService: EncryptDecryptService,
    // private clientPublicService: ClientPublicService,
    private navigationService: NavigationService,
    // private cookieService: CookieService,
    // private utilsService: UtilsService,
    // private loggedInUserService: LoggedInUserService
  ) {
    // this.message = '';
    // this.route.queryParams.subscribe((params) => {
    //   this.redirect = params['redirect'];
    // });
  }

  // @HostListener('keypress', ['$event']) onKeyPress(event) {
  //   if (event.code === 'Enter') {
  //     this.passwordType = 'password';
  //     if (this.loginForm.valid) {
  //       this.login(
  //         this.loginForm.controls['username'].value,
  //         this.loginForm.controls['password'].value
  //       );
  //     }
  //   }
  // }

  ngOnInit() {
    this.createForm();
    // this.clientPublicService.getAll().subscribe(data => {
    //   this.clients = data.data;
    //   if (this.clients.length && this.redirect && environment.production) {
    //     let service = this.clients.find(item => {
    //       let index = item.domain.indexOf('.cu');
    //       if (index !== -1) {
    //         let str = item.domain.substring(0, index + 3);
    //         if (this.redirect.startsWith(str)) {
    //           return item;
    //         }
    //       }
    //     });
    //     if (!service) {
    //       this.redirect = null;
    //     }
    //   }
    // });
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   // if (this.username) {
    //   this.usernameElement.nativeElement.focus();
    //   // }
    // }, 200);
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required],
      ],
      password: [
        {
          value: null,
          disabled: false,
        },
        [Validators.required],
      ],
    });
  }

  validateUserName() {
    //   localStorage.removeItem('user');
    //   this.inLoading = true;
    //   this.authService
    //       .validateUsername(this.loginForm.get('username').value)
    //       .subscribe(
    //         (result: any) => {
    //           if (result.action === 'next') {
    //             // email valido y continua con el proceso de login
    //             this.inLoading    = false;
    //             this.showPassword = true;
    //             this.showUsername = false;
    //           }
    //           else if (result.action === 'validate') {
    //             // es un proceso de registro a medias
    //             this.showToastr.showInfo(
    //               'Necesita validar su usuario',
    //               'Información!',
    //               5500
    //             );
    //             this.router.navigate(['authentication/activate-account'], {
    //               queryParams: {
    //                 email: this.loginForm.get('username').value
    //               }
    //             });
    //           }
    //           else if (result.action === 'notFound') {
    //             // no es un usuario valido
    //             this.inLoading = false;
    //             this.showToastr.showError('Usuario no encontrado.', 'Error!', 5500);
    //           }
    //           else if (result.action === 'disabled') {
    //             // no es un usuario valido
    //             this.inLoading = false;
    //             this.showToastr.showInfo(
    //               'Su usuario no está habilitado en el sistema, contacte con el administrador',
    //               '',
    //               5500
    //             );
    //           }
    //           else {
    //             this.inLoading = false;
    //             this.showToastr.showError(
    //               'Usuario o contraseña incorrectos',
    //               'Error!',
    //               5500
    //             );
    //           }
    //         },
    //         (error) => {
    //           this.inLoading = false;
    //           // this.utilsService.errorHandle(error);
    //         }
    //       );
  }

  login(username: string, password: string): boolean {
    //   this.spinner.show();
    //   localStorage.removeItem('user');
    //   this.inLoading = true;
    //   this.authService
    //       .login(username, password)
    //       .pipe(
    //         map((result: any) => {
    //           let user         = result.data.profile;
    //           user.token       = result.data.Authorization;
    //           const hashedPass = this.encryptDecryptService.encrypt(user.token);
    //           this.cookieService.set(
    //             'account',
    //             hashedPass,
    //             null,
    //             '/',
    //             environment.mainDomain
    //           );
    //           return result;
    //         })
    //       )
    //       .subscribe(
    //         async (result: any) => {
    //           let user   = result.data.profile;
    //           user.token = result.data.Authorization;

    //           this.loggedInUserService.updateUserProfile(user);
    //           this.showToastr.showSucces(
    //             'Usted está logeado en nuestro sistema.',
    //             'Felicidades!',
    //             5500
    //           );

    //           if (this.redirect) {
    //             document.location.href = this.redirect;
    //           }
    //           else {
    //             this.router.navigate(['backend/profile']);
    //           }
    //           this.spinner.hide();
    //         },
    //         (error) => {
    //           this.inLoading = false;
    //           this.spinner.hide();
    //           // this.utilsService.errorHandle(error);
    //         }
    //       );

    return false;
  }

  showUsernamePassword() {
    this.showPassword = false;
    this.showUsername = true;
  }

  gotoRegister() {
    this.router.navigate(['authentication/register'], {
      queryParams: {
        redirect: this.redirect,
      },
    });
  }
}
