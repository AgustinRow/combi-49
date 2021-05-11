import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Parada } from '../module/parada.module';
import { MockService } from '../service/mock.service.';

@Component({
  selector: 'app-lista-parada',
  templateUrl: './lista-parada.component.html',
  styleUrls: ['./lista-parada.component.css']
})
export class ListaParadaComponent implements OnInit {
  listParadas: Parada[] = [];
  paradaSeleccionada: Parada;

  constructor(
    private modalService: NgbModal,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listParadas = this.mockService.lParadas;
  }

  openModal(contentEdit, select: Parada) {
    this.paradaSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteParada(select: Parada) {
    var i = this.listParadas.indexOf(select);
    i !== -1 && this.listParadas.splice(i, 1);
  }

  addCity(newCity: Parada) {
    this.listParadas.push(newCity);
  }
}
