import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehiculo } from 'src/app/module/vehiculo.module';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehiculo-nuevo',
  templateUrl: './vehiculo-nuevo.component.html',
  styleUrls: ['./vehiculo-nuevo.component.css'], 
  providers: [
    VehicleService
  ],
})
export class VehiculoNuevoComponent implements OnInit {
  @Input() vehiculoNuevo:Vehiculo = new Vehiculo();
  @Output() vehiculoNewEvent = new EventEmitter();
  submitted = false;

  constructor(
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

  newVehiculo(formulario: NgForm) {
    if (formulario.valid) {
      this.vehicleService.addvehicle(this.vehiculoNuevo).subscribe(
        (data: Vehiculo) => {
          if (data != null) {
            alert("Se ha creado el vehiculo correctamente");
            this.vehiculoNewEvent.emit();
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
