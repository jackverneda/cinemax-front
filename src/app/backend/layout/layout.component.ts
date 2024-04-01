// import { CeApplicationPanelOptions } from 'guachos-ce-application-panel';
// import { UserPanelOptions } from 'guachos-ce-user-panel';
import { takeUntil } from 'rxjs/operators';
// import { CookieService }                     from 'ngx-cookie-service';
import { Component, ViewChild, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription, Subject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from '../core/services/navigation.service';
import { LoggedInUserService } from '../../core/service/logged-in-user.service';
// import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
// import { environment } from 'src/environments/environment';
// import { ShowToastrService } from 'src/app/core/services/show-toastr/show-toastr.service';
// import { PanelNotificationsComponent } from '../common-layout-components/panel-notifications/panel-notifications.component';
// import { SpinnerLoadingService } from '../services/spinner-loading/spinner-loading.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, OnDestroy {
  applyStyle = false;
  innerWidth: any;
  previousUrl = '';
  currentUrl = '';
  loggedInUser: any;
  _unsubscribeAll = new Subject<any>();
  portalUrl = 'environment.portalUrl';
  userUrl = 'environment.apiUrl';
  version = 'environment.version';
  subversion = 'environment.subversion';
  separator = '/';
  isHandset = false;
  isSmallDevice: boolean = false;
  valueSpiner = 50;
  bufferValue = 75;
  totalCasosPendientes = 0;

  url = 'environment.apiUrl';

  optionUserPanel = {
    showProfile: true,
    showSecondaryLogout: false,
  };

  compressSidnavState = false;
  isMouseInSidenav = false;
  hoverSidnavState = false;

  public currencies = ['USD', 'EUR'];

  currency: any = null;

  @ViewChild('drawer', { static: true })
  public sidenav: any;
  navigationData: any[] = [];
  year: any = '2024';

  applicationPanel = {
    urlClients: 'environment.authApiUrl',
    isForClient: '1',
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    public dialog: MatDialog,
    // private cookieService: CookieService,
    private navigationService: NavigationService,
    // public authService: AuthenticationService,
    // public spinnerLoading: SpinnerLoadingService,
    private loggedInUserService: LoggedInUserService,
    // private showToastr: ShowToastrService,
  ) {
    // const token = this.cookieService.check('account');
    // const tempAccount = this.cookieService.check('tempAccount');
    // if (token) {
    //   this.optionUserPanel.showSecondaryLogout = tempAccount;
    //   this.loggedInUser = loggedInUserService.getLoggedInUser();
    //   if (this.loggedInUser.role === 'Admin') {
    //     this.applicationPanel = {
    //       urlClients: environment.authApiUrl,
    //       isForClient: '2',
    //     };
    //   } else {
    //     this.applicationPanel = {
    //       urlClients: environment.authApiUrl,
    //       isForClient: '1',
    //     };
    //   }
    this.getNavBackend();
    //   loggedInUserService.$loggedInUserUpdated.pipe(takeUntil(this._unsubscribeAll)).subscribe((data) => {
    //     this.loggedInUser = loggedInUserService.getLoggedInUser();
    //     if (this.loggedInUser.role === 'Admin') {
    //       this.applicationPanel = {
    //         urlClients: environment.authApiUrl,
    //         isForClient: '2',
    //       };
    //     } else {
    //       this.applicationPanel = {
    //         urlClients: environment.authApiUrl,
    //         isForClient: '1',
    //       };
    //     }
    //     this.getNavBackend();
    //     const tempAccount = this.cookieService.check('tempAccount');
    //     if (tempAccount) {
    //       this.optionUserPanel.showSecondaryLogout = true;
    //     }
    //   });
    //   this.breakpointObserver
    //     .observe([Breakpoints.Medium, Breakpoints.Handset, Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Tablet])
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((data) => {
    //       this.isHandset = data.matches;
    //       this.isSmallDevice = data.matches;
    //     });
    //   this.router.events.pipe(takeUntil(this._unsubscribeAll)).subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       this.previousUrl = this.currentUrl;
    //       this.currentUrl = event.url;
    //       if (this.isHandset && this.sidenav && this.sidenav.opened) {
    //         const TimeCloseSid = setTimeout(() => {
    //           this.sidenav.close();
    //           clearTimeout(TimeCloseSid);
    //         }, 250);
    //       }
    //     }
    //   });
    //   this.year = new Date().getFullYear();
    // } else {
    //   localStorage.clear();
    // }
  }

  removeCookies() {
    // document.cookie = 'account=;domain=.' + environment.mainDomain + ';path=/;max-age=0';
    // document.cookie = 'tempAccount=;domain=.' + environment.mainDomain + ';path=/;max-age=0';
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth > 600) {
      this.applyStyle = false;
    } else {
      this.applyStyle = true;
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  onUserLogout() {
    // this.authService.logout().subscribe(() => {
    //   this.showToastr.showInfo('Usuario deslogeado exitósamente', 'Ok');
    //   this.logout();
    // });
    return true;
  }

  onLogoutAlternativa() {
    // let token = this.loggedInUserService.restoreAccountCookie();
    // this.loggedInUserService.setToken(token);
    // this.loggedInUserService.getProfile().subscribe((user) => {
    //   console.log(user);
    //   this.loggedInUserService.updateUserProfile(user.data);
    //   this.showToastr.showInfo('Usuario deslogeado exitósamente', 'Ok');
    // });
  }

  getNavBackend() {
    this.navigationData = this.navigationService.getNavBackend().map((navItem) => {
      // if (navItem.id === 'usuarios' || navItem.id === 'mis-aplicaciones') {
      //   navItem.hasPermission = this.loggedInUserService.isAdminUser() || this.loggedInUserService.isAdminPartialUser();
      // }
      // if (navItem.id === 'registros' || navItem.id === 'configuracion') {
      //   navItem.hasPermission = this.loggedInUserService.isAdminUser();
      // }
      return navItem;
    });
  }

  onCompress() {
    if (!this.isHandset) {
      this.compressSidnavState = !this.compressSidnavState;
    }
  }

  onLogout(): void {
    this.removeCookies();
    localStorage.removeItem('user');
    this.loggedInUserService.setLoggedInUser(null);
    localStorage.clear();
    this.router.navigate(['authentication']);
  }

  onMouseEnterSidenav(event: any) {
    this.isMouseInSidenav = true;
    if (this.compressSidnavState) {
      const sidenavId = document.querySelector('#sidenavId');
      const sidenavContentId = document.querySelector('#sidenavContentId');
      sidenavId?.classList.remove('compressSidnav');
      sidenavContentId?.classList.remove('expandSidnavContent');
      sidenavContentId?.classList.add('marginLeft300');
    }
  }

  onMouseLeaveSidenav(event: any) {
    this.isMouseInSidenav = false;
    if (this.compressSidnavState) {
      const sidenavId = document.querySelector('#sidenavId');
      const sidenavContentId = document.querySelector('#sidenavContentId');
      sidenavId?.classList.add('compressSidnav');
      sidenavContentId?.classList.remove('marginLeft300');
      sidenavContentId?.classList.add('expandSidnavContent');
    }
  }

  onEditProfile() {
    this.router.navigate(['backend/profile']);
  }
}
