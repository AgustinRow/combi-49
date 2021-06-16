import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Vehiculo } from '../module/vehiculo.module';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class VehicleService {
  private vehicleUrl: string = '/api/vehiculo/';

  constructor(
    private http: HttpClient
  ) { }

  addvehicle(vehicle: Vehiculo): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.vehicleUrl + 'alta', vehicle, httpOptions);
  }

  getvehicles(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.vehicleUrl + 'listar');
  }

  getvehicle(vehicleId: Number): Observable<Vehiculo> {
    return this.http.post<Vehiculo>(this.vehicleUrl, vehicleId, httpOptions)
  }

  modifyvehicle(vehicle: Vehiculo): Observable<Vehiculo> {
    console.log(vehicle);
    return this.http.put<Vehiculo>(this.vehicleUrl + 'modificar/', vehicle, httpOptions);
  }

  deleteOneVehicle(id: Number): Observable<any> {
    return this.http.delete<Vehiculo>(this.vehicleUrl + 'borrar/' + id, httpOptions);
  }

  getavailablevehicles(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.vehicleUrl + 'listar_disponibles');
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

