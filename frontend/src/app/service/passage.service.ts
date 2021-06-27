import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Pasaje } from '../module/pasaje.module';
import { Usuario } from '../module/usuario.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class PassageService {
  private usersUrl: string = '/api/pasaje/';

  constructor(
    private http: HttpClient
  ) { }

  addPassage(passage: Pasaje): Observable<Pasaje> {
    return this.http.post<Pasaje>(this.usersUrl + 'comprar', passage, httpOptions);
  }

  getPassages(): Observable<Pasaje[]> {
    return this.http.get<Pasaje[]>(this.usersUrl + 'listar');
  }

  getPassagesBoughtByIdUser( pasajero: Usuario): Observable<Pasaje[]> {
    return this.http.get<Pasaje[]>(this.usersUrl + 'listar_por_usuario/' + pasajero.id);
  }

  modifyPassage(passage: Pasaje): Observable<Pasaje> {
    return this.http.put<Pasaje>(this.usersUrl + 'modificar', passage, httpOptions);
  }

  deletePassage(passage: Pasaje): Observable<any> {
    return this.http.delete<Pasaje>(this.usersUrl + 'borrar/' + passage.id, httpOptions);
  }

  cancelPassage(passage: Pasaje): Observable<any>{
    return this.http.put<Pasaje>(this.usersUrl + 'cancelar/'+passage.id, httpOptions)
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
