import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Viaje } from '../module/viaje.module';
import { Ciudad } from '../module/ciudad.module';

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

  addTravel(travel: Viaje): Observable<Viaje> {
    console.log(travel);
    return this.http.post<Viaje>(this.usersUrl + 'alta', travel, httpOptions);
  }

  getTravels(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.usersUrl + 'listar');
  }

  getTravelById( id: Number ): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.usersUrl + 'buscar/' + id);
  }

  modifyTravel(travel: Viaje): Observable<Viaje> {
    return this.http.put<Viaje>(this.usersUrl + 'modificar', travel, httpOptions);
  }

  deleteTravel(travel: Viaje): Observable<any> {
    return this.http.delete<Viaje>(this.usersUrl + 'borrar/' + travel.id, httpOptions);
  }

  findTravels(origen: Ciudad, destino: Ciudad, salida: String): Observable<Viaje[]> {
    console.log(origen, destino, salida)
    return this.http.get<Viaje[]>(this.usersUrl + 'buscar?origen='+origen.id+'&destino='+destino.id+'&fecha='+salida, httpOptions);
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
