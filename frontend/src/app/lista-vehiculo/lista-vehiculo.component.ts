import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Vehiculo } from "../module/vehiculo.module";
import { Viaje } from '../module/viaje.module';
import { VehicleService } from '../service/vehicle.service';

@Component({
  selector: 'app-lista-vehiculo',
  templateUrl: './lista-vehiculo.component.html',
  styleUrls: ['./lista-vehiculo.component.css'],
  providers: [
    VehicleService
  ]
})
export class ListaVehiculoComponent implements OnInit {
  listaV: Vehiculo[] = [];
  vehiculoSeleccionado: Vehiculo;
  private lViajes: Viaje[] = [];

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
    this.vehicleService.deleteOneVehicle(vehiculoselect.id).subscribe(
      (data: Vehiculo) => {
        if (data != null) {
          alert("Se ha eliminado el vehiculo correctamente");
          var i = this.listaV.indexOf(vehiculoselect);
          i !== -1 && this.listaV.splice(i, 1);
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
  }

  refreshList() {
    this.vehicleService.getvehicles().subscribe(
      (list: any) => {
        this.listaV = list.data as Vehiculo[];
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
