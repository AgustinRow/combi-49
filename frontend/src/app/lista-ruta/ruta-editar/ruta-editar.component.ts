import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Parada } from 'src/app/module/parada.module';
import { Ruta } from 'src/app/module/ruta.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ruta-editar',
  templateUrl: './ruta-editar.component.html',
  styleUrls: ['./ruta-editar.component.css']
})
export class RutaEditarComponent implements OnInit {
  @Input() listParadas: Parada[];
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
    this.listParadas = this.mockService.getParada();
        
    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'distancia': new FormControl({}),
      'origen': new FormControl({}),
      'destino': new FormControl({})
    });
    
    this.oIndex = this.listParadas.findIndex(x => x.id === this.rutaModificada.origen.id);
    this.dIndex = this.listParadas.findIndex(x => x.id === this.rutaModificada.destino.id);
    console.log(this.dIndex);
    console.log(this.rutaModificada.destino.id);
  }

  modifyRoute() {
    if (this.form.valid) 
    {
      this.rutaModificada.origen = this.listParadas[this.form.value.origen];
      this.rutaModificada.destino = this.listParadas[this.form.value.destino];
      this.routeEditEvent.emit();
      this.submitted = true;
    }
  }
}
