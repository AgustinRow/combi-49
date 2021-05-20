import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Provincia } from 'src/app/module/provincia.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ciudad-editar',
  templateUrl: './ciudad-editar.component.html',
  styleUrls: ['./ciudad-editar.component.css']
})
export class CiudadEditarComponent implements OnInit {
  @Input() listProvincias: Provincia[];
  @Input() ciudadModificada = new Ciudad();
  @Output() cityEditEvent = new EventEmitter();
  submitted = false;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listProvincias = this.mockService.lProvincia;
  }

  modifyCity(formulario: NgForm) {
    if (formulario.valid) {
      this.cityEditEvent.emit();
      this.submitted = true;
    }
  }
}
