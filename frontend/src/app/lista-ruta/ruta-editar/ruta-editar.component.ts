import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listParadas = this.mockService.lParadas;
  }

  modifyRoute(formulario: NgForm) {
    if (formulario.valid) {
      this.routeEditEvent.emit();
      this.submitted = true;
    }
  }
}
