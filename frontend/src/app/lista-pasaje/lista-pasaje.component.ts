import { Component, OnInit } from '@angular/core';
import { Pasaje } from '../module/pasaje.module';

@Component({
  selector: 'app-lista-pasaje',
  templateUrl: './lista-pasaje.component.html',
  styleUrls: ['./lista-pasaje.component.css']
})
export class ListaPasajeComponent implements OnInit {
  listT: Pasaje[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
