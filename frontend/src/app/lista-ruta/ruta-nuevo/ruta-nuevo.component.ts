import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Parada } from 'src/app/module/parada.module';
import { Ruta } from 'src/app/module/ruta.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ruta-nuevo',
  templateUrl: './ruta-nuevo.component.html',
  styleUrls: ['./ruta-nuevo.component.css']
})
export class RutaNuevoComponent implements OnInit {
  @Input() rutaNueva = new Ruta();
  @Input() listParadas: Parada[];
  @Output() rutaNewEvent = new EventEmitter<Ruta>();
  submitted = false;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listParadas = this.mockService.lParadas;
  }

  newRoute(formulario: NgForm) {
    if(formulario.valid) 
    {
      this.submitted = true;
      this.rutaNewEvent.emit(this.rutaNueva);
    }
  }
}
