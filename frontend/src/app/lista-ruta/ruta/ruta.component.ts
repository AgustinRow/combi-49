import { Component, Input, OnInit } from '@angular/core';
import { Ruta } from 'src/app/module/ruta.module';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit {
  @Input() rutaConInfo: Ruta = new Ruta();

  constructor() { }

  ngOnInit(): void {
  }

}
