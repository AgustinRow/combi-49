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

  addTravel(travel: Viaje): Observable<Viaje> {
    console.log(travel);
    return this.http.post<Viaje>(this.usersUrl + 'alta', travel, httpOptions);
  }

  getTravels(): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.usersUrl + 'listar');
  }

  modifyTravel(travel: Viaje): Observable<Viaje> {
    return this.http.put<Viaje>(this.usersUrl + 'modificar', travel, httpOptions);
  }

  deleteTravel(travel: Viaje): Observable<any> {
    return this.http.delete<Viaje>(this.usersUrl + 'borrar/' + travel.id, httpOptions);
  }

  findTravels(travel: Viaje): Observable<Viaje[]> {
    return this.http.get<Viaje[]>(this.usersUrl + 'buscar/'+travel.ruta.Origen.id+'&'+travel.ruta.Destino.id+'&'+travel.fecha_salida.toDateString(), httpOptions);
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
