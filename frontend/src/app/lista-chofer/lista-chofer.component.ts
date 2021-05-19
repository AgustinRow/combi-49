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
    userService: UserService
  ) { }

  ngOnInit(): void {
    //this.refreshList();
  }

  openModal(contentEdit, choferselect: Usuario) {    
    console.log(this.listaC);
    this.choferSeleccionado = choferselect;
    this.modalService.open(contentEdit);
  }

  deletechofer(choferselect: Usuario){
    var i = this.listaC.indexOf( choferselect );
    i !== -1 && this.listaC.splice( i, 1 );
  }
  
  addChofer(choferNew: Usuario){
    this.listaC.push(choferNew);
  }
  
  /*refreshList() {
    this.userService.getUsers().subscribe(
      (list: any) => {
        this.listaC = list.data as Usuario[];
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert("El servidor reporta estado  " + error.status + ": " + error.error.message);
        }
      }
    )
  }*/
}
