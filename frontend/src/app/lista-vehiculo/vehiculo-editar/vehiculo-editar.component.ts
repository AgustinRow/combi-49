import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehiculo } from 'src/app/module/vehiculo.module';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehiculo-editar',
  templateUrl: './vehiculo-editar.component.html',
  styleUrls: ['./vehiculo-editar.component.css'],
  providers: [
    VehicleService
  ],
})
export class VehiculoEditarComponent implements OnInit {
  @Input() vehiculoModificado = new Vehiculo();
  @Output() vehiculoEditEvent = new EventEmitter();
  submitted = false;

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

  modifyVehiculo(formulario: NgForm) {
    if (formulario.valid) {
      this.vehicleService.modifyvehicle(this.vehiculoModificado).subscribe(
        (data: Vehiculo) => {
          if (data != null) {
            alert("Se ha modificado el vehiculo correctamente");
            this.vehiculoEditEvent.emit();
          }
        },
        (error) => {
          /// we never get here, no matter there was a Promise.reject(), throw Error(), etc.
          console.log(error);
          alert("El servidor reporta estado: " + error.status);
          //this.router.navigate(['/Logout']);
        }
      );
      this.submitted = true;
    }
  }

}
