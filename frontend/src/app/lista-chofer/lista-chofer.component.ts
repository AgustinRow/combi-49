import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../module/usuario.module';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-lista-chofer',
  templateUrl: './lista-chofer.component.html',
  styleUrls: ['./lista-chofer.component.css']
})
export class ListaChoferComponent implements OnInit {
  listaC : Usuario[] = [];
  choferSeleccionado: Usuario;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, choferselect: Usuario) {   
    this.choferSeleccionado = choferselect;
    this.modalService.open(contentEdit);
  }

  deleteChofer(choferselect: Usuario){
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
  
  addChofer(choferNew: Usuario){
    this.listaC.push(choferNew);
  }
  
  refreshList() {
    this.userService.getUsers().subscribe(
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
