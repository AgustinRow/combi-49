import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Ciudad } from '../module/ciudad.module';
import { Parada } from '../module/parada.module';
import { Provincia } from '../module/provincia.module';
import { Ruta } from '../module/ruta.module';
import { Viaje } from '../module/viaje.module';

@Injectable()
export class MockService {
  public lViajes: Viaje[] = [];
  public lRutas: Ruta[] = [];
  public lParadas: Parada[] = [];
  public lCiudades: Ciudad[] = [];
  public lProvincia: Provincia[] = [];
  private mockStorageService;

  constructor(private router: Router) {
    this.mockStorageService = localStorage;
  }

  setViajes(obj: Viaje[]): void {
    this.mockStorageService.setItem('viajes', JSON.stringify(obj));
  }

}
