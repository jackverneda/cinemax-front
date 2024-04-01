import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/service/base.service';
import { LoggedInUserService } from '../../../core/service/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminPaymentService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private loggedInUser: LoggedInUserService,
  ) {
    super(httpClient, 'paymentTypes', loggedInUser);
  }
}
