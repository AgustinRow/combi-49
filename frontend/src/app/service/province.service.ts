import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Provincia } from '../module/provincia.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private usersUrl: string = '/api/provincia/';

  constructor(
    private http: HttpClient
  ) { }

  addProvince(province: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(this.usersUrl + 'alta', province, httpOptions);
  }

  getProvinces(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.usersUrl + 'listar');
  }

  modifyProvince(province: Provincia): Observable<Provincia> {
    return this.http.put<Provincia>(this.usersUrl + 'modificar', province, httpOptions);
  }

  deleteProvince(province: Provincia): Observable<any> {
    return this.http.delete<Provincia>(this.usersUrl + 'borrar/' + province.id, httpOptions);
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

