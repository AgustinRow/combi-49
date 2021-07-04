import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Usuario } from '../module/usuario.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private usersUrl: string = '/api/membresia/';

  constructor(
    private http: HttpClient
  ) { }

  addMembership(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.usersUrl + 'comprar', user, httpOptions);
  }
  
  cancelMembership(user: Usuario): Observable<any>{
    return this.http.put<Usuario>(this.usersUrl + 'cancelar', user, httpOptions)
  }
}
