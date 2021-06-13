import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../module/usuario.module';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
  providers: [
    UserService,
  ]
})
export class ListaUsuarioComponent implements OnInit {
  listaU : Usuario[] = [];
  tipo: String[] = ["Pasajero", "Chofer", "Administrador"];
  usuarioSeleccionado: Usuario;
  findName = '';

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, userselect: Usuario) {  
    this.usuarioSeleccionado = userselect;
    this.modalService.open(contentEdit);
  }

  deleteUser(userselect: Usuario){
    var i = this.listaU.indexOf( userselect );
    i !== -1 && this.listaU.splice( i, 1 );
  }
  
  addUser(userNew: Usuario){
    this.listaU.push(userNew);
  }
  
  refreshList() {
    this.userService.getUsers().subscribe(
      (list: any) => {
        this.listaU = list.data as Usuario[];
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert(error.error.message);
        }
      }
    )
  }
}
