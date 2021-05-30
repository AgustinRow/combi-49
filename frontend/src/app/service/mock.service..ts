import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Ciudad } from '../module/ciudad.module';
import { Provincia } from '../module/provincia.module';
import { Ruta } from '../module/ruta.module';
import { Viaje } from '../module/viaje.module';

@Injectable()
export class MockService {
  public lViajes: Viaje[] = [];
  public lRutas: Ruta[] = [];
  public lCiudades: Ciudad[] = [];
  public lProvincia: Provincia[] = [];
  private mockStorageService;

  constructor(private router: Router) {
    this.mockStorageService = localStorage;
  }

  setViajes(obj: Viaje[]): void {
    this.mockStorageService.setItem('viajes', JSON.stringify(obj));
  }

  getViajes(): Viaje[]{
    var sessionStr = this.mockStorageService.getItem('viajes');
    return (sessionStr) ? <Viaje[]> JSON.parse(sessionStr) : [];
  }

  setProvincia(obj: Provincia[]): void {
    this.mockStorageService.setItem('provincia', JSON.stringify(obj));
  }

  getProvincia(): Provincia[]{
    var sessionStr = this.mockStorageService.getItem('provincia');
    return (sessionStr) ? <Provincia[]> JSON.parse(sessionStr) : [];
  }

  setCiudad(obj: Ciudad[]): void {
    this.mockStorageService.setItem('ciudad', JSON.stringify(obj));
  }

  getCiudad(): Ciudad[]{
    var sessionStr = this.mockStorageService.getItem('ciudad');
    return (sessionStr) ? <Ciudad[]> JSON.parse(sessionStr) : [];
  }

  setRuta(obj: Ruta[]): void {
    this.mockStorageService.setItem('ruta', JSON.stringify(obj));
  }

  getRuta(): Ruta[]{
    var sessionStr = this.mockStorageService.getItem('ruta');
    return (sessionStr) ? <Ruta[]> JSON.parse(sessionStr) : [];
  }
}
