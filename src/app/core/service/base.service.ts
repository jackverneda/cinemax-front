import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

export abstract class BaseService {
  protected baseUrl;
  protected constructor(
    protected http: HttpClient,
    protected section: string,
  ) {
    this.baseUrl = environment.apiUrl + section;
  }

  public getAll<T>(): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}`);
  }

  public get<T>(id: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  public post<T>(body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/`, body);
  }

  public delete<T>(id: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${id}`);
  }

  public update<T>(body: any) {
    return this.http.patch<T>(`${this.baseUrl}/${body.id}`, body);
  }
}
