import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ruta } from '../module/ruta.module';
import { MockService } from '../service/mock.service.';

@Component({
  selector: 'app-lista-ruta',
  templateUrl: './lista-ruta.component.html',
  styleUrls: ['./lista-ruta.component.css']
})
export class ListaRutaComponent implements OnInit {
  listRutas: Ruta[] = [];
  rutaSeleccionada: Ruta;

  constructor(
    private modalService: NgbModal,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listRutas = this.mockService.lRutas;
  }

  openModal(contentEdit, select: Ruta) {
    this.rutaSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteRoute(select: Ruta) {
    var i = this.listRutas.indexOf(select);
    i !== -1 && this.listRutas.splice(i, 1);
  }

  addRoute(newRoute: Ruta) {
    this.listRutas.push(newRoute);
  }
}
