import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  @Output() cityEditEvent = new EventEmitter<Ciudad>();
  submitted = false;
  provIndex: number;
  form: FormGroup;

  constructor(
    private mockService: MockService
  ) { }

  ngOnInit(): void {
    this.listProvincias = this.mockService.getProvincia();
    
    this.form = new FormGroup({
      'nombre': new FormControl({value: this.ciudadModificada.nombre}),
      'codigoPostal': new FormControl({value: this.ciudadModificada.codigoPostal}),
      'provincia': new FormControl({value: this.ciudadModificada.provincia.nombre})
    });

    this.provIndex = this.provIndex = this.listProvincias.findIndex(x => x.nombre === this.ciudadModificada.provincia.nombre)
  }

  modifyCity() {
    if (this.form.valid) {
      console.log(this.form.value.provincia);
      console.log(this.listProvincias[this.form.value.provincia])
      this.ciudadModificada.provincia = this.listProvincias[this.form.value.provincia];
      this.cityEditEvent.emit(this.ciudadModificada);
      this.submitted = true;
    }
  }
}
