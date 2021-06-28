import { Component, Input, OnInit, Output } from '@angular/core';
import { Viaje } from "../module/viaje.module";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../service/user.service';
import { Usuario } from '../module/usuario.module';
import { StorageService } from '../service/storage.service';
import { TravelService } from '../service/travel.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-lista-viaje',
  templateUrl: './lista-viaje.component.html',
  styleUrls: ['./lista-viaje.component.css'],
  providers: [
    DatePipe,
    TravelService
  ]
})
export class ListaViajeComponent implements OnInit {
  viajeSeleccionado: Viaje;
  ver: String = "viajes";
  @Input() lViajes: Viaje[] = [];
  @Input() buscar = true;
  aux: Viaje;
  hoy:string = this.datePipe.transform(new Date(Date.now()),"yyyy-MM-dd");

  usuarioIdentificado: Usuario;
  USUARIO_ADMINISTRADOR = UserService.USUARIO_ADMINISTRADOR;
  USUARIO_CHOFER = UserService.USUARIO_CHOFER;

  constructor(
    private modalService: NgbModal,
    private travelService: TravelService,
    private storageService: StorageService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.usuarioIdentificado = this.storageService.getCurrentUser();
    if (this.buscar) {
      this.refreshList();
    }
  }

  onSelect(selction: String) {
    this.ver = selction;
  }

  openModal(contentEdit, select: Viaje) {
    this.viajeSeleccionado = select;
    this.aux = new Viaje();
    this.aux.id = select.id
    this.aux.nombre = select.nombre;
    this.aux.Vehiculo = select.Vehiculo;
    this.aux.Chofer = select.Chofer;
    this.aux.Ruta = select.Ruta;
    this.aux.detalle = select.detalle;
    this.aux.fecha_salida = select.fecha_salida;
    this.aux.hora = select.hora;
    this.aux.precio = select.precio;
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
          alert(error.error.message);
        }
      }
    );
    this.refreshList();
  }

  refreshList() {
    if (this.usuarioIdentificado.tipo == this.USUARIO_ADMINISTRADOR) {
      this.travelService.getTravels().subscribe(
        (list: any) => {
          this.lViajes = list.data as Viaje[];
        },
        (error) => {
          if (error.status >= 500) {
            alert("Problemas para conectarse con el servidor");
          }
          else {
            alert(error.error.message);
          }
        }
      );
    } else {
      //TODO Viajes del chofer pendientes y el posible que este en curso
      this.travelService.getTravels().subscribe(
        (list: any) => {
          this.lViajes = list.data as Viaje[];
        },
        (error) => {
          if (error.status >= 500) {
            alert("Problemas para conectarse con el servidor");
          }
          else {
            alert(error.error.message);
          }
        }
      );
    }
  }

}
