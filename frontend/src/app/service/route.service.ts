import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Ruta } from '../module/ruta.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private usersUrl: string = '/api/ruta/';

  constructor(
    private http: HttpClient
  ) { }

  addRoute(route: Ruta): Observable<Ruta> {
    return this.http.post<Ruta>(this.usersUrl + 'alta', route, httpOptions);
  }

  getRoutes(): Observable<Ruta[]> {
    return this.http.get<Ruta[]>(this.usersUrl + 'listar');
  }

  modifyRoute(route: Ruta): Observable<Ruta> {
    return this.http.put<Ruta>(this.usersUrl + 'modificar', route, httpOptions);
  }

  deleteRoute(route: Ruta): Observable<any> {
    return this.http.delete<Ruta>(this.usersUrl + 'borrar/' + route.id, httpOptions);
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
