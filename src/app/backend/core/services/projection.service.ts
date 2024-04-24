import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/service/base.service';
import { LoggedInUserService } from '../../../core/service/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProjectionService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private loggedInUser: LoggedInUserService,
  ) {
    super(httpClient, 'projections', loggedInUser);
  }
}
