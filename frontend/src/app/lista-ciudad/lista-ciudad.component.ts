import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ciudad } from '../module/ciudad.module';
import { MockService } from '../service/mock.service.';

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.css']
})
export class ListaCiudadComponent implements OnInit {
  listCiudades: Ciudad[] = [];
  ciudadSeleccionada: Ciudad;

  constructor(
    private modalService: NgbModal,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listCiudades = this.mockService.lCiudades;
  }

  openModal(contentEdit, select: Ciudad) {
    this.ciudadSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteCiudad(select: Ciudad) {
    var i = this.listCiudades.indexOf(select);
    i !== -1 && this.listCiudades.splice(i, 1);
  }

  addCity(newCity: Ciudad) {
    this.listCiudades.push(newCity);
  }

}
