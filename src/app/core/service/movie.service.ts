import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient, 'movies');
  }
}
