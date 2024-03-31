import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/service/base.service';

@Injectable({
  providedIn: 'root',
})
export class AdminDiscountService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'discounts');
  }
}
