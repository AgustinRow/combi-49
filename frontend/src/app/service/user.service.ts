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

  getUser(userId: Number): Observable<Usuario> {
    return this.http.get<Usuario>(this.usersUrl + 'buscar/' + userId, httpOptions)
  }

  getChofferTravels( chofferId: Number): Observable<Usuario> {
    return this.http.get<Usuario>(this.usersUrl + 'mis_viajes/' + chofferId, httpOptions)
  }

  getPassagersInTravel( travelId: Number): Observable<Usuario> {
    return this.http.get<Usuario>(this.usersUrl + 'listado_pasajeros_viaje/' + travelId, httpOptions)
  }

  modifyUser(user: Usuario): Observable<Usuario> {
    console.log(user);
    return this.http.put<Usuario>(this.usersUrl + 'modificar_usuario', user, httpOptions);
  }

  deleteOneUser(id: Number): Observable<any> {
    return this.http.delete<Usuario>(this.usersUrl + 'borrar/' + id, httpOptions);
  }

  recoverPassword(mail: string): Observable<any> {
    return this.http.post<Usuario>(this.usersUrl + 'recuperar_password', {email: mail} , httpOptions);
  }

  cancelUserAcount(user: Usuario): Observable<any> {
    return this.http.put( this.usersUrl + 'cerrar_cuenta/' + user.id, httpOptions);
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