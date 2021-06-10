import { Component, Input, OnInit, Output } from '@angular/core';
import { Viaje } from "../module/viaje.module";
import { Ruta } from "../module/ruta.module";
import { Ciudad } from "../module/ciudad.module";
import { Provincia } from "../module/provincia.module";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { Usuario } from '../module/usuario.module';
import { StorageService } from '../service/storage.service';
import { TravelService } from '../service/travel.service';

@Component({
  selector: 'app-lista-viaje',
  templateUrl: './lista-viaje.component.html',
  styleUrls: ['./lista-viaje.component.css'],
  providers: [
      TravelService
    ]
})
export class ListaViajeComponent implements OnInit {
  viajeSeleccionado: Viaje;
  ver: String = "viajes";
  lViajes: Viaje[] = [];
  
  usuarioIdentificado: Usuario;
  USUARIO_ADMINISTRADOR = UserService.USUARIO_ADMINISTRADOR;

  constructor(
    private modalService: NgbModal,
    private travelService: TravelService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  onSelect(selction: String) {
    this.ver = selction;
  }
  
  openModal(contentEdit, select: Viaje) {
    this.viajeSeleccionado = select;
    this.modalService.open(contentEdit);
  }

  deleteTravel(select: Viaje) {
    this.travelService.deleteTravel(select).subscribe(
      (data: any) => {
        if (data != null) {
          alert("Se ha eliminado el viaje correctamente");
        }
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    );
    this.refreshList();
  }

  refreshList(){
    this.travelService.getTravels().subscribe(
      (list: any) => {
        this.lViajes = list.data as Viaje[];
        console.log(this.lViajes);
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    );
    this.usuarioIdentificado = this.storageService.getCurrentUser();
  }

}
