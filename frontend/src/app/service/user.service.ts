import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../module/usuario.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  private usersUrl: string = '/api/usuario/';
  public static USUARIO_ADMINISTRADOR = 1;
  public static USUARIO_CHOFER = 2;
  public static USUARIO_PASAJERO = 3;

  constructor(
    private http: HttpClient
  ) { }

  addUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usersUrl + 'registrar', user, httpOptions);
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usersUrl + 'lista_pasajeros');
  }

  getChoffers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usersUrl + 'lista_choferes');
  }

  getAvailableChoffers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usersUrl + 'lista_choferes_disponibles');
  }

  getUser(userId: Number): Observable<Usuario> {
    return this.http.get<Usuario>(this.usersUrl + 'buscar/' + userId, httpOptions)
  }

  modifyUser(user: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.usersUrl + 'modificar_usuario', user, httpOptions);
  }

  deleteOneUser(id: Number): Observable<any> {
    return this.http.delete<Usuario>(this.usersUrl + 'borrar/' + id, httpOptions);
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

