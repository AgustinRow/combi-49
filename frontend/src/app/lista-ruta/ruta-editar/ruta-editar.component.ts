import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Ruta } from 'src/app/module/ruta.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ruta-editar',
  templateUrl: './ruta-editar.component.html',
  styleUrls: ['./ruta-editar.component.css']
})
export class RutaEditarComponent implements OnInit {
  @Input() listCiudades: Ciudad[];
  @Input() rutaModificada = new Ruta();
  @Output() routeEditEvent = new EventEmitter();
  submitted = false;
  form: FormGroup;
  oIndex: number;
  dIndex: number;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listCiudades = this.mockService.getCiudad();
        
    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'distancia': new FormControl({}),
      'origen': new FormControl({}),
      'destino': new FormControl({})
    });
    
    this.oIndex = this.listCiudades.findIndex(x => x.nombre === this.rutaModificada.origen.nombre);
    this.dIndex = this.listCiudades.findIndex(x => x.nombre === this.rutaModificada.destino.nombre);
  }

  modifyRoute() {
    if (this.form.valid) 
    {
      this.rutaModificada.origen = this.listCiudades[this.form.value.origen];
      this.rutaModificada.destino = this.listCiudades[this.form.value.destino];
      this.routeEditEvent.emit();
      this.submitted = true;
    }
  }
}
