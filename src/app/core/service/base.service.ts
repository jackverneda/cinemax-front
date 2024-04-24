import { HttpClient, HttpEvent, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { LoggedInUserService } from './logged-in-user.service';

export abstract class BaseService {
  protected token!: string;
  protected baseUrl!: string;
  protected httpOptions: any;
  protected constructor(
    protected http: HttpClient,
    protected section: string,
    private loggedInUserService: LoggedInUserService,
  ) {
    this.token = this.loggedInUserService.getTokenOfUser();
    this.baseUrl = environment.apiUrl + section;
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.token,
      }),
    };
  }

  public getAll<T>(): Observable<HttpEvent<T>> {
    return this.http.get<T>(`${this.baseUrl}`, this.httpOptions);
  }

  public get<T>(id: string): Observable<HttpEvent<T>> {
    return this.http.get<T>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  public post<T>(body: any): Observable<HttpEvent<T>> {
    return this.http.post<T>(`${this.baseUrl}/`, body, this.httpOptions);
  }

  public delete<T>(id: string): Observable<HttpEvent<T>> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  public update<T>(body: any): Observable<HttpEvent<T>> {
    return this.http.patch<T>(`${this.baseUrl}/${body.id}`, body, this.httpOptions);
  }
}
