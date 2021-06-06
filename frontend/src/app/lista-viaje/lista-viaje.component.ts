import { Component, Input, OnInit, Output } from '@angular/core';
import { Viaje } from "../module/viaje.module";
import { Ruta } from "../module/ruta.module";
import { Ciudad } from "../module/ciudad.module";
import { Provincia } from "../module/provincia.module";
import { MockService } from '../service/mock.service.';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { Usuario } from '../module/usuario.module';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-lista-viaje',
  templateUrl: './lista-viaje.component.html',
  styleUrls: ['./lista-viaje.component.css'],
  providers: [
    ]
})
export class ListaViajeComponent implements OnInit {
  viajeSeleccionado: Viaje;
  ver: String = "viajes";
  lViajes: Viaje[] = [];
  @Input() lRutas: Ruta[] = [];
  @Input() lCiudades: Ciudad[] = [];
  @Input() lProvincia: Provincia[] = [];
  
  usuarioIdentificado: Usuario;
  USUARIO_ADMINISTRADOR = UserService.USUARIO_ADMINISTRADOR;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private storageService: StorageService,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    //this.mockService.setViajes([]);
    this.refresh();
  }

  onSelect(selction: String) {
    this.ver = selction;
  }
  
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
    this.usuarioIdentificado = this.storageService.getCurrentUser();
  }

}
