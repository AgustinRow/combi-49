import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Ciudad } from '../module/ciudad.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private usersUrl: string = '/api/ciudad/';

  constructor(
    private http: HttpClient
  ) { }
  
  addCity(province: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.usersUrl + 'alta', province, httpOptions);
  }

  getCitys(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.usersUrl + 'listar');
  }

  modifyCity(province: Ciudad): Observable<Ciudad> {
    return this.http.put<Ciudad>(this.usersUrl + 'modificar', province, httpOptions);
  }

  deleteCity(province: Ciudad): Observable<any> {
    return this.http.delete<Ciudad>(this.usersUrl + 'borrar/' + province.id, httpOptions);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('UserService: ' + message);
  }
}
