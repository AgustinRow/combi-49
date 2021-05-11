import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Usuario } from '../module/usuario.module';

@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css']
})
export class ListaUsuarioComponent implements OnInit {
  listaU : Usuario[] = [];
  tipo: String[] = ["Pasajero", "Chofer", "Administrador"];
  usuarioSeleccionado: Usuario;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    //Para borrar
    var aux = new Usuario()
    aux.nombre = "Agustin";
    aux.apellido = "Colla";
    aux.username = "acolla";
    aux.email = "acolla@grupo49.com";
    aux.password = "grupo49";
    aux.tipo = 1;
    this.listaU.push(aux);
    aux = new Usuario()
    aux.nombre = "Agustin";
    aux.apellido = "Diaz";
    aux.username = "adiaz";
    aux.email = "adiaz@grupo49.com";
    aux.password = "grupo49";
    aux.tipo = 2;
    this.listaU.push(aux);
    aux = new Usuario()
    aux.nombre = "Julio Cesar";
    aux.apellido = "Contreras Benitez";
    aux.username = "jcontreras";
    aux.email = "jcontreras@grupo49.com";
    aux.password = "grupo49";
    aux.tipo = 3;
    this.listaU.push(aux);
    aux = new Usuario()
    aux.nombre = "Maximiliano";
    aux.apellido = "Teodosio";
    aux.username = "mteodosio";
    aux.email = "mteodosio@grupo49.com";
    aux.password = "grupo49";
    aux.tipo = 1;
    this.listaU.push(aux);
  }

  openModal(contentEdit, userselect: Usuario) {    
    console.log("openModal");
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
}
