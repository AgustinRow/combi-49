import { Component, Input, OnInit, Output } from '@angular/core';
import { Viaje } from "../module/viaje.module";
import { Ruta } from "../module/ruta.module";
import { Parada } from "../module/parada.module";
import { Ciudad } from "../module/ciudad.module";
import { Provincia } from "../module/provincia.module";
import { MockService } from '../service/mock.service.';

@Component({
  selector: 'app-lista-viaje',
  templateUrl: './lista-viaje.component.html',
  styleUrls: ['./lista-viaje.component.css'],
  providers: [
    MockService]
})
export class ListaViajeComponent implements OnInit {
  ver: String = "viajes";
  lViajes: Viaje[] = [];
  @Input() lRutas: Ruta[] = [];
  @Input() lParadas: Parada[] = [];
  @Input() lCiudades: Ciudad[] = [];
  @Input() lProvincia: Provincia[] = [];

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.lViajes = this.mockService.lViajes;
    this.lRutas = this.mockService.lRutas;
    this.lParadas = this.mockService.lParadas;
    this.lCiudades = this.mockService.lCiudades;
    this.lProvincia = this.mockService.lProvincia;
    console.log(this.lRutas);
    console.log(this.lParadas);
    console.log(this.lCiudades);
    console.log(this.lProvincia);
    console.log(this.lViajes);
  }

  onSelect(selction: String) {
    this.ver = selction;
  }

  ngOnChange(){
    this.lViajes = this.mockService.lViajes;
    this.lRutas = this.mockService.lRutas;
    this.lParadas = this.mockService.lParadas;
    this.lCiudades = this.mockService.lCiudades;
    this.lProvincia = this.mockService.lProvincia;
  }

}
