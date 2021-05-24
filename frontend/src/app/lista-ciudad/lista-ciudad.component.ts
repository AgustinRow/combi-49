import { Component, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Ciudad } from '../module/ciudad.module';
import { MockService } from '../service/mock.service.';
import { CiudadComponent } from './ciudad/ciudad.component';

@Component({
  selector: 'app-lista-ciudad',
  templateUrl: './lista-ciudad.component.html',
  styleUrls: ['./lista-ciudad.component.css']
})
export class ListaCiudadComponent implements OnInit {
  listCiudades: Ciudad[] = [];
  private ciudadSeleccionada: number;
  @Output() aux: Ciudad;

  constructor(
    private modalService: NgbModal,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    //this.mockService.setCiudad([]);
    this.refresh();
  }

  openModal(contentEdit, select: Ciudad) {
    this.ciudadSeleccionada = this.listCiudades.indexOf(select);
    this.aux = new Ciudad();
    this.aux.nombre = select.nombre ;
    this.aux.provincia = select.provincia ;
    this.aux.id = select.id ;
    this.aux.codigoPostal = select.codigoPostal ;
    this.modalService.open(contentEdit);
  }

  deleteCiudad(select: Ciudad) {
    var i = this.listCiudades.indexOf(select);
    i !== -1 && this.listCiudades.splice(i, 1);
    this.mockService.setCiudad(this.listCiudades);
    this.refresh();
    alert("Se ha eliminado la ciudad correctamente");
  }

  addCity(newCity: Ciudad) {
    if (this.listCiudades.findIndex(x => x.codigoPostal === newCity.codigoPostal) === -1) {
      this.listCiudades.push(newCity);
      this.mockService.setCiudad(this.listCiudades);
      this.refresh();
      alert("Se ha creado la ciudad correctamente");
    }
    else {
      alert("La ciudad con este codigo postal ya se encuentra registrada");
    }
  }

  cityEdit(modifyCity: Ciudad) {
    var index = this.listCiudades.findIndex(x => x.codigoPostal === modifyCity.codigoPostal)
    if ( index === -1) {
      this.listCiudades[this.ciudadSeleccionada] = modifyCity;
      console.log( this.listCiudades);
      this.mockService.setCiudad(this.listCiudades);
      alert("Se ha modificado la ciudad correctamente");
    }
    else {
      alert("La ciudad con este codigo postal ya se encuentra registrada");
    }
  }

  refresh() {
    this.listCiudades = this.mockService.getCiudad();
  }
}
