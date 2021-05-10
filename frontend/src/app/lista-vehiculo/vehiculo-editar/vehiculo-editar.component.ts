import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vehiculo } from 'src/app/module/vehiculo.module';

@Component({
  selector: 'app-vehiculo-editar',
  templateUrl: './vehiculo-editar.component.html',
  styleUrls: ['./vehiculo-editar.component.css']
})
export class VehiculoEditarComponent implements OnInit {
  @Input() vehiculoModificado = new Vehiculo();
  @Output() vehiculoEditEvent = new EventEmitter();
  submitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  modifyVehiculo(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.vehiculoEditEvent.emit();
    }
  }

}
