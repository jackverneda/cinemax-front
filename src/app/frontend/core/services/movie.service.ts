import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/service/base.service';
import { LoggedInUserService } from '../../../core/service/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class MovieService extends BaseService {
  data: any[] = [];
  movieByName!: string;

  constructor(
    private httpClient: HttpClient,
    private loggedInUser: LoggedInUserService,
  ) {
    super(httpClient, 'movies', loggedInUser);
    this.movieByName = this.baseUrl + '/name/:value';
  }

  getAllFiltered(name: string) {
    return this.httpClient.get(this.movieByName.replace(':value', name));
  }
}
