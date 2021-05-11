import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Parada } from 'src/app/module/parada.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-parada-editar',
  templateUrl: './parada-editar.component.html',
  styleUrls: ['./parada-editar.component.css']
})
export class ParadaEditarComponent implements OnInit {
  @Input() listCiudades: Ciudad[];
  @Input() paradaModificada = new Parada();
  @Output() stopEditEvent = new EventEmitter();
  submitted = false;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listCiudades = this.mockService.lCiudades;
  }

  modifyStop(formulario: NgForm) {
    if (formulario.valid) {
      this.stopEditEvent.emit();
      this.submitted = true;
    }
  }
}
