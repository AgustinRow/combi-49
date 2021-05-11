import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehiculo } from "../module/vehiculo.module";
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css']
})
export class ListaVehiculoComponent implements OnInit {
  listaV: Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo;

  constructor(
    private vehicleService: VehicleService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  openModal(contentEdit, vehiculoselect: Vehiculo) {
    this.vehiculoSeleccionado = vehiculoselect;
    this.modalService.open(contentEdit);
  }

  deleteVehiculo(vehiculoselect: Vehiculo) {
    var i = this.listaV.indexOf(vehiculoselect);
    i !== -1 && this.listaV.splice(i, 1);
  }

  refreshList(){
    this.vehicleService.getvehicles().subscribe(
      (list: any) => {
        this.listaV = list.data as Vehiculo[];
      },
      (error) => {
        console.log(error);
        alert("El servidor reporta estado: " + error.status);
      }
    )
  }

}
