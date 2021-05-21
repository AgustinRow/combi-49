import { Component, Input, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Provincia } from '../module/provincia.module';
import { MockService } from '../service/mock.service.';

@Component({
  selector: 'app-lista-provincia',
  templateUrl: './lista-provincia.component.html',
  styleUrls: ['./lista-provincia.component.css']
})
export class ListaProvinciaComponent implements OnInit {
  @Input() listProvincias: Provincia[] = [];
  provinciaSeleccionada: Provincia;

  constructor(
    private modalService: NgbModal,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  openModal(contentEdit, select: Provincia) {
    this.provinciaSeleccionada = select;
    this.modalService.open(contentEdit);
  }

  deleteProvincia(select: Provincia) {
    var i = this.listProvincias.indexOf(select);
    i !== -1 && this.listProvincias.splice(i, 1);
    this.mockService.setProvincia(this.listProvincias);
    this.refresh();
  }

  addProv(newProv: Provincia) {
    //this.listProvincias.push(newProv);
    this.mockService.lProvincia.push(newProv);
    this.mockService.setProvincia(this.listProvincias);
    this.refresh();
  }

  provEdit(){
    this.mockService.setProvincia(this.listProvincias);
  }

  refresh(){
    this.listProvincias = this.mockService.getProvincia();
  }
}
