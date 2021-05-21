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
    //this.mockService.setParada([]);
    this.refresh();
  }

  openModal(contentEdit, select: Parada) {
    this.paradaSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteStop(select: Parada) {
    var i = this.listParadas.indexOf(select);
    i !== -1 && this.listParadas.splice(i, 1);
    this.mockService.setParada(this.listParadas);
    this.refresh();
  }

  addStop(newStop: Parada) {
    this.listParadas.push(newStop);
    this.mockService.setParada(this.listParadas);
    this.refresh();
  }
  
  stopEdit(){
    this.mockService.setParada(this.listParadas);
  }

  refresh(){
    this.listParadas = this.mockService.getParada();
    console.log(this.listParadas);
  }
}
