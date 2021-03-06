import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Ruta } from 'src/app/module/ruta.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ruta-nuevo',
  templateUrl: './ruta-nuevo.component.html',
  styleUrls: ['./ruta-nuevo.component.css']
})
export class RutaNuevoComponent implements OnInit {
  @Input() rutaNueva = new Ruta();
  @Input() listCiudades: Ciudad[];
  @Output() rutaNewEvent = new EventEmitter<Ruta>();
  submitted = false;
  form: FormGroup;

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
  }

  newRoute() {
    if(this.form.valid) 
    {
      this.rutaNueva.origen = this.listCiudades[this.form.value.origen];
      this.rutaNueva.destino = this.listCiudades[this.form.value.destino];
      this.submitted = true;
      this.rutaNewEvent.emit(this.rutaNueva);
    }
  }
}
