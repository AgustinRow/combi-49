import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../module/usuario.module';
import { Viaje } from '../module/viaje.module';
import { MockService } from '../service/mock.service.';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-lista-chofer',
  templateUrl: './lista-chofer.component.html',
  styleUrls: ['./lista-chofer.component.css'],
  providers: [
    UserService,
    MockService]
})
export class ListaChoferComponent implements OnInit {
  listaC: Usuario[] = [];
  choferSeleccionado: Usuario;
  private lViajes: Viaje[] = [];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, choferselect: Usuario) {
    this.choferSeleccionado = choferselect;
    this.modalService.open(contentEdit);
  }

  deleteChofer(choferselect: Usuario) {
    this.lViajes = this.mockService.getViajes();
    var hoy = new Date(Date.now());
    console.log(hoy);
    console.log(new Date(this.lViajes[0].fechaSalida));
    console.log(new Date(this.lViajes[0].fechaSalida) < hoy);
    var index = this.lViajes.findIndex(v => (v.chofer.id == choferselect.id));
    if (index === -1) {
      //No tiene viajes pendientes
      console.log("No tiene viajes pendientes");
      this.userService.deleteOneUser(choferselect.id).subscribe(
        (data: any) => {
          console.log(data);
          if (data != null) {
            alert("Se ha eliminado el usuario correctamente");
            this.refreshList();
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
    }
    else {
      //Tiene viajes
      console.log("Tiene viajes pendientes");
      var tienePendientes = false;
      this.lViajes.forEach( viaje => {
        tienePendientes ||= (new Date(viaje.fechaSalida)) >= hoy
      });
      if (!tienePendientes) {
        //No tiene pendientes
        this.userService.deleteOneUser(choferselect.id).subscribe(
          (data: any) => {
            console.log(data);
            if (data != null) {
              alert("Se ha eliminado el usuario correctamente");
              this.refreshList();
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
      }
      else {
        alert("No se pude eliminar un chofer con viajes pendientes")
      }
    }
  }

  addChofer(choferNew: Usuario) {
    this.listaC.push(choferNew);
  }

  refreshList() {
    this.userService.getChoffers().subscribe(
      (list: any) => {
        this.listaC = list.data as Usuario[];
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado: " + error.error.message);
        }
      }
    )
  }
}
