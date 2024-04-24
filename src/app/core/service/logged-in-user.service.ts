import { Injectable } from '@angular/core';
// import { IUser } from '../../classes/user.class';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoggedInUserService {
  $loggedInUserUpdated = new Subject<any>();
  $languageChanged = new Subject<any>();
  loggedInUser: any;
  listNavItems: any[] = [];

  constructor() {
    const data = localStorage.getItem('user');
    if (data) {
      this.loggedInUser = JSON.parse(data);
    }
  }

  public setNewProfile(profile: any) {
    let dataValue = JSON.parse(localStorage.getItem('user') || '');
    dataValue.profile = Object.assign(dataValue.profile, profile);
    localStorage.setItem('user', JSON.stringify(dataValue));
    this.loggedInUser = dataValue;
    this.$loggedInUserUpdated.next(this.loggedInUser);
  }

  public getLanguage() {
    return JSON.parse(localStorage.getItem('language') || '');
  }

  public getLoggedInUser(): any {
    let localUser = localStorage.getItem('user');
    let data = localUser ? JSON.parse(localUser) : null;
    return data;
  }
  public getTokenOfUser(): any {
    let localUser = localStorage.getItem('user');
    let data = localUser ? JSON.parse(localUser) : null;
    data = data ? data.token : null;
    return data;
  }

  public setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  public updateUserProfile(user: any) {
    let dataString: string;
    let localUser = localStorage.getItem('user');
    this.loggedInUser = localUser ? JSON.parse(localUser) : null;
    const tempdata = this.loggedInUser ? this.loggedInUser : {};
    if (user) {
      this.loggedInUser = Object.assign(tempdata, user);
    } else {
      this.loggedInUser = null;
    }
    dataString = JSON.stringify(this.loggedInUser);
    localStorage.setItem('user', dataString);
    this.$loggedInUserUpdated.next(this.loggedInUser);
  }

  public isAdminUser() {
    const user = this.getLoggedInUser();
    if (!user) {
      return false;
    }
    return user.role == 'ADMIN';
  }

  public isClientUser() {
    const user = this.getLoggedInUser();
    if (!user) {
      return false;
    }
    return user.role == 'USER';
  }

  public isModerator() {
    const user = this.getLoggedInUser();
    if (!user) {
      return false;
    }
    return user.role == 'MOD';
  }
}
