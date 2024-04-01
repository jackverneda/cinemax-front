import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { IUser } from '../../classes/user.class';
import { LoggedInUserService } from './logged-in-user.service';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userUrl = environment.apiUrl + 'users/login';
  userLogout = environment.apiUrl + 'users/logout';
  urlSingUp = environment.apiUrl + 'user/sign-up';
  urlSendPing = environment.apiUrl + 'auth/validate';
  urlForgot = environment.apiUrl + 'auth/forgot';
  urlChangePass = environment.apiUrl + 'auth/forgot';
  urlChangePassUserloged = environment.apiUrl + 'change-pass';

  // -----------------------URL UPDATE PERSON------------------------ //
  urlProfile = environment.apiUrl + 'profile';

  constructor(private httpClient: HttpClient) {}

  login(user: string, password: string) {
    const base64EncodedPw = btoa(user + ':' + password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64EncodedPw,
      }),
      email: user,
      password: password,
    };

    return this.httpClient.post<any>(this.userUrl, httpOptions);
  }

  logout(): Observable<any> {
    return this.httpClient.get(this.userLogout);
  }

  singUp(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlSingUp, body);
  }

  validatePing(body: any): Observable<any> {
    return this.httpClient.post<any>(this.urlSendPing, body);
  }

  passForgot(body: any): Observable<any> {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('email', body.email);
    return this.httpClient.get<any>(this.urlForgot, { params: httpParams });
  }
  changePass(body: any): Observable<any> {
    return this.httpClient.patch<any>(this.urlChangePass, body);
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  editProfile(data: any): Observable<any> {
    return this.httpClient.patch(this.urlProfile, data);
  }

  changePasswordUserLoged(data: any): Observable<any> {
    return this.httpClient.post(this.urlChangePassUserloged, data);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  {
    provide: AuthenticationService,
    useClass: AuthenticationService,
  },
];
