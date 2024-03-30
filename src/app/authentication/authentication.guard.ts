import { environment }           from '../../environments/environment';
import { AuthenticationService } from './../core/services/authentication/authentication.service';
import { Injectable }            from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
}                                from '@angular/router';
import { Observable }            from 'rxjs';
import { LoggedInUserService }   from '../core/services/loggedInUser/logged-in-user.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loggedInUserService: LoggedInUserService,
    private cookieService: CookieService
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkAccess();
  }

  checkAccess(): boolean {
    const loggedInUser = this.loggedInUserService.getLoggedInUser();
    const token = this.cookieService.check('account');
    if (loggedInUser && token) {
      this.router.navigate(['backend/profile']);
      return true;
    } else {
      document.cookie = 'account=;domain=.' + environment.mainDomain + ';path=/;max-age=0';
      document.cookie = 'tempAccount=;domain=.' + environment.mainDomain + ';path=/;max-age=0';
      this.authenticationService.logout();
      return true;
    }
  }
}
