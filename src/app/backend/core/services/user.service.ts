import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../../core/service/base.service';
import { LoggedInUserService } from '../../../core/service/logged-in-user.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    private httpClient: HttpClient,
    private loggedInUser: LoggedInUserService,
  ) {
    super(httpClient, 'users', loggedInUser);
  }

  // public getUsersByFilter(query?: any, filterValue?: any): Observable<ResponseI<User>> {
  //   console.log('AQUI ENTRA');
  //   let httpParams = new HttpParams();
  //   if (query?.limit) {
  //     httpParams = httpParams.append('limit', query.limit.toString());
  //     httpParams = httpParams.append('offset', query.offset.toString());

  //     if (query?.filter && query?.filter.properties) {
  //       query.filter.properties.forEach((item) => {
  //         httpParams = httpParams.append(item, '%' + query.filter.filterText + '%');
  //       });
  //     }

  //     if (query.order) {
  //       httpParams = httpParams.append('order', query.order);
  //     }
  //   }

  //   if (filterValue?.roles) {
  //     httpParams = httpParams.append('roles', filterValue.roles);
  //   }

  //   // if (filterValue?.firstName) {
  //   //   httpParams = httpParams.append('firstName', filterValue.firstName);
  //   // }

  //   // if (filterValue?.email) {
  //   //   httpParams = httpParams.append('firstName', filterValue.email);
  //   // }

  //   if (filterValue?.firstName) {
  //     filterValue.firstName = 'like:' + filterValue?.firstName;
  //     httpParams = httpParams.append('firstName', filterValue.firstName);
  //   }

  //   if (filterValue?.email) {
  //     filterValue.email = 'like:' + filterValue?.email;
  //     httpParams = httpParams.append('email', filterValue.email);
  //   }

  //   // if (filterValue?.email) {
  //   //   httpParams = httpParams.append('filter[$and][email][$like]', '%' + filterValue.email + '%');
  //   // }

  //   if (filterValue?.active) {
  //     httpParams = httpParams.append('active', filterValue.active);
  //   }

  //   if (filterValue?.subjects) {
  //     httpParams = httpParams.append('subjects', filterValue.subjects);
  //   }

  //   if (filterValue?.author) {
  //     httpParams = httpParams.append('author', filterValue.author);
  //   }

  //   if (filterValue?.id) {
  //     httpParams = httpParams.append('id', filterValue.id);
  //   }

  //   return this.http.get<ResponseI<User>>(`${this.baseUrl}filter`, {
  //     params: httpParams,
  //   });
  // }
}
