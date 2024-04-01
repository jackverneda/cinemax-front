import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { BaseService } from '../../../core/service/base.service';
import { LoggedInUserService } from '../../../core/service/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectionService extends BaseService {
  projectionMovie: string;
  constructor(
    private httpClient: HttpClient,
    private loggedInUser: LoggedInUserService,
  ) {
    super(httpClient, 'projections', loggedInUser);
    this.projectionMovie = this.baseUrl + '/movies/:id';
  }

  // getAll(query: any) {
  //   let limit = query.limit || 10;
  //   let offset = query.offset || 0;
  //   return this.data.slice(offset, offset + limit);
  // }
  getAllFiltered(body: any) {
    let today = new Date();
    let min = body.minPrice || 0;
    let max = body.maxPrice || 1000;
    let initDate = body.initDate.toISOString().slice(0, 10);
    let endDate = body.endDate.toISOString().slice(0, 10);
    return this.httpClient.get(`${this.baseUrl}/${initDate}/${endDate}/${min}/${max}`);
  }
  getProjectionsByMovieID(id: string) {
    return this.httpClient.get<any>(this.projectionMovie.replace(':id', id));
  }
}
