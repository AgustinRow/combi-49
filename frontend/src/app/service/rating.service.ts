import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Valoracion } from '../module/valoracion.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private usersUrl: string = '/api/valoracion/';

  constructor(
    private http: HttpClient
  ) { }

  addRating(rating: Valoracion): Observable<Valoracion> {
    return this.http.post<Valoracion>(this.usersUrl + 'alta', rating, httpOptions);
  }

  getRatings(): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(this.usersUrl + 'listar');
  }

  modifyRating(rating: Valoracion): Observable<Valoracion> {
    return this.http.put<Valoracion>(this.usersUrl + 'modificar', rating, httpOptions);
  }

  deleteRating(rating: Valoracion): Observable<any> {
    return this.http.delete<Valoracion>(this.usersUrl + 'borrar/' + rating.id, httpOptions);
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
