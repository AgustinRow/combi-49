import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse }from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Usuario } from '../module/usuario.module';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  private basePath = '/Combi-19/';

  public loginUser(user: Usuario): Observable<any>{
    return this.http.post<any>(this.basePath +'usuarios/autentificacion', user, httpOptions);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return "";
  };
}