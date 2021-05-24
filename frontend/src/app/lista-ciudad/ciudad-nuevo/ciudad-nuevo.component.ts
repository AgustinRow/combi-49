import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Provincia } from 'src/app/module/provincia.module';
import { MockService } from 'src/app/service/mock.service.';

@Component({
  selector: 'app-ciudad-nuevo',
  templateUrl: './ciudad-nuevo.component.html',
  styleUrls: ['./ciudad-nuevo.component.css']
})
export class CiudadNuevoComponent implements OnInit {
  @Input() ciudadNueva = new Ciudad();
  @Input() listProvincias: Provincia[];
  @Output() ciudadNewEvent = new EventEmitter<Ciudad>();
  form: FormGroup;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listProvincias = this.mockService.getProvincia();

    this.form = new FormGroup({
      'nombre': new FormControl({}),
      'codigoPostal': new FormControl({}),
      'provincia': new FormControl({})
    });
  }

  newCity() {
    if(this.form.valid) 
    {
      console.log(this.form);
      this.ciudadNueva.provincia = this.listProvincias[this.form.value.provincia];
      this.ciudadNewEvent.emit(this.ciudadNueva);
    }
  }
}
