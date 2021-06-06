import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Viaje } from '../module/viaje.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TravelService {
  private usersUrl: string = '/api/viaje/';

  constructor(
    private http: HttpClient
  ) { }

  addTravel(province: Viaje): Observable<Viaje> {
    return this.http.post<Viaje>(this.usersUrl + 'alta', province, httpOptions);
  }

  getTravels(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.usersUrl + 'listar');
  }

  modifyTravel(province: Viaje): Observable<Viaje> {
    return this.http.put<Viaje>(this.usersUrl + 'modificar', province, httpOptions);
  }

  deleteTravel(province: Viaje): Observable<any> {
    return this.http.delete<Viaje>(this.usersUrl + 'borrar/' + province.id, httpOptions);
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
