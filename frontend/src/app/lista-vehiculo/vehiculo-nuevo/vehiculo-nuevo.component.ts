import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehiculo } from 'src/app/module/vehiculo.module';

@Component({
  selector: 'app-vehiculo-nuevo',
  templateUrl: './vehiculo-nuevo.component.html',
  styleUrls: ['./vehiculo-nuevo.component.css']
})
export class VehiculoNuevoComponent implements OnInit {
  @Input() vehiculoNuevo = new Vehiculo();
  @Output() vehiculoNewEvent = new EventEmitter<Vehiculo>();
  submitted = false;

  constructor() { }
  
  ngOnInit(): void {
  }

  newVehiculo(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.vehiculoNewEvent.emit(this.vehiculoNuevo);
    }
  }
}
