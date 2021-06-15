import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Vianda } from '../module/vianda.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FoodboxService {
  private usersUrl: string = '/api/vianda/';

  constructor(
    private http: HttpClient
  ) { }

  addFoodbox(vianda: any): Observable<Vianda> {
    return this.http.post<Vianda>(this.usersUrl + 'comprar', vianda, httpOptions);
  }

  getFoodboxs(): Observable<Vianda[]> {
    return this.http.get<Vianda[]>(this.usersUrl + 'listar');
  }

  modifyFoodbox(vianda: Vianda): Observable<Vianda> {
    return this.http.put<Vianda>(this.usersUrl + 'modificar', vianda, httpOptions);
  }

  deleteFoodbox(vianda: Vianda): Observable<any> {
    return this.http.delete<Vianda>(this.usersUrl + 'borrar/' + vianda.id, httpOptions);
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
