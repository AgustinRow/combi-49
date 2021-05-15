import { Component, Input, OnInit } from '@angular/core';
import { Vehiculo } from 'src/app/module/vehiculo.module';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit {
  @Input() vehiculoConInfo = new Vehiculo();

  constructor() { }

  ngOnInit(): void {
  }
}
