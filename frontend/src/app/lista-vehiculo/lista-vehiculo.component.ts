import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehiculo } from '../module/vehiculo.module';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css']
})
export class ListaVehiculoComponent implements OnInit {
  listaV : Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo;
  constructor(private modalService: NgbModal)
  { }

  ngOnInit(): void {
     //Para borrar
     var v1 = new Vehiculo()
     v1.marca = "unMarca";
     v1.modelo = "unModelo";
     v1.patente = "unaPatente";
     v1.cantAsientos = 60;
     v1.confort = "SemiCama";
     this.listaV.push(v1);

     var v2 = new Vehiculo()
     v2.marca = "otraMarca";
     v2.modelo = "otroModelo";
     v2.patente = "otraPatente";
     v2.cantAsientos = 60;
     v2.confort = "Cama";
     this.listaV.push(v2);


  }


  openModal(contentEdit,  vehiculoselect: Vehiculo) {    
    console.log("openModal");
    this.vehiculoSeleccionado = vehiculoselect;
    this.modalService.open(contentEdit);
  }

  deleteVehiculo(vehiculoselect: Vehiculo){
    var i = this.listaV.indexOf( vehiculoselect );
    i !== -1 && this.listaV.splice( i, 1 );
  }
  
  addVehiculo(vehiculoNew: Vehiculo){
    this.listaV.push(vehiculoNew);
  }




}
