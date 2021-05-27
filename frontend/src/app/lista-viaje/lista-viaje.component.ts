import { Component, Input, OnInit, Output } from '@angular/core';
import { Viaje } from "../module/viaje.module";
import { Ruta } from "../module/ruta.module";
import { Parada } from "../module/parada.module";
import { Ciudad } from "../module/ciudad.module";
import { Provincia } from "../module/provincia.module";
import { MockService } from '../service/mock.service.';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-viaje',
  templateUrl: './lista-viaje.component.html',
  styleUrls: ['./lista-viaje.component.css'],
  providers: [
    MockService]
})
export class ListaViajeComponent implements OnInit {
  viajeSeleccionado: Viaje;
  ver: String = "viajes";
  lViajes: Viaje[] = [];
  @Input() lRutas: Ruta[] = [];
  @Input() lParadas: Parada[] = [];
  @Input() lCiudades: Ciudad[] = [];
  @Input() lProvincia: Provincia[] = [];

  constructor(
    private modalService: NgbModal,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    //this.mockService.setViajes([]);
    this.lViajes = this.mockService.getViajes();
  }

  onSelect(selction: String) {
    this.ver = selction;
  }

  /*ngOnChange(){
    this.lViajes = this.mockService.lViajes;
    this.lRutas = this.mockService.lRutas;
    this.lParadas = this.mockService.lParadas;
    this.lCiudades = this.mockService.lCiudades;
    this.lProvincia = this.mockService.lProvincia;
  }*/

  
  openModal(contentEdit, select: Viaje) {
    this.viajeSeleccionado = select;
    this.modalService.open(contentEdit);
  }

  deleteTravel(select: Viaje) {
    var i = this.lViajes.indexOf(select);
    i !== -1 && this.lViajes.splice(i, 1);
    this.mockService.setViajes(this.lViajes);
    this.refresh();
    alert("Se ha eliminado el viaje correctamente");
  }

  addTravel(newTravel: Viaje) {
    this.lViajes.push(newTravel);
    this.mockService.setViajes(this.lViajes);
    this.refresh();
    alert("Se ha agregado el viaje correctamente");
  }
  
  travelEdit(){
    this.mockService.setViajes(this.lViajes);
    alert("Se ha modificado el viaje correctamente");
  }

  refresh(){
    this.lViajes = this.mockService.getViajes();
  }
}
