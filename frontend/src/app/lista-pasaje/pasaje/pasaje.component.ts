import { Component, Input, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/module/pasaje.module';

@Component({
  selector: 'app-pasaje',
  templateUrl: './pasaje.component.html',
  styleUrls: ['./pasaje.component.css']
})
export class PasajeComponent implements OnInit {
  @Input() pasajeConInfo: Pasaje;

  constructor() { }

  ngOnInit(): void {
  }

}
