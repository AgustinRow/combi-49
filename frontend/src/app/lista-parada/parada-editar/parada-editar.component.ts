import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  form: FormGroup;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listCiudades = this.mockService.getCiudad();
    
    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'direccion': new FormControl({}),
      'ciudad': new FormControl({})
    });
  }

  modifyStop() {
    if (this.form.valid) 
    {
      this.paradaModificada.ciudad = this.listCiudades[this.form.value.ciudad];
      this.stopEditEvent.emit();
      this.submitted = true;
    }
  }
}
