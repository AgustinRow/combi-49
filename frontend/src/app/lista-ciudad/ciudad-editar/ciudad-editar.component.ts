import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ciudad } from 'src/app/module/ciudad.module';
import { Provincia } from 'src/app/module/provincia.module';
import { CityService } from 'src/app/service/city.service';
import { ProvinceService } from 'src/app/service/province.service';

@Component({
  selector: 'app-ciudad-editar',
  templateUrl: './ciudad-editar.component.html',
  styleUrls: ['./ciudad-editar.component.css'],
  providers: [
    ProvinceService,
    CityService
  ]
})
export class CiudadEditarComponent implements OnInit {
  listProvincias: Provincia[];
  @Input() ciudadModificada = new Ciudad();
  @Output() cityEditEvent = new EventEmitter<Ciudad>();
  submitted = false;
  provIndex: number;
  form: FormGroup;

  constructor(
    private provinceService: ProvinceService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.provinceService.getProvinces().subscribe(
      (list: any) => {
        this.listProvincias = list.data as Provincia[];
        this.provIndex = this.listProvincias.findIndex(x => x.nombre === this.ciudadModificada.Provincia.nombre)
      },
      (error) => {
        if (error.status >= 500) {
          alert("Problemas para conectarse con el servidor");
        }
        else {
          alert(error.error.message);
        }
      }
    )

    this.form = new FormGroup({
      'nombre': new FormControl({ value: this.ciudadModificada.nombre }),
      'codigoPostal': new FormControl({ value: this.ciudadModificada.cp }),
      'provincia': new FormControl({ value: this.ciudadModificada.Provincia.nombre })
    });

  }

  modifyCity() {
    if (this.form.valid) {
      this.cityService.modifyCity(this.ciudadModificada).subscribe(
        (data: any) => {
          if (data != null) {
            alert("Se ha modificado la ciudad correctamente");
            this.cityEditEvent.emit();
          }
        },
        (error) => {
          if (error.status >= 500) {
            alert("Problemas para conectarse con el servidor");
          }
          else {
            alert(error.error.message);
          }
        }
      );
    }
  }
}
