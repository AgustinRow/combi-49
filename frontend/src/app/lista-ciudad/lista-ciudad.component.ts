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
    //this.mockService.setCiudad([]);
    this.refresh();
  }

  openModal(contentEdit, select: Ciudad) {
    this.ciudadSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteCiudad(select: Ciudad) {
    var i = this.listCiudades.indexOf(select);
    i !== -1 && this.listCiudades.splice(i, 1);
    this.mockService.setCiudad(this.listCiudades);
    this.refresh();
  }

  addCity(newCity: Ciudad) {
    this.listCiudades.push(newCity);
    this.mockService.setCiudad(this.listCiudades);
    this.refresh();
  }

  cityEdit(){
    console.log(this.ciudadSeleccionada);
    this.mockService.setCiudad(this.listCiudades);
  }

  refresh(){
    this.listCiudades = this.mockService.getCiudad();
  }
}
