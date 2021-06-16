import { Component, Input, OnInit } from '@angular/core';
import { Valoracion } from 'src/app/module/valoracion.module';

@Component({
  selector: 'app-valoracion',
  templateUrl: './valoracion.component.html',
  styleUrls: ['./valoracion.component.css']
})
export class ValoracionComponent implements OnInit {
  @Input() valoracion = new Valoracion;

  constructor() { }

  ngOnInit(): void {
    this.valoracion.puntuacion = 0;
    this.valoracion.detalle = "Ingrese un detalle";
  }

}
