import { Component, Input, OnInit } from '@angular/core';
import { Viaje } from 'src/app/module/viaje.module';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit {
  @Input() viajeConInfo: Viaje;

  constructor() { }

  ngOnInit(): void {
  }

}
